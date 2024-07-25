import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { txtdb } from '../components/databaseConfig/firebaseConfig';
import Loading from '../components/LoadSaveAnimation/Loading';
import Notification from './Notification';
import { motion } from 'framer-motion';

const Initiative1Page = () => {
  const [introduction, setIntroduction] = useState('');
  const [aims, setAims] = useState('');
  const [philosophy, setPhilosophy] = useState('');
  const [offerings, setOfferings] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const introductionRef = ref(txtdb, 'internetCollege/introduction');
    const aimsRef = ref(txtdb, 'internetCollege/aims');
    const philosophyRef = ref(txtdb, 'internetCollege/philosophy');
    const offeringsRef = ref(txtdb, 'internetCollege/offerings');

    const fetchData = () => {
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

  const handleLearnMoreClick = () => {
    document.getElementById('aims-section').scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Notification message={error} type="error" onClose={() => setError('')} />
      </div>
    );
  }

  return (
    <div className="bg-sky-100 min-h-screen">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen relative">
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">Welcome to The Internet College</h1>
            <p className="text-2xl mb-8">A place for modern learning and growth</p>
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleLearnMoreClick}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-16 bg-gradient-to-b from-sky-100 to-white">
        <motion.h1 
          className="text-5xl font-extrabold text-center text-indigo-900 mb-12 tracking-wide"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          The Internet College
        </motion.h1>

        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white shadow-2xl rounded-lg p-10 mb-8 transition-transform transform hover:-translate-y-1 hover:shadow-3xl">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4 border-b-4 border-gray-300 pb-2">
              Introduction
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-serif whitespace-pre-line">
              {introduction.split('\n').map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}
            </p>
          </div>
        </motion.section>

        <motion.section 
          id="aims-section"
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white shadow-2xl rounded-lg p-10 mb-8 transition-transform transform hover:-translate-y-1 hover:shadow-3xl">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4 border-b-4 border-gray-300 pb-2">
              Aims
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-serif whitespace-pre-line">
              {aims.split('\n').map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}
            </p>
          </div>
        </motion.section>

        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white shadow-2xl rounded-lg p-10 mb-8 transition-transform transform hover:-translate-y-1 hover:shadow-3xl">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4 border-b-4 border-gray-300 pb-2">
              Philosophy and Pedagogy
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-serif whitespace-pre-line">
              {philosophy.split('\n').map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}
            </p>
          </div>
        </motion.section>

        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-white shadow-2xl rounded-lg p-10 mb-8 transition-transform transform hover:-translate-y-1 hover:shadow-3xl">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4 border-b-4 border-gray-300 pb-2">
              Current Offerings
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-serif whitespace-pre-line">
              {offerings.split('\n').map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Initiative1Page;
