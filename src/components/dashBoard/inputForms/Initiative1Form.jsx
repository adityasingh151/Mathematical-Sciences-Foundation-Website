import React, { useState, useEffect } from 'react';
import { ref, set, onValue } from 'firebase/database';
import { txtdb } from '../../databaseConfig/firebaseConfig';
import Saving from '../../LoadSaveAnimation/Saving';  // Importing the Saving component
import Loading from '../../LoadSaveAnimation/Loading';  // Importing the Loading component
import Notification from '../../Notification';  // Importing the Notification component


const Initiative1Form = () => {
  const [introduction, setIntroduction] = useState('');
  const [aims, setAims] = useState('');
  const [philosophy, setPhilosophy] = useState('');
  const [offerings, setOfferings] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const introductionRef = ref(txtdb, 'internetCollege/introduction');
    const aimsRef = ref(txtdb, 'internetCollege/aims');
    const philosophyRef = ref(txtdb, 'internetCollege/philosophy');
    const offeringsRef = ref(txtdb, 'internetCollege/offerings');

    const fetchData = async () => {
      try {
        onValue(introductionRef, (snapshot) => {
          const data = snapshot.val();
          if (data) setIntroduction(data);
        });

        onValue(aimsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) setAims(data);
        });

        onValue(philosophyRef, (snapshot) => {
          const data = snapshot.val();
          if (data) setPhilosophy(data);
        });

        onValue(offeringsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) setOfferings(data);
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await set(ref(txtdb, 'internetCollege/introduction'), introduction);
      await set(ref(txtdb, 'internetCollege/aims'), aims);
      await set(ref(txtdb, 'internetCollege/philosophy'), philosophy);
      await set(ref(txtdb, 'internetCollege/offerings'), offerings);

      setSuccess('Sections saved successfully');
    } catch (error) {
      console.error('Error saving sections:', error);
      setError('Error saving sections');
    } finally {
      setSaving(false);
    }
  };

  const handleCloseNotification = () => {
    setError('');
    setSuccess('');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">The Internet College</h1>
      
      {success && <Notification message={success} type="success" onClose={handleCloseNotification} />}
      {error && <Notification message={error} type="error" onClose={handleCloseNotification} />}
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Introduction</h2>
        <textarea
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          rows="4"
          className="w-full p-4 border border-gray-300 rounded-lg"
          placeholder="Enter the introduction here..."
        />
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Aims</h2>
        <textarea
          value={aims}
          onChange={(e) => setAims(e.target.value)}
          rows="4"
          className="w-full p-4 border border-gray-300 rounded-lg"
          placeholder="Enter the aims here..."
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Philosophy and Pedagogy</h2>
        <textarea
          value={philosophy}
          onChange={(e) => setPhilosophy(e.target.value)}
          rows="4"
          className="w-full p-4 border border-gray-300 rounded-lg"
          placeholder="Enter the philosophy and pedagogy here..."
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Current Offerings</h2>
        <textarea
          value={offerings}
          onChange={(e) => setOfferings(e.target.value)}
          rows="4"
          className="w-full p-4 border border-gray-300 rounded-lg"
          placeholder="Enter the current offerings here..."
        />
      </section>

      <button
        onClick={handleSave}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save'}
      </button>

      {saving && <Saving />}
      {loading && <Loading />}
    </div>
  );
};

export default Initiative1Form;
