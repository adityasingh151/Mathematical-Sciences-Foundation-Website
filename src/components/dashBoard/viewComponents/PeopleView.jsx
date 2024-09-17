import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, off, remove } from "firebase/database";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import Modal from '../../Modal'; // Import the modal component
import Loading from '../../LoadSaveAnimation/Loading';

const PeopleView = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const peopleRef = ref(db, 'people');

    const unsubscribe = onValue(peopleRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loadedPeople = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      setPeople(loadedPeople);
      setIsLoading(false);
    }, (error) => {
      console.error(error);
      setError("Failed to fetch people");
      setIsLoading(false);
    });

    return () => off(peopleRef, 'value', unsubscribe);
  }, []);

  const handleDelete = async () => {
    const storage = getStorage();
    const imageRef = storageRef(storage, currentPerson.photoUrl);
    
    try {
      await deleteObject(imageRef);
      await remove(ref(getDatabase(), `people/${currentPerson.id}`));
      setModalOpen(false); // Close modal on success
      alert('Person deleted successfully!');
    } catch (error) {
      console.error('Error removing person: ', error);
      alert('Failed to delete person.');
    }
  };

  const promptDelete = (person) => {
    setCurrentPerson(person);
    setModalOpen(true);
  };

  if (isLoading) return <Loading/>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mx-auto py-4 px-6">
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Confirm Deletion">
        <p>Are you sure you want to delete {currentPerson?.name}? This action cannot be undone.</p>
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded mt-4">
          Delete
        </button>
      </Modal>
      <h1 className="text-2xl font-bold mb-4">People Directory</h1>
      {people.map(person => (
        <div key={person.id} className="border p-4 rounded mb-2 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{person.name}</h2>
            <p className="text-sm">{person.position}</p>
            <p className="text-sm">{person.details}</p>
          </div>
          <div>
            <button onClick={() => promptDelete(person)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded mr-2">Delete</button>
            <button onClick={() => alert('Edit functionality not implemented')} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded">Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleView;
