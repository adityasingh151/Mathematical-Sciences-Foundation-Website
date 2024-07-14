import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import Modal from '../../Modal'; // Assuming Modal is a reusable component
import Notification from '../../Notification'; // Import the Notification component

const ViewEvent = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const db = getDatabase();
    const eventRef = ref(db, 'events');

    onValue(eventRef, (snapshot) => {
      const data = snapshot.val();
      const loadedEvents = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      setEvents(loadedEvents);
      setIsLoading(false);
    }, {
      onlyOnce: true
    });

    return () => { /* cleanup */ };
  }, []);

  const handleDelete = async () => {
    const db = getDatabase();
    await remove(ref(db, `events/${selectedEvent.id}`));
    setShowModal(false);
    setEvents(events.filter(event => event.id !== selectedEvent.id));
    setNotification({ show: true, message: 'Event deleted successfully!', type: 'success' });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const promptDelete = (event) => {
    setSelectedEvent(event);
    setModalContent(`Are you sure you want to delete the event: ${event.headerTitle}?`);
    setShowModal(true);
  };

  const handleEdit = (event) => {
    window.location.href = `/edit-event/${event.id}`; // Assuming there's a route set up for editing
  };

  if (isLoading) return <div>Loading events...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Events</h1>
      {events.map(event => (
        <div key={event.id} className="p-4 border rounded mb-2 flex justify-between items-center">
          <div>
            <h2 className="font-semibold">{event.headerTitle}</h2>
            <p>{event.aboutTitle}</p>
          </div>
          <div>
            <button onClick={() => promptDelete(event)} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mr-2">Delete</button>
            <button onClick={() => handleEdit(event)} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Edit</button>
          </div>
        </div>
      ))}

      <Modal
        isOpen={showModal}
        title="Confirm Deletion"
        onClose={() => setShowModal(false)}
      >
        <p>{modalContent}</p>
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

export default ViewEvent;
