import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from '../../../context/AuthContext'
import { CartContext } from "../../../context/CartContext";



function ViewCourses() {

    const { user } = useContext(AuthContext);

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `http://localhost:7000/api/courses/getAllCourses`
                );
                setCourses(response.data);

                console.log("all courses", response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="bg-gray-100 flex flex-col items-center h-100vw">
            <h1 className="mt-[150px] text-4xl font-bold text-gray-800">Our Courses</h1>
            <div className="mt-10 w-full max-w-4xl">
                {courses.map((course, index) => (

                    <Link to={`/courseDetails/${course._id}`}>


                        <div
                            key={index}
                            className="flex border border-gray-300 rounded-lg shadow-lg bg-white p-4 mb-6"
                        >
                            <img
                                src={`http://localhost:7000/uploads/${course.photo}`}
                                alt={course.courseName}
                                className="w-36 h-36 object-cover rounded-lg mr-6"
                            />
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-800">{course.courseName}</h2>
                                <p className="text-gray-600 mt-2">{course.courseDescription}</p>
                                <p className="text-gray-500 mt-2">By {course.instructorName}</p>
                                <div className="flex items-center mt-2">
                                    <span className="text-yellow-500 text-lg font-bold">
                                        {course.rating} ★
                                    </span>
                                    <span className="text-gray-500 ml-2">
                                        ({course.reviews} reviews)
                                    </span>
                                </div>
                                <p className="text-gray-500 mt-2">
                                    {course.hours} total hours • {course.lectures} lectures •{" "}
                                    {course.level}
                                </p>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-2xl font-bold text-gray-800">
                                        ${course.price}
                                    </span>
                                </div>

                                {
                                    user && (user.role === 'admin' || user.role === "courseProvider") && (
                                        <div className="flex space-x-4 mt-4">
                                            <button className="bg-red-500 text-white w-16 rounded-md hover:bg-red-700 transition-colors duration-300">Delete</button>

                                            <Link to={`/updateCourse/${course._id}`}>
                                                <button className="bg-green-500 text-white w-16 rounded-md hover:bg-green-700 transition-colors duration-300"> Update</button>
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div >
    );
}

export default ViewCourses;
