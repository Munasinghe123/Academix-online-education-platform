import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewCourseProviders() {
    const [user, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");

                const response = await axios.get(`http://localhost:7001/api/users/getAllUsers`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setUsers(response.data);
            } catch (err) {
                alert("Couldn't fetch the users");
                console.log(err);
            }
        };

        fetchUsers();
    }, []);

    const courseProviders = user.filter((c) => c.role === 'courseProvider');

    return (
        <div className="flex flex-col min-h-screen pb-6">
          
            <div className="flex-grow flex flex-col items-center bg-gray-100">
                <h1 className="mt-[150px] text-4xl font-bold text-gray-800">All Course Providers</h1>

                <div className="mt-10 w-full max-w-4xl">
                    <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Photo</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseProviders.length > 0 ? (
                                courseProviders.map((provider, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                            } hover:bg-blue-100`}
                                    >
                                        <td className="px-6 py-4 text-gray-700">{provider.name}</td>
                                        <td className="px-6 py-4">
                                            <img
                                                src={`http://localhost:7001/uploads/${provider.photo}`}
                                                alt={provider.name}
                                                className="w-16 h-16 object-cover rounded-md border border-gray-300"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">{provider.email}</td>
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
                                    <td
                                        colSpan={4}
                                        className="px-6 py-4 text-center text-gray-500"
                                    >
                                        No course providers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
}

export default ViewCourseProviders;
