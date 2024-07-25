import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import Loading from './LoadSaveAnimation/Loading';

const DisplayContent = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    
    // Fetch Gallery Images
    const galleryRef = ref(db, 'imageContent');
    onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      setGalleryImages(Object.keys(data).map(key => ({ id: key, ...data[key] })).reverse());
    //   galleryImages.reverse(); //To show the latest one on top.
      setIsLoading(false);
    });

    // Fetch Videos
    const videosRef = ref(db, 'videoContent');
    onValue(videosRef, (snapshot) => {
      const data = snapshot.val();
      setVideos(Object.keys(data).map(key => ({ id: key, ...data[key] })).reverse());
    //   videos.reverse();
      setIsLoading(false);
    });

    // Fetch Articles
    const articlesRef = ref(db, 'articleContent');
    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      setArticles(Object.keys(data).map(key => ({ id: key, ...data[key] })).reverse());
    //   articles.reverse();
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4 sm:mt-2 mt-20">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">Explore Our Content</h1>
      
      {/* Gallery Section */}
      <div className="my-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Stunning Gallery Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map(image => (
            <div key={image.id} className="p-4 border rounded mb-2 flex flex-col items-center">
              <img
                src={image.imageUrl}
                alt={`Gallery Image ${image.id}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p>{image.imageDetails}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="my-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Engaging Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map(video => (
            <div key={video.id} className="p-4 border rounded mb-2 flex flex-col items-center">
              <iframe
                title={`Video ${video.videoDetails}`}
                src={`https://www.youtube.com/embed/${video.videoUrl}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video w-full mb-2"
                style={{ border: 'none' }}
              ></iframe>
              <p>{video.videoDetails}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Articles Section */}
      <div className="my-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Informative Articles</h2>
        {articles.map(article => (
          <div key={article.id} className="p-4 border rounded mb-2">
            <a href={article.articleUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
              {article.articleHeading} <span className='italic text-sm text-gray-600'>~ Prof. Dinesh Singh</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayContent;
