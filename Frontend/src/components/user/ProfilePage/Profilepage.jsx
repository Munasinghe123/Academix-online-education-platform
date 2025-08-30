import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Profilepage() {
    const navigate = useNavigate();

    const { user, logout } = useContext(AuthContext);
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchPhoto = async () => {
            if (user && user.id) {
                try {
                    const accessToken = localStorage.getItem("accessToken");
                    const response = await axios.get(`http://localhost:7001/api/users/getUserById/${user.id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    setPhoto(response.data.user.photo);
                    setName(response.data.user.name);
                    setEmail(response.data.user.email);
                } catch (err) {
                    console.error(err);
                }
            }
        };

        fetchPhoto();
    }, [user]);

    const deleteProfile = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.delete(`http://localhost:7001/api/users/deleteUser/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                alert("Account deleted");
                localStorage.removeItem("token");
                logout();
                navigate('/login');
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (!user) {
        return <p className="text-center mt-10 text-gray-500">Loading...</p>;
    }

    return (
        <div className="h-screen flex flex-col items-center justify-start bg-gray-100">
            <div className="mt-32 w-96 border border-gray-300 rounded-lg shadow-lg bg-white p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Profile Page
                </h1>
                <div className="flex items-center justify-center mb-4">
                    <img
                        src={`http://localhost:7001/uploads/${photo}`}
                        alt={user.name}
                        className="w-32 h-32 rounded-full object-cover mr-4 border border-gray-200"
                    />
                </div>
                <p className="text-gray-700 text-lg text-center">User name: <strong>{name}</strong></p>
                <p className="text-gray-700 text-lg text-center">User email: <strong>{email}</strong></p>

                <button
                    onClick={deleteProfile} 
                    className="bg-red-500 text-white w-28 mt-4 h-10 rounded-md hover:bg-red-700 transition-colors duration-300 mb-2"
                >
                    Delete Profile
                </button>

                <Link to={`/UpdateProfile/${user.id}`}>
                    <button
                        className="bg-green-500 text-white w-28 ml-5 h-10 rounded-md hover:bg-green-700 transition-colors duration-300"
                    >
                        Update profile
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Profilepage;
