import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getDatabase, ref, push } from "firebase/database";
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';

const CoursesForm1 = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [fields, setFields] = useState(['title', 'content', 'details', 'duration', 'action']);
  const details = watch('details');

  const onSubmit = async (data) => {
    try {
      const db = getDatabase();
      const coursesRef = ref(db, 'courses');
      await push(coursesRef, data);
      console.log('Course data submitted successfully!', data);
    } catch (error) {
      console.log('Error adding course data: ', error);
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

  const getInputType = (fieldName) => {
    if (fieldName.includes('Date')) return 'date';
    if (fieldName.includes('Time')) return 'time';
    return 'text';
  };

  const sectionFields = {
    courseDetails: ['title', 'content', 'duration', 'action'],
    additionalDetails: ['details']
  };

  return (
    <div className="flex">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-lg rounded-lg flex-grow space-y-4">
        <h2 className="text-2xl font-bold text-indigo-600">Course Details</h2>
        {fields.map(field => (
          <div key={field} className="relative">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field.replace(/([A-Z])/g, ' $1')}
              <span className="text-red-500">*</span>
            </label>
            {field === 'details' ? (
              <textarea
                {...register('details', { required: true })}
                className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
              />
            ) : (
              <input
                type={getInputType(field)}
                {...register(field, {
                  required: true,
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
          Submit Course Details
        </button>
      </form>

      <div className="flex flex-col space-y-2 p-6">
        {Object.entries(sectionFields).map(([section, fieldArray]) => (
          <button
            key={section}
            onClick={() => toggleFields(fieldArray)}
            className={`text-sm py-2 px-4 rounded transition duration-300 flex items-center gap-2 ${fields.some(field => fieldArray.includes(field)) ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
          >
            <BsPlusCircle /> {fields.some(field => fieldArray.includes(field)) ? 'Remove' : 'Add'} {section.replace(/([A-Z])/g, ' $1').replace("Details", " Details")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoursesForm1;