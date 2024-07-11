import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { txtdb, imgdb } from '../../databaseConfig/firebaseConfig';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push } from "firebase/database"; // Adjust import according to your database (Firestore or Realtime Database)

const CoursesForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState({});
  
  const studentImage = watch('studentImage');
  const teacherImage = watch('teacherImage');
  const collegeImage = watch('collegeImage');
  const methodImage = watch('methodImage');

  useEffect(() => {
    const updateImagePreview = (imageFile, key) => {
      if (imageFile && imageFile.length > 0) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => setImagePreview((prev) => ({ ...prev, [key]: e.target.result }));
        fileReader.readAsDataURL(imageFile[0]);
      } else {
        setImagePreview((prev) => ({ ...prev, [key]: null }));
      }
    };

    updateImagePreview(studentImage, 'studentImage');
    updateImagePreview(teacherImage, 'teacherImage');
    updateImagePreview(collegeImage, 'collegeImage');
    updateImagePreview(methodImage, 'methodImage');
  }, [studentImage, teacherImage, collegeImage, methodImage]);

  const onSubmit = async (data) => {
    try {
      const uploadFile = async (file, path) => {
        const storageReference = storageRef(imgdb, path);
        await uploadBytes(storageReference, file);
        return await getDownloadURL(storageReference);
      };

      const studentImageUrl = await uploadFile(data.studentImage[0], `courses/students/${data.studentImage[0].name}`);
      const teacherImageUrl = await uploadFile(data.teacherImage[0], `courses/teachers/${data.teacherImage[0].name}`);
      const collegeImageUrl = await uploadFile(data.collegeImage[0], `courses/college/${data.collegeImage[0].name}`);
      const methodImageUrl = await uploadFile(data.methodImage[0], `courses/methods/${data.methodImage[0].name}`);

      const courseData = {
        students: {
          title: data.studentTitle,
          description: data.studentDescription,
          imgSrc: studentImageUrl,
        },
        teachers: {
          title: data.teacherTitle,
          description: data.teacherDescription,
          imgSrc: teacherImageUrl,
        },
        college: {
          title: data.collegeTitle,
          description: data.collegeDescription,
          imgSrc: collegeImageUrl,
        },
        method: {
          title: data.methodTitle,
          description: data.methodDescription,
          imgSrc: methodImageUrl,
        },
      };

      const dbRef = ref(txtdb, 'courses');
      await push(dbRef, courseData);

      console.log('Course data submitted successfully!', courseData);
    } catch (error) {
      console.log('Error adding course data: ', error);
    }
  };

  const renderInputField = (label, name, placeholder, type = 'text') => (
    <div className="relative mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      {type === 'textarea' ? (
        <textarea
          {...register(name, { required: 'This field is required', minLength: 10 })}
          className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          {...register(name, { required: 'This field is required', minLength: 3 })}
          className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          placeholder={placeholder}
        />
      )}
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
      )}
    </div>
  );

  const renderImageField = (label, name) => (
    <div className="relative mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        {...register(name, { required: 'This field is required' })}
        className="mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      {imagePreview[name] && <img src={imagePreview[name]} alt="Preview" className="mt-4 h-48 w-auto border rounded-md" />}
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center py-12 bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg space-y-6">
        <h2 className="text-3xl font-bold text-indigo-600 text-center">Course Details</h2>

        {/* Students Section */}
        <div className="border-b pb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Course Offerings</h3>
          {renderInputField('Title', 'studentTitle', 'Enter Title')}
          {renderInputField('Description', 'studentDescription', 'Enter Description', 'textarea')}
          {renderImageField('Image', 'studentImage')}
        </div>

        {/* Teachers Section */}
        <div className="border-b pb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">For School Teachers</h3>
          {renderInputField('Title', 'teacherTitle', 'Enter Title')}
          {renderInputField('Description', 'teacherDescription', 'Enter Description', 'textarea')}
          {renderImageField('Image', 'teacherImage')}
        </div>

        {/* College Students Section */}
        <div className="border-b pb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">For College Students or Budding Professionals</h3>
          {renderInputField('Title', 'collegeTitle', 'Enter Title')}
          {renderInputField('Description', 'collegeDescription', 'Enter Description', 'textarea')}
          {renderImageField('Image', 'collegeImage')}
        </div>

        {/* Teaching and Learning Method Section */}
        <div className="pb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Teaching and Learning Method</h3>
          {renderInputField('Title', 'methodTitle', 'Enter Title')}
          {renderInputField('Description', 'methodDescription', 'Enter Description', 'textarea')}
          {renderImageField('Image', 'methodImage')}
        </div>

        <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Submit Course Details
        </button>
      </form>
    </div>
  );
};

export default CoursesForm;