import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push } from "firebase/database";
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';

const SponsorsImageForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const imageUrl = watch('imageUrl');
  const [imagePreview, setImagePreview] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => setImagePreview(e.target.result);
      fileReader.readAsDataURL(imageUrl[0]);
    } else {
      setImagePreview(null);
    }
  }, [imageUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const file = data.imageUrl[0];
      const storageReference = storageRef(getStorage(), `sponsorsImages/${file.name}`);
      await uploadBytes(storageReference, file);
      const downloadURL = await getDownloadURL(storageReference);
      const sponsorRef = ref(getDatabase(), 'sponsorsImages');
      await push(sponsorRef, { 
        sponsorName: data.sponsorName,
        sponsorDetails: data.sponsorDetails,
        imageUrl: downloadURL 
      });
      setShowSuccess(true);
    } catch (error) {
      console.error('Error uploading image: ', error);
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
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Upload Sponsor Image</h2>
        {showSuccess && (
          <SuccessNotification message="Image uploaded successfully!" onClose={() => setShowSuccess(false)} />
        )}
        {showError && (
          <ErrorNotification message="Failed to upload image!" onClose={() => setShowError(false)} />
        )}
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Sponsor Name <span className="text-red-500">*</span>
            <input
              type="text"
              {...register('sponsorName', { required: 'Sponsor name is required' })}
              className={`mt-1 block w-full pl-3 py-2 text-base text-gray-900 border ${errors.sponsorName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.sponsorName && <p className="text-red-500 text-sm mt-1">{errors.sponsorName.message}</p>}
          </label>
        </div>
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Sponsor Details
            <textarea
              {...register('sponsorDetails')}
              className="mt-1 block w-full pl-3 py-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </div>
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Upload Image <span className="text-red-500">*</span>
            <input
              type="file"
              {...register('imageUrl', { required: 'Image is required' })}
              className={`mt-1 block w-full pl-3 py-2 text-base text-gray-900 border ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
          </label>
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 h-48 w-auto border rounded-md" />}
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Submit Sponsor
        </button>
      </form>
    </>
  );
};

export default SponsorsImageForm;
