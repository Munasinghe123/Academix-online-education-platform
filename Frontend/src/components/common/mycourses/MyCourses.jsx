import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext"; 

function MyCourses() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const fetchMyCourses = async () => {
      if (!isAuthenticated) {
        setCourses([]);
        return;
      }
      try {
        const { data } = await axios.get(
          "http://localhost:7003/api/payment/my-courses",
          { withCredentials: true }
        );
        if (!cancelled) setCourses(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled)
          setError(e.response?.data?.message || e.message || "Failed to load courses");
        if (!cancelled) setCourses([]);
      }
    };

    fetchMyCourses();
    return () => { cancelled = true; };
  }, [isAuthenticated]);

 
  if (!isAuthenticated) {
    return (
      <div className="mt-40 px-6 ">
        <h1 className="text-3xl font-bold mb-4">My Courses</h1>
        <p className="text-gray-700 mb-4">Please log in to view your courses.</p>
        <button
          onClick={() => navigate("/login", { state: { from: "/my-courses" } })}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Go to login
        </button>
      </div>
    );
  }

  const isLoading = courses === null;

  return (
    <div className="mt-20 px-6 pb-20 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      {isLoading && <div className="text-gray-600">Loading…</div>}

      {!!error && (
        <div className="mb-4 p-3 rounded bg-red-50 text-red-700 border border-red-200">
          {error}
        </div>
      )}

      {!isLoading && !error && courses.length === 0 && (
        <div className="text-gray-600">You haven’t purchased any courses yet.</div>
      )}

      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        {(courses || []).map((c) => (
          <Link
            key={c._id}
            to={`/courseDetails/${c._id}`}
            className="block bg-white rounded-lg shadow hover:shadow-md transition p-4"
          >
            {c.photo && (
              <img
                src={`http://localhost:7000/uploads/${c.photo}`}
                alt={c.courseName}
                className="h-40 w-full object-cover rounded"
              />
            )}
            <div className="mt-3">
              <h3 className="font-semibold">{c.courseName}</h3>
              {c.price != null && (
                <div className="text-sm text-gray-600 mt-1">${c.price}</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MyCourses;
