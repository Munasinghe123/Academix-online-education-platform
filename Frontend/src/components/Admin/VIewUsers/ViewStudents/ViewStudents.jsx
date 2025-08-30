import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewStudents() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('accessToken');

                const response = await axios.get(`http://localhost:7001/api/users/getAllUsers`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUsers(response.data);
            } catch (err) {
                console.log(err);
                alert("Couldn't fetch users");
            }
        };

        fetchUsers();
    }, []);

    const students = users.filter((s) => s.role === 'student');

    return (
        <div className="h-screen bg-gray-100 flex flex-col items-center">
            <h1 className="mt-[150px] text-4xl font-bold text-gray-800">All Students</h1>

            <div className="mt-10 w-full max-w-4xl">
                <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Photo</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                        } hover:bg-blue-100`}
                                >
                                    <td className="px-6 py-4 text-gray-700">{student.name}</td>
                                    <td className="px-6 py-4 text-gray-700">
                                        <img
                                            src={`http://localhost:7001/uploads/${student.photo}`}
                                            alt={student.name}
                                            className="h-12 w-12 object-cover border-gray-300 shadow-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{student.email}</td>
                                    <td className="px-6 py-4">
                                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
                                            Delete
                                        </button>
                                        <Link>
                                            <button className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-700 transition duration-300">
                                                Update
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                                    No students found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewStudents;
