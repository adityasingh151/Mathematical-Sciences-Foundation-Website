import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import { txtdb, imgdb } from '../../databaseConfig/firebaseConfig';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push } from "firebase/database";
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';

const CoursesForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, setError, clearErrors } = useForm();
  const [fields, setFields] = useState({
    student: false,
    teacher: false,
    college: false,
    method: false,
  });
  const [imagePreview, setImagePreview] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

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

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [studentImage, teacherImage, collegeImage, methodImage]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const uploadFile = async (file, path) => {
        const storageReference = storageRef(imgdb, path);
        await uploadBytes(storageReference, file);
        return await getDownloadURL(storageReference);
      };

      const studentImageUrl = fields.student ? await uploadFile(data.studentImage[0], `courses/students/${data.studentImage[0].name}`) : '';
      const teacherImageUrl = fields.teacher ? await uploadFile(data.teacherImage[0], `courses/teachers/${data.teacherImage[0].name}`) : '';
      const collegeImageUrl = fields.college ? await uploadFile(data.collegeImage[0], `courses/college/${data.collegeImage[0].name}`) : '';
      const methodImageUrl = fields.method ? await uploadFile(data.methodImage[0], `courses/methods/${data.methodImage[0].name}`) : '';

      const courseData = {
        students: fields.student ? {
          title: data.studentTitle,
          description: data.studentDescription,
          imgSrc: studentImageUrl,
        } : {},
        teachers: fields.teacher ? {
          title: data.teacherTitle,
          description: data.teacherDescription,
          imgSrc: teacherImageUrl,
        } : {},
        college: fields.college ? {
          title: data.collegeTitle,
          description: data.collegeDescription,
          imgSrc: collegeImageUrl,
        } : {},
        method: fields.method ? {
          title: data.methodTitle,
          description: data.methodDescription,
          imgSrc: methodImageUrl,
        } : {},
      };

      const dbRef = ref(txtdb, 'courses');
      await push(dbRef, courseData);

      console.log('Course data submitted successfully!', courseData);
      setShowSuccess(true);
    } catch (error) {
      console.log('Error adding course data: ', error);
      setShowError(true);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleFields = (section) => {
    setFields((prevFields) => {
      const newFields = { ...prevFields, [section]: !prevFields[section] };

      if (newFields[section]) {
        // Clear errors if section is opened
        clearErrors(`${section}Title`);
        clearErrors(`${section}Description`);
        clearErrors(`${section}Image`);
      } else {
        // Set errors if section is closed and data exists
        setError(`${section}Title`, { type: 'manual', message: 'This field is required' });
        setError(`${section}Description`, { type: 'manual', message: 'This field is required' });
        setError(`${section}Image`, { type: 'manual', message: 'This field is required' });
      }

      return newFields;
    });
  };

  const renderInputField = (label, name, placeholder, type = 'text', section) => (
    <div className="relative mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      {type === 'textarea' ? (
        <textarea
          {...register(name, {
            required: fields[section] ? 'This field is required' : false,
            minLength: fields[section] ? 10 : 0,
          })}
          className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          {...register(name, {
            required: fields[section] ? 'This field is required' : false,
            minLength: fields[section] ? 3 : 0,
          })}
          className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          placeholder={placeholder}
        />
      )}
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
      )}
    </div>
  );

  const renderImageField = (label, name, section) => (
    <div className="relative mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        {...register(name, {
          required: fields[section] ? 'This field is required' : false,
        })}
        className="mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      {imagePreview[name] && <img src={imagePreview[name]} alt="Preview" className="mt-4 h-48 w-auto border rounded-md" />}
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
      )}
    </div>
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center py-12 bg-gray-50">
      {isSaving ? <Saving /> : (
        <>
          {showSuccess && <SuccessNotification message="Item Created Successfully!" onClose={() => setShowSuccess(false)} />}
          {showError && <ErrorNotification message="Something went wrong!" onClose={() => setShowError(false)} />}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg space-y-6">
            <h2 className="text-3xl font-bold text-indigo-600 text-center">Course Details</h2>

            <div className="border-b pb-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex justify-between items-center">
                Our Course Offerings
                <button type="button" onClick={() => toggleFields('student')} className="text-indigo-600">
                  {fields.student ? <BsDashCircle size={24} /> : <BsPlusCircle size={24} />}
                </button>
              </h3>
              {fields.student && (
                <>
                  {renderInputField('Title', 'studentTitle', 'Enter Title', 'text', 'student')}
                  {renderInputField('Description', 'studentDescription', 'Enter Description', 'textarea', 'student')}
                    
                  {renderImageField('Image', 'studentImage', 'student')}
                </>
              )}
            </div>

            <div className="border-b pb-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex justify-between items-center">
                Courses for Teachers
                <button type="button" onClick={() => toggleFields('teacher')} className="text-indigo-600">
                  {fields.teacher ? <BsDashCircle size={24} /> : <BsPlusCircle size={24} />}
                </button>
              </h3>
              {fields.teacher && (
                <>
                  {renderInputField('Title', 'teacherTitle', 'Enter Title', 'text', 'teacher')}
                  {renderInputField('Description', 'teacherDescription', 'Enter Description', 'textarea', 'teacher')}
                  {renderImageField('Image', 'teacherImage', 'teacher')}
                </>
              )}
            </div>

            <div className="border-b pb-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex justify-between items-center">
                Courses for College
                <button type="button" onClick={() => toggleFields('college')} className="text-indigo-600">
                  {fields.college ? <BsDashCircle size={24} /> : <BsPlusCircle size={24} />}
                </button>
              </h3>
              {fields.college && (
                <>
                  {renderInputField('Title', 'collegeTitle', 'Enter Title', 'text', 'college')}
                  {renderInputField('Description', 'collegeDescription', 'Enter Description', 'textarea', 'college')}
                  {renderImageField('Image', 'collegeImage', 'college')}
                </>
              )}
            </div>

            <div className="border-b pb-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex justify-between items-center">
                Teaching Methods
                <button type="button" onClick={() => toggleFields('method')} className="text-indigo-600">
                  {fields.method ? <BsDashCircle size={24} /> : <BsPlusCircle size={24} />}
                </button>
              </h3>
              {fields.method && (
                <>
                  {renderInputField('Title', 'methodTitle', 'Enter Title', 'text', 'method')}
                  {renderInputField('Description', 'methodDescription', 'Enter Description', 'textarea', 'method')}
                  {renderImageField('Image', 'methodImage', 'method')}
                </>
              )}
            </div>

            <div className="text-center">
              <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CoursesForm;
