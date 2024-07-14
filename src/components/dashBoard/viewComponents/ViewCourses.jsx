import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import Modal from '../../Modal'; // Assuming Modal component as defined previously
import Notification from '../../Notification'; // Assuming Notification component as defined previously

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const db = getDatabase();
    const coursesRef = ref(db, 'courses');

    onValue(coursesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedCourses = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setCourses(loadedCourses);
      } else {
        setNotification({ show: true, message: 'No courses found', type: 'error' });
      }
      setIsLoading(false);
    }, (error) => {
      console.error('Error fetching courses:', error);
      setNotification({ show: true, message: 'Failed to load courses', type: 'error' });
      setIsLoading(false);
    });

    return () => {};
  }, []);

  const handleDelete = async () => {
    const db = getDatabase();
    try {
      await remove(ref(db, `courses/${selectedCourse.id}`));
      setCourses(courses.filter(course => course.id !== selectedCourse.id));
      setNotification({ show: true, message: 'Course deleted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error deleting course:', error);
      setNotification({ show: true, message: 'Failed to delete course', type: 'error' });
    }
    setShowModal(false);
  };

  const promptDelete = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleEdit = (course) => {
    window.location.href = `/edit-course/${course.id}`; // Ensure this route is correctly set up
  };

  if (isLoading) return <div>Loading courses...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Courses</h1>
      {courses.map(course => (
        <div key={course.id} className="p-4 border rounded mb-2 flex justify-between items-center">
          <div>
            <h2 className="font-semibold">{course.title}</h2>
            <p>{course.description}</p>
          </div>
          <div>
            <button onClick={() => promptDelete(course)} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mr-2">Delete</button>
            <button onClick={() => handleEdit(course)} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Edit</button>
          </div>
        </div>
      ))}

      <Modal
        isOpen={showModal}
        title="Confirm Deletion"
        onClose={() => setShowModal(false)}
      >
        <p>Are you sure you want to delete the course: {selectedCourse?.title}? This action cannot be undone.</p>
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

export default ViewCourses;
