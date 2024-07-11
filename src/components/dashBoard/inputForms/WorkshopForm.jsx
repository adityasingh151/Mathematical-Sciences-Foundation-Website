import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import { txtdb, imgdb } from '../../databaseConfig/firebaseConfig';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push } from "firebase/database"; // Adjust import according to your database (Firestore or Realtime Database)

const WorkshopForm = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [fields, setFields] = useState([
    'headerTitle',
    'aboutTitle',
    'aboutDescription',
    'aboutImage'
  ]);

  const aboutImage = watch('aboutImage');
  const [imagePreview, setImagePreview] = useState();

  useEffect(() => {
    if (aboutImage && aboutImage.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => setImagePreview(e.target.result);
      fileReader.readAsDataURL(aboutImage[0]);
    } else {
      setImagePreview(null);
    }
  }, [aboutImage]);

  const onSubmit = async (data) => {
    try {
      const file = data.aboutImage[0];
      const storageReference = storageRef(imgdb, `workshops/${file.name}`);
      
      await uploadBytes(storageReference, file);
      const downloadURL = await getDownloadURL(storageReference);
      
      const workshopData = {
        ...data,
        aboutImage: downloadURL
      };
      
      const workshopRef = ref(txtdb, 'workshops');
      await push(workshopRef, workshopData);
      
      console.log('Workshop data submitted successfully!', workshopData);
    } catch (error) {
      console.log('Error adding workshop data: ', error);
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

  return (
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
        {fields.map(field => (
          <div key={field} className="relative">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field.replace(/([A-Z])/g, ' $1')}
              {['headerSubtitle', 'outcomeTitle', 'outcomeContent', 'quote'].includes(field) ? null : <span className="text-red-500">*</span>}
            </label>
            {field === 'aboutImage' ? (
              <div>
                <input
                  type="file"
                  {...register('aboutImage', {
                    required: ['headerSubtitle', 'outcomeTitle', 'outcomeContent', 'quote'].includes(field) ? false : 'This field is required'
                  })}
                  className="mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 h-48 w-auto border rounded-md" />}
              </div>
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
          Submit Workshop Details
        </button>
      </form>

    </div>
  );
};

export default WorkshopForm;
