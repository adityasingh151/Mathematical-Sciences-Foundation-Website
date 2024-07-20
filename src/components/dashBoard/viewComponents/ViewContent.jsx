import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import Modal from '../../Modal'; // Assuming Modal is a reusable component
import Notification from '../../Notification'; // Import the Notification component
import Loading from '../../LoadSaveAnimation/Loading';
import { useNavigate } from 'react-router-dom'; // Add this import



const ViewContent = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate(); // Initialize navigate



  useEffect(() => {
    const db = getDatabase();
    
    // Fetch Gallery Images
    const galleryRef = ref(db, 'imageContent');
    onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      setGalleryImages(Object.keys(data).map(key => ({ id: key, ...data[key] })));
      setIsLoading(false);
    });

    // Fetch Videos
    const videosRef = ref(db, 'videoContent');
    onValue(videosRef, (snapshot) => {
      const data = snapshot.val();
      setVideos(Object.keys(data).map(key => ({ id: key, ...data[key] })));
      setIsLoading(false);
    });

    // Fetch Articles
    const articlesRef = ref(db, 'articleContent');
    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      setArticles(Object.keys(data).map(key => ({ id: key, ...data[key] })));
      setIsLoading(false);
    });

    console.log("ViewContent")

  }, []);

  const handleDelete = async () => {
    const db = getDatabase();
    const itemType = selectedItem.type;
    await remove(ref(db, `${itemType}/${selectedItem.id}`));
    setShowModal(false);

    if (itemType === 'imageContent') {
      setGalleryImages(galleryImages.filter(item => item.id !== selectedItem.id));
    } else if (itemType === 'videoContent') {
      setVideos(videos.filter(item => item.id !== selectedItem.id));
    } else if (itemType === 'articleContent') {
      setArticles(articles.filter(item => item.id !== selectedItem.id));
    }

    setNotification({ show: true, message: 'Item deleted successfully!', type: 'success' });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const promptDelete = (item, type) => {
    setSelectedItem({ ...item, type });
    setModalContent(`Are you sure you want to delete this ${type.slice(0, -7)}?`);
    setShowModal(true);
  };

  const handleEdit = (item, type) => {
    console.log("I am called.")
    navigate(`/admin/forms/${type.slice(0, -7)}/edit/${item.id}`, { state: { item, type } }); // Pass state
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Manage Content</h1>
      
      {/* Gallery Section */}
      <div className="my-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Gallery Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map(image => (
            <div key={image.id} className="p-4 border rounded mb-2 flex flex-col items-center">
              <img
                src={image.imageUrl}
                alt={`Gallery Image ${image.id}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p>{image.imageDetails}</p>
              <div className="flex mt-2">
                <button onClick={() => promptDelete(image, 'imageContent')} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mr-2">Delete</button>
                <button onClick={() => handleEdit(image, 'imageContent')} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="my-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <div className="flex mt-2">
                <button onClick={() => promptDelete(video, 'videoContent')} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mr-2">Delete</button>
                <button onClick={() => handleEdit(video, 'videoContent')} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Articles Section */}
      <div className="my-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Articles</h2>
        {articles.map(article => (
          <div key={article.id} className="p-4 border rounded mb-2">
            <a href={article.articleUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
              {article.articleHeading} <span className='italic text-sm text-gray-600'>~ Prof. Dinesh Singh</span>
            </a>
            <div className="flex mt-2">
              <button onClick={() => promptDelete(article, 'articleContent')} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mr-2">Delete</button>
              <button onClick={() => handleEdit(article, 'articleContent')} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Edit</button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        title="Confirm Deletion"
        onClose={() => setShowModal(false)}
      >
        <p>{modalContent}</p>
        <div className="mt-4 flex justify-end">
          <button onClick={handleDelete} className="bg-red-600 hover:bg-red-800 text-white py-1 px-3 rounded mr-2">Confirm</button>
          <button onClick={() => setShowModal(false)} className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-3 rounded">Cancel</button>
        </div>
      </Modal>

      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default ViewContent;
