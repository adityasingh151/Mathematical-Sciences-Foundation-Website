import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { BsPlusCircle } from 'react-icons/bs';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push, get, update } from "firebase/database";
import { useParams } from 'react-router-dom';
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';
import { imgdb } from '../../databaseConfig/firebaseConfig'; // Import your Firebase configuration

const WorkshopForm = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors }, control } = useForm();
  const { workshopId } = useParams();
  const [fields, setFields] = useState([
    'headerTitle',
    'aboutTitle',
    'aboutDescription',
    'aboutImage'
  ]);

  const aboutImage = watch('aboutImage');
  const [imagePreview, setImagePreview] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (workshopId) {
      // Fetch the workshop details if workshopId is present
      const db = getDatabase();
      const workshopRef = ref(db, `workshops/${workshopId}`);
      get(workshopRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          Object.keys(data).forEach(key => {
            setValue(key, data[key]);
          });
          setImagePreview(data.aboutImage); // Set image preview from URL
        }
        setIsLoading(false);
      }).catch((error) => {
        console.error('Error fetching workshop data: ', error);
        setShowError(true);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [workshopId, setValue]);

  useEffect(() => {
    if (aboutImage && aboutImage.length > 0 && typeof aboutImage[0] === 'object') {
      const fileReader = new FileReader();
      fileReader.onload = (e) => setImagePreview(e.target.result);
      fileReader.readAsDataURL(aboutImage[0]);
    }
  }, [aboutImage]);

  const uploadImage = async (imageFile, path) => {
    const storageReference = storageRef(imgdb, path);
    await uploadBytes(storageReference, imageFile);
    const downloadURL = await getDownloadURL(storageReference);
    return downloadURL;
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      let downloadURL = data.aboutImage;

      if (data.aboutImage && data.aboutImage[0] instanceof File) {
        downloadURL = await uploadImage(data.aboutImage[0], `workshops/${data.aboutImage[0].name}`);
      }

      const workshopData = {
        ...data,
        aboutImage: downloadURL
      };

      const db = getDatabase();
      if (workshopId) {
        await update(ref(db, `workshops/${workshopId}`), workshopData);
      } else {
        await push(ref(db, 'workshops'), workshopData);
      }

      setShowSuccess(true);
    } catch (error) {
      console.error('Error adding/updating workshop data:', error);
      setShowError(true);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleFields = (fieldArray) => {
    const currentFieldSet = new Set(fields);
    const hasAllFields = fieldArray.every(field => currentFieldSet.has(field));

    if (hasAllFields) {
      setFields(fields.filter(field => !fieldArray.includes(field)));
    } else {
      setFields([...fields, ...fieldArray.filter(field => !currentFieldSet.has(field))]);
    }
  };

  useEffect(() => {
    register('aboutImage', { required: 'This field is required' });
  }, [register]);

  const getInputType = (fieldName) => {
    if (fieldName.includes('Date')) return 'date';
    if (fieldName.includes('Time')) return 'time';
    return 'text';
  };

  const sectionFields = {
    headerSection: ['headerSubtitle'],
    reachSection: ['address', 'addressURL'],
    outcomesSection: ['outcomeTitle', 'outcomeContent'],
    quoteSection: ['quote'],
    registrationSection: ['workshopDate', 'workshopStartTime', 'workshopEndTime', 'prerequisites', 'designedFor', 'lastDateForRegistration', 'workshopRegistrationFee']
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isSaving && <Saving />}
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col space-y-2 p-6 sm:w-1/3">
          {Object.entries(sectionFields).map(([section, fieldArray]) => (
            <button
              key={section}
              onClick={() => toggleFields(fieldArray)}
              className={`text-sm py-2 px-4 rounded transition duration-300 flex items-center gap-2 ${fields.some(field => fieldArray.includes(field)) ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
            >
              <BsPlusCircle /> {fields.some(field => fieldArray.includes(field)) ? 'Remove' : 'Add'} {section.replace(/([A-Z])/g, ' $1').replace("section", " Section")}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-lg rounded-lg flex-grow space-y-4 w-full sm:w-2/3">
          <h2 className="text-2xl font-bold text-indigo-600">Workshop Details</h2>
          {showSuccess && (
            <SuccessNotification
              message={workshopId ? "Workshop Updated Successfully!" : "Workshop Created Successfully!"}
              onClose={() => setShowSuccess(false)}
            />
          )}
          {showError && (
            <ErrorNotification
              message="Something went wrong!"
              onClose={() => setShowError(false)}
            />
          )}
          {fields.map(field => (
            <div key={field} className="relative">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
                {['headerSubtitle', 'outcomeTitle', 'outcomeContent', 'quote'].includes(field) ? null : <span className="text-red-500">*</span>}
              </label>
              {field === 'aboutImage' ? (
                <Controller
                  name="aboutImage"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'This field is required' }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <input
                        type="file"
                        onChange={(e) => {
                          onChange(e.target.files);
                          if (e.target.files.length > 0) {
                            const fileReader = new FileReader();
                            fileReader.onload = (event) => setImagePreview(event.target.result);
                            fileReader.readAsDataURL(e.target.files[0]);
                          } else {
                            setImagePreview(null);
                          }
                        }}
                        className="mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 h-48 w-auto border rounded-md mx-auto" />}
                    </div>
                  )}
                />
              ) : (
                <input
                  type={getInputType(field)}
                  {...register(field, {
                    required: ['headerSubtitle', 'outcomeTitle', 'outcomeContent', 'quote'].includes(field) ? false : 'This field is required',
                    minLength: {
                      value: 3,
                      message: 'Minimum length is 3 characters'
                    }
                  })}
                  className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                />
              )}
              {errors[field] && (
                <p className="mt-1 text-sm text-red-500">{errors[field].message}</p>
              )}
            </div>
          ))}
          <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {workshopId ? 'Update Workshop Details' : 'Submit Workshop Details'}
          </button>
        </form>
      </div>
    </>
  );
};

export default WorkshopForm;
  