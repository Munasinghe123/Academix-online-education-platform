import React, { useState } from 'react';
import axios from 'axios';

function AddCourses() {
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [instructorName, setInstructorName] = useState('');
    const [instructorEmail, setInstructorEmail] = useState('');
    const [category, setCategory] = useState('');
    const [topics, setTopics] = useState([{ topicName: '', documentUrl: '', videoUrl: '' }]);
    const [prerequisites, setPrerequisites] = useState('');
    const [price, setPrice] = useState('');
    const [photo, setPhoto] = useState(null);

    const uploadPhoto = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleTopicChange = (index, event) => {
        const values = [...topics];
        values[index][event.target.name] = event.target.value;
        setTopics(values);
    };

    const addTopic = () => {
        setTopics([...topics, { topicName: '', documentUrl: '', videoUrl: '' }]);
    };

    const AddCourse = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('courseName', courseName);
        formData.append('courseDescription', courseDescription);
        formData.append('instructorName', instructorName);
        formData.append('instructorEmail', instructorEmail);
        formData.append('category', category);
        formData.append('prerequisites', prerequisites);
        formData.append('price', price);
        if (photo) formData.append('photo', photo);

       
        topics.forEach((topic, index) => {
            formData.append(`topics[${index}][topicName]`, topic.topicName);
            formData.append(`topics[${index}][documentUrl]`, topic.documentUrl);
            formData.append(`topics[${index}][videoUrl]`, topic.videoUrl);
        });

        try {
            const accessToken = localStorage.getItem("accessToken");

            const response = await axios.post(`http://localhost:7000/api/courses/addCourse`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.status === 200) {
                alert('Course added successfully');

                setCourseName("")
                setCourseDescription("")
                setInstructorName("")
                setInstructorEmail("")
                setCategory("")
                setTopics([{ topicName: '', documentUrl: '', videoUrl: '' }])
                setPrerequisites("")
                setPrice("")
                setPhoto(null)

            } else {
                alert('Error adding course');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding course');
        }
    };

    return (
        <div className='form-container'>
            <div className='form-card'>
                <form onSubmit={AddCourse}>
                    <h1>Add courses</h1>
                    <label>Course Name</label>
                    <input
                        type='text'
                        name="CourseName"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)} />

                    <label>Photo</label>
                    <input
                        type='file'
                        accept='image/*'
                        name='photo'
                        onChange={uploadPhoto} />

                    <label>Course Description</label>
                    <textarea
                        name='courseDescription'
                        cols={20}
                        rows={5}
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                    ></textarea>

                    <label>Instructor Name</label>
                    <input
                        type='text'
                        name="InstructorName"
                        value={instructorName}
                        onChange={(e) => setInstructorName(e.target.value)} />

                    <label>Instructor Email</label>
                    <input
                        type='email'
                        name="InstructorEmail"
                        value={instructorEmail}
                        onChange={(e) => setInstructorEmail(e.target.value)} />

                    <label>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                        <option value="" disabled>Select an option</option>
                        <option value="Se">Software Engineering</option>
                        <option value="Ds">Data Science</option>
                        <option value="Im">Interactive Media</option>
                        <option value="Is">Information Systems</option>
                        <option value="Cs">Cyber Security</option>
                    </select>

                    <label>Content details</label>

                  
                    {topics.map((topic, index) => (
                        <div key={index}>
                            <label>Topic Name</label>
                            <input
                                type='text'
                                name='topicName'
                                value={topic.topicName}
                                onChange={(e) => handleTopicChange(index, e)} />

                            <label>Documents URLs</label>
                            <input
                                type='text'
                                name='documentUrl'
                                value={topic.documentUrl}
                                onChange={(e) => handleTopicChange(index, e)} />

                            <label>Video URLs</label>
                            <input
                                type='text'
                                name='videoUrl'
                                value={topic.videoUrl}
                                onChange={(e) => handleTopicChange(index, e)} />

                        </div>
                    ))}
                    <button
                        className="py-2 px-4 bg-orange-400 text-white rounded hover:bg-orange-500"
                        onClick={addTopic}>Add Topic</button>

                    <label>Prerequisites</label>
                    <input
                        type='text'
                        value={prerequisites}
                        onChange={(e) => setPrerequisites(e.target.value)} />

                    <label>Price</label>
                    <input
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} />

                    <button type='submit'>Add Course</button>
                </form>
            </div>
        </div>
    );
}

export default AddCourses;
