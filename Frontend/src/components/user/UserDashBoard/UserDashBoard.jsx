import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import './UserDashBoard.css'


const UserProfile = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <p>Loading...</p>; 
    }

    return (
        <div className='userDashBoard-container'>
            <p>Name :{user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    )

};

export default UserProfile;
