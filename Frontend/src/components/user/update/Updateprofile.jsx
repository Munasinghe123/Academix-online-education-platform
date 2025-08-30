import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Updateprofile() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [currentPassword, setcurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:7001/api/users/getUserById/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { name, email, photo } = response.data.user;
                setName(name);
                setEmail(email);
                setPhoto(photo);
            } catch (err) {
                console.error("Error fetching user:", err);
                alert("Failed to fetch user data. Please try again.");
            }
        };
        fetchUser();
    }, [id]);

    const updateForm = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("currentPassword", currentPassword);
        formData.append("newPassword", newPassword);
        if (photo) formData.append("photo", photo);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:7001/api/users/Updateprofile/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                alert("Details successfully updated");

                console.log(response.data.message);
                console.log(response.data);
            }
        } catch (err) {
            console.error("Update error:", err);
            alert("An error occurred while updating your profile. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h1 className="text-black">Update Profile</h1>
                <form onSubmit={updateForm}>
                    <label>Photo</label>
                    <img
                        src={`http://localhost:7001/uploads/${photo}`}
                        className="w-32 h-32 rounded-full object-cover mr-4 border border-gray-200"
                        alt="profile"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label>Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setcurrentPassword(e.target.value)}
                    />
                    <label>New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button type="submit">Update Profile</button>
                </form>
            </div>
        </div>
    );
}

export default Updateprofile;
