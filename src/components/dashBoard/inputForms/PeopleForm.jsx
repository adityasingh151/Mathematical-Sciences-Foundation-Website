import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import { txtdb, imgdb } from '../../databaseConfig/firebaseConfig';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push } from "firebase/database";

const PeopleForm = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [fields, setFields] = useState(['name', 'position', 'details', 'photoUrl']);
  const photoUrl = watch('photoUrl');
  const [imagePreview, setImagePreview] = useState();

  useEffect(() => {
    if (photoUrl && photoUrl.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => setImagePreview(e.target.result);
      fileReader.readAsDataURL(photoUrl[0]);
    } else {
      setImagePreview(null);
    }
  }, [photoUrl]);

  const onSubmit = async (data) => {
    try {
      const file = data.photoUrl[0];
      const storageReference = storageRef(imgdb, `people/${file.name}`);
      await uploadBytes(storageReference, file);
      const downloadURL = await getDownloadURL(storageReference);
      const personData = {
        ...data,
        photoUrl: downloadURL
      };
      const peopleRef = ref(txtdb, 'people');
      await push(peopleRef, personData);
      console.log('Person data submitted successfully!', personData);
    } catch (error) {
      console.log('Error adding person data: ', error);
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
    register('photoUrl', { required: 'This field is required' });
  }, [register]);

  const getInputType = (fieldName) => {
    if (fieldName.includes('Date')) return 'date';
    if (fieldName.includes('Time')) return 'time';
    return 'text';
  };

  const sectionFields = {
    personalDetails: ['age', 'email', 'phoneNumber'],
    addressSection: ['address', 'city', 'country'],
    professionalDetails: ['company', 'jobTitle', 'yearsOfExperience']
  };

  return (
    <div className="flex">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-lg rounded-lg flex-grow space-y-4">
        <h2 className="text-2xl font-bold text-indigo-600">People Details</h2>
        {fields.map(field => (
          <div key={field} className="relative">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field.replace(/([A-Z])/g, ' $1')}
              {!['age', 'email', 'phoneNumber', 'address', 'city', 'country', 'company', 'jobTitle', 'yearsOfExperience'].includes(field) && <span className="text-red-500">*</span>}
            </label>
            {field === 'photoUrl' ? (
              <div>
                <input
                  type="file"
                  {...register('photoUrl', { required: true })}
                  className="mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 h-48 w-auto border rounded-md" />}
              </div>
            ) : (
              <input
                type={getInputType(field)}
                {...register(field, {
                  required: !['age', 'email', 'phoneNumber', 'address', 'city', 'country', 'company', 'jobTitle', 'yearsOfExperience'].includes(field),
                  minLength: { value: 3, message: 'Minimum length is 3 characters' }
                })}
                className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
              />
            )}
            {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field].message}</p>}
          </div>
        ))}
        <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Submit Person Details
        </button>
      </form>

      <div className="flex flex-col space-y-2 p-6">
        {Object.entries(sectionFields).map(([section, fieldArray]) => (
          <button
            key={section}
            onClick={() => toggleFields(fieldArray)}
            className={`text-sm py-2 px-4 rounded transition duration-300 flex items-center gap-2 ${fields.some(field => fieldArray.includes(field)) ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
          >
            <BsPlusCircle /> {fields.some(field => fieldArray.includes(field)) ? 'Remove' : 'Add'} {section.replace(/([A-Z])/g, ' $1').replace("Section", " Section")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PeopleForm;