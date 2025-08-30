import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';

function CourseDetails() {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();

  const [course, setCourse] = useState(null); 
  const [topics, setTopics] = useState([]);   
  const [locked, setLocked] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
       
        const pub = await axios.get(`http://localhost:7000/api/courses/getCourseById/${id}`);
        if (!cancel) setCourse(pub.data);

     
        try {
          const sec = await axios.get(
            `http://localhost:7003/api/payment/course-content/${id}`,
            { withCredentials: true }
          );
          if (!cancel) {
            setTopics(sec.data.topics || []);
            setLocked(false);
          }
        } catch (e) {
          if (e.response?.status === 403) {
            if (!cancel) setLocked(true);           
          } else if (e.response?.status === 401) {
            if (!cancel) setError('Please log in to view content');
          } else {
            console.error(e);
          }
        }
      } catch (e) {
        console.error(e);
        if (!cancel) setError('Could not load course');
      }
    })();
    return () => { cancel = true; };
  }, [id]);

  if (error) return <div className="mt-20 p-6 h-[100vw] text-red-600">{error}</div>;
  if (!course) return <div className="mt-20 p-6 h-[100vw]">Loading…</div>;

  const { courseName, courseDescription, instructorName, instructorEmail, price, photo } = course;

  return (
    <div className="flex flex-col h-[100vw] bg-gray-50 p-6 mt-20">
      <h1 className="text-4xl font-extrabold text-gray-900">{courseName}</h1>

      {photo && (
        <img
          src={`http://localhost:7000/uploads/${photo}`}
          alt={courseName}
          className="mt-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto"
        />
      )}

      <p className="mt-6 text-xl text-gray-700 leading-relaxed">{courseDescription}</p>

      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Instructor Information</h2>
        <p className="mt-2 text-gray-700"><strong>Name:</strong> {instructorName}</p>
        <p className="mt-2 text-gray-700"><strong>Email:</strong> {instructorEmail}</p>
      </div>

      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Course Price</h2>
        <p className="mt-2 text-lg font-semibold text-gray-900">${price}</p>

        {locked && (
          <button
            onClick={() => addToCart(id)}      
            className="mt-5 w-full sm:w-auto text-white bg-red-500 hover:bg-red-600
                       focus:outline-none focus:ring-4 focus:ring-red-300 rounded-md px-6 py-3 text-lg
                       font-semibold shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Buy Now
          </button>
        )}
      </div>

      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Course Topics</h2>
        {!locked ? (
          topics.length ? (
            <ul className="mt-4 list-disc pl-6">
              {topics.map((t, i) => (
                <li key={i} className="mb-2">
                  <div className="font-medium">{t.topicName}</div>
                  {t.documentUrl && <a className="text-blue-600 underline" href={t.documentUrl} target="_blank">Document</a>}
                  {t.videoUrl && <a className="ml-3 text-blue-600 underline" href={t.videoUrl} target="_blank">Video</a>}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-600 mt-2">No topics yet.</div>
          )
        ) : (
          <div className="mt-2 text-gray-600">
            Topics are locked. Purchase the course to access the full content.
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;
