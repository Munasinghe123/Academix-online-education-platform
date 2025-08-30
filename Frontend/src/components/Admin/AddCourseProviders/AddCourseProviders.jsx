import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddCourseProviders() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [photo, setPhoto] = useState(null);

    const addCourseProvider = async (event) => {
        event.preventDefault();

        if (!name || !email || !password || !role || !photo) {
            alert("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", role);
        formData.append("photo", photo);

        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await axios.post(
                `http://localhost:7001/api/users/addCourseProvider`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                alert('Course Provider created successfully');

                navigate('/ViewCourseProviders');
            } else {
                alert('Failed to create course provider');
            }
        } catch (error) {
            console.error('Error creating course provider:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleFileChange = (e) => {
       
        setPhoto(e.target.files[0]);
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h1 className="mb-6 text-2xl font-bold text-center text-orange-600">
                    Add Course Providers
                </h1>

                <form className="addusers-form" onSubmit={addCourseProvider}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <br />
                    <br />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br />
                    <br />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <br />

                    <label htmlFor="picture">Profile Picture</label>
                    <input
                        type="file"
                        name="picture"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                    <br />
                    <br />

                    <label>Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="">Select the role</option>
                        <option value="courseProvider">Course Provider</option>
                    </select>
                    <br />
                    <br />

                    <button type="submit">Add Course Provider</button>
                </form>
            </div>
        </div>
    );
}

export default AddCourseProviders;
