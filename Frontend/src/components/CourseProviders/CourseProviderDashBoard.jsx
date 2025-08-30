import React from 'react'

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function CourseProviderDashBaord() {

    const { user } = useContext(AuthContext);

    return (
        <div className='h-screen'>
            <h1 className='mt-[150px]'>Course Provider DashBaord</h1>

            <p>Name - {user.name}</p>
            <p>Email - {user.email}</p>
        </div>
    )



}
export default CourseProviderDashBaord;