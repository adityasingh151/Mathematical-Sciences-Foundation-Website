import React, { useEffect, useState, useCallback } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import Loading from '../LoadSaveAnimation/Loading';

// Memoized CourseCard to prevent unnecessary re-renders
const CourseCard = React.memo(({ title, description, imgSrc, link }) => (
  <div className="w-full md:w-1/3 px-4 mb-8">
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
      <img src={imgSrc} className="w-full h-48 object-cover" alt="Course Thumbnail" loading="lazy" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-800">{title}</h3>
        <p className="text-base text-gray-700 mb-4 h-40 overflow-hidden">{description}</p>
        <a href={link} className="inline-block bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full">Know More</a>
      </div>
    </div>
  </div>
));

const CoursesPage = () => {
  const [coursesForStudents, setCoursesForStudents] = useState([]);
  const [coursesForTeachers, setCoursesForTeachers] = useState([]);
  const [coursesForCollegeStudents, setCoursesForCollegeStudents] = useState([]);
  const [teachingMethods, setTeachingMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCoursesData = useCallback(async () => {
    const db = getDatabase();
    try {
      const [studentsSnapshot, teachersSnapshot, collegeSnapshot, methodsSnapshot] = await Promise.all([
        get(ref(db, 'courses/students')),
        get(ref(db, 'courses/teachers')),
        get(ref(db, 'courses/college')),
        get(ref(db, 'courses/methods'))
      ]);

      setCoursesForStudents(studentsSnapshot.exists() ? Object.values(studentsSnapshot.val()) : []);
      setCoursesForTeachers(teachersSnapshot.exists() ? Object.values(teachersSnapshot.val()) : []);
      setCoursesForCollegeStudents(collegeSnapshot.exists() ? Object.values(collegeSnapshot.val()) : []);
      setTeachingMethods(methodsSnapshot.exists() ? Object.values(methodsSnapshot.val()) : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoursesData();
  }, [fetchCoursesData]);

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div className="bg-coolGray-100">
      {/* Header Section */}
      <div className="bg-[url('https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-top-right py-4 px-4 text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center">
          <div className="w-full md:w-1/2">
            <h1 className="text-6xl font-serif mb-4">Online Hands-on Courses for Teachers and Students</h1>
            <p className="text-xl">We at MSF have created a variety of online courses specially designed for the community of teachers, school students & college students. These skill-based courses will enable you to excel in your arena and enhance your understanding with the help of technology.</p>
          </div>
        </div>
      </div>

      {/* Our Course Offerings */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-serif text-center mb-12 text-blue-600">Our Course Offerings</h2>
          <div className="flex flex-wrap -mx-4">
            {coursesForStudents.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </div>

      {/* For School Teachers */}
      <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-serif mb-12 text-blue-600">For School Teachers</h2>
          <div className="flex flex-wrap -mx-4">
            {coursesForTeachers.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </div>

      {/* For College Students or Budding Professionals */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-serif mb-12 text-blue-600">For College Students or Budding Professionals</h2>
          <div className="flex flex-wrap -mx-4">
            {coursesForCollegeStudents.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </div>

      {/* Teaching and Learning Method Section */}
      <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-serif mb-12 text-blue-600">Teaching and Learning Method</h2>
          <div className="flex flex-wrap -mx-4">
            {teachingMethods.map((method, index) => (
              <CourseCard key={index} {...method} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="py-20 bg-white text-center">
        <h2 className="text-5xl font-serif mb-4 text-blue-600">Register for a Course Today!</h2>
        <p className="text-xl text-gray-700">Stay safe at home and use this time to hone your skills and enhance your knowledge base.</p>
        <div className="mt-4">
          <a href="#" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full mr-4">Join Now</a>
          <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">Learn More</a>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
