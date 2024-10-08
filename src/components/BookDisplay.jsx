import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import Loading from './LoadSaveAnimation/Loading';
import DOMPurify from 'dompurify';

const BookDisplay = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const booksRef = ref(db, 'books');

    onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      const booksList = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];
      setBooks(booksList);
      setIsLoading(false);
    });

    return () => { /* cleanup */ };
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="font-lato text-gray-900 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-6 lg:px-8 py-8 bg-gradient-to-b from-sky-100 to-white">
        <h2 className="text-5xl font-extrabold text-center text-indigo-900 mb-12 tracking-wide">
          Books by Our Members
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {books.map(book => (
            <div key={book.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-indigo-900 ">
                  <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(book.title) }} />
                </h3>
                <p className="text-lg font-medium text-gray-700 mb-1">
                  <span className="text-gray-500">Author:</span> 
                  <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(book.author) }} />
                </p>
                <p className="text-lg font-medium text-gray-700">
                  <span className="text-gray-500">Publisher:</span> 
                  <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(book.publisher) }} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDisplay;
