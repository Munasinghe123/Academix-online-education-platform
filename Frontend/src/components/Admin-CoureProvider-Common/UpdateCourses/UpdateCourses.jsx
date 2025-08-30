import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';


function UpdateCourses() {

    const { id } = useParams();

    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState('');
    const [instructorName, setInstructorName] = useState('');
    const [instructorEmail, setInstructorEmail] = useState('');
    const [category, setCategory] = useState('');
    const [topics, setTopics] = useState([{ topicName: '', documentUrl: '', videoUrl: '' }]);
    const [prerequisites, setPrerequisites] = useState('');
    const [price, setPrice] = useState('');
    const [photo, setPhoto] = useState(null);

    useEffect(() => {

        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:7001/api/courses/getCourseById/${id}`)

                console.log("course details", response.data);

                setCourseName(response.data.courseName)
                setCourseDescription(response.data.courseDescription)
                setInstructorName(response.data.instructorName)
                setInstructorEmail(response.data.instructorEmail)
                setCategory(response.data.category)
                setTopics(response.data.topics)
                setPrerequisites(response.data.prerequisites)
                setPrice(response.data.price)
                setPhoto(response.data.photo)

            } catch (err) {
                alert("Couldnt fetch courses")
            }
        }

        fetchCourses();

    }, [id])

    const uploadPhoto = () => {
        setPhoto(e.target.files[0]);
    }

    const handleTopicChange = (index, event) => {

        const value = [...topics];
        value[index][event.target.name] = [event.target.value]
        setTopics(value);

    }

    const addTopic = () => {
        setTopics([...topics, { topicName: '', documentUrl: '', videoUrl: '' }])
    }


    const updateCourse = (event) => {
        event.preventDefault();
    }


    return (
        <div className="form-container">
            <div className='form-card'>
                <h1 className="">Update Courses</h1>

                <form onSubmit={updateCourse}>

                    <label>Course Name</label>
                    <input
                        type='text'
                        name="CourseName"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)} />

                    {photo && (
                        <img
                            src={`http://localhost:7001/uploads/${photo}`}
                            alt={courseName}
                            className='className="mt-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto'
                        />
                    )}

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


                    <button type='submit'>Update Course</button>
                </form>
            </div>
        </div>

    )
}

export default UpdateCourses
