import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom'; // Add this import
import { BsPlusCircle } from 'react-icons/bs';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref, push, update } from 'firebase/database'; // Import update
import { imgdb, txtdb } from '../../databaseConfig/firebaseConfig';
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';

const ContentForm = () => {
  const { register, handleSubmit, watch, setValue, setError, formState: { errors } } = useForm(); // Add setValue
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [openedSections, setOpenedSections] = useState({
    imageSection: true,
    videoSection: false,
    articleSection: false
  });

  const location = useLocation(); // Get location
  const editData = location.state?.item; // Get item from state if present
  const editType = location.state?.type;

  const imageFile = watch('imageFile');
  const [imagePreview, setImagePreview] = useState();

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => setImagePreview(e.target.result);
      fileReader.readAsDataURL(imageFile[0]);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (editData) {
      if (editType === 'imageContent') {
        setValue('imageDetails', editData.imageDetails);
        setImagePreview(editData.imageUrl);
        setOpenedSections({ imageSection: true });
      } else if (editType === 'videoContent') {
        setValue('videoUrl', `https://www.youtube.com/watch?v=${editData.videoUrl}`);
        setValue('videoDetails', editData.videoDetails);
        setOpenedSections({ videoSection: true });
      } else if (editType === 'articleContent') {
        setValue('articleUrl', editData.articleUrl);
        setValue('articleHeading', editData.articleHeading);
        if (editData.articleImageUrl) {
          setImagePreview(editData.articleImageUrl);
        }
        setOpenedSections({ articleSection: true });
      }
    }
  }, [editData, editType, setValue]);

  const toggleSection = (section) => {
    setOpenedSections(prev => ({
      ...{ imageSection: false, videoSection: false, articleSection: false },
      [section]: !prev[section]
    }));
  };

  const uploadImage = async (imageFile) => {
    const storageReference = storageRef(imgdb, `contentImages/${imageFile.name}`);
    await uploadBytes(storageReference, imageFile);
    return getDownloadURL(storageReference);
  };

  const validateYouTubeUrl = (url) => {
    const pattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/i;
    const match = url.match(pattern);
    return match ? match[1] : null;
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      if (openedSections.videoSection) {
        const embedId = validateYouTubeUrl(data.videoUrl);
        if (!embedId) {
          setError('videoUrl', {
            type: 'manual',
            message: 'Please enter a valid YouTube video link.'
          });
          setIsSaving(false);
          return;
        }
        data.videoUrl = embedId;
      }

      const uploadedData = {};
      if (openedSections.imageSection) {
        if (data.imageFile && data.imageFile.length > 0) {
          uploadedData.imageUrl = await uploadImage(data.imageFile[0]);
        } else if (editData) {
          uploadedData.imageUrl = editData.imageUrl; // Retain previous image URL if no new image is uploaded
        }
        uploadedData.imageDetails = data.imageDetails || '';
      }

      if (openedSections.videoSection && data.videoUrl) {
        uploadedData.videoUrl = data.videoUrl;
        uploadedData.videoDetails = data.videoDetails || '';
      }

      if (openedSections.articleSection && data.articleUrl) {
        uploadedData.articleUrl = data.articleUrl;
        uploadedData.articleHeading = data.articleHeading || '';
        if (data.articleImage && data.articleImage.length > 0) {
          uploadedData.articleImageUrl = await uploadImage(data.articleImage[0]);
        } else if (editData) {
          uploadedData.articleImageUrl = editData.articleImageUrl; // Retain previous article image URL if no new image is uploaded
        }
      }

      if (editData) {
        const dbRef = ref(txtdb, `${editType}/${editData.id}`);
        await update(dbRef, uploadedData);
      } else {
        if (openedSections.imageSection && data.imageFile) {
          await push(ref(txtdb, 'imageContent'), uploadedData);
        }

        if (openedSections.videoSection && data.videoUrl) {
          await push(ref(txtdb, 'videoContent'), uploadedData);
        }

        if (openedSections.articleSection && data.articleUrl) {
          await push(ref(txtdb, 'articleContent'), uploadedData);
        }
      }

      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting content: ', error);
      setShowError(true);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isSaving && <Saving />}
      <div className="flex">
        <div className="flex flex-col space-y-2 p-6 bg-gray-200">
          {Object.entries(openedSections).map(([sectionKey, isOpen]) => (
            <button
              key={sectionKey}
              onClick={() => toggleSection(sectionKey)}
              className={`py-2 px-4 rounded transition duration-300 flex items-center gap-2 ${isOpen ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
            >
              <BsPlusCircle />
              {sectionKey.replace(/([A-Z])/g, ' $1').replace('Section', ' Section')}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-lg rounded-lg flex-grow space-y-4">
          <h2 className="text-2xl font-bold text-indigo-600">{editData ? 'Edit Content' : 'Upload Content'}</h2>
          {Object.entries(openedSections).map(([sectionKey, isOpen]) => isOpen && (
            <div key={sectionKey}>
              {sectionKey === 'imageSection' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image File {editData ? '' : <span className="text-red-500">*</span>}
                  </label>
                  <input type="file" {...register('imageFile', { required: !editData ? 'Image file is required' : false })} className="mt-1 block w-full pl-3 py-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                  {errors.imageFile && <p className="text-red-500 text-xs italic">{errors.imageFile.message}</p>}
                  {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 h-48 w-auto border rounded-md" />}
                  <label className="block text-sm font-medium text-gray-700 mt-2">Image Details</label>
                  <textarea {...register('imageDetails')} className="mt-1 block w-full pl-3 py-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
              )}

              {sectionKey === 'videoSection' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Video URL <span className="text-red-500">*</span>
                  </label>
                  <input type="url" {...register('videoUrl', { required: 'Please enter a valid YouTube video link.' })} className="mt-1 block w-full pl-3 py-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                  {errors.videoUrl && <p className="text-red-500 text-xs italic">{errors.videoUrl.message}</p>}
                  <label className="block text-sm font-medium text-gray-700 mt-2">Video Details</label>
                  <textarea {...register('videoDetails')} className="mt-1 block w-full pl-3 py-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
              )}

              {sectionKey === 'articleSection' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Article URL <span className="text-red-500">*</span>
                  </label>
                  <input type="url" {...register('articleUrl', { required: 'Article URL is required' })} className="mt-1 block w-full pl-3 py-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                  {errors.articleUrl && <p className="text-red-500 text-xs italic">{errors.articleUrl.message}</p>}
                  <label className="block text-sm font-medium text-gray-700 mt-2">
                    Article Heading <span className="text-red-500">*</span>
                  </label>
                  <input type="text" {...register('articleHeading', { required: 'Article Heading is required' })} className="mt-1 block w-full pl-3 py-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                  {errors.articleHeading && <p className="text-red-500 text-xs italic">{errors.articleHeading.message}</p>}
                  <label className="block text-sm font-medium text-gray-700 mt-2">Article Image</label>
                  <input type="file" {...register('articleImage')} className="mt-1 block w-full pl-3 py-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
              )}
            </div>
          ))}

          {showSuccess && (
            <SuccessNotification message="Content submitted successfully!" onClose={() => setShowSuccess(false)} />
          )}
          {showError && (
            <ErrorNotification message="Failed to submit content!" onClose={() => setShowError(false)} />
          )}
          
          <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {editData ? 'Update Content' : 'Submit Content'}
          </button>
        </form>
      </div>
    </>
  );
};

export default ContentForm;
