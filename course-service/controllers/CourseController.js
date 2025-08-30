const CourseModel = require('../models/CourseModel')

const createcourse = async (req, res) => {

    try {
        const { courseName, courseDescription, instructorName,
            instructorEmail, category, topics, prerequisites, price
        } = req.body

        const photo = req.file ? req.file.filename : null;

        const newCourse = new CourseModel({
            courseName,
            courseDescription,
            instructorName,
            instructorEmail,
            category,
            topics:
                topics.map(topic => ({
                    topicName: topic.topicName,
                    documentUrl: topic.documentUrl,
                    videoUrl: topic.videoUrl
                })),
            prerequisites,
            price,
            photo
        })

        await newCourse.save();

        console.log(newCourse)

        res.status(200).json({ newCourse })

    } catch (err) {
        console.log(err);
    }
}

const getAllCourses = async (req, res) => {

    let Courses;

    try {

        Courses = await CourseModel.find();

    } catch (err) {
        console.log(err);
    }

    console.log(Courses);
    res.status(200).json(Courses);
}

const getCourseById = async (req, res) => {

    let id = req.params.id;

    let course

    try {
        course = await CourseModel.findById(id);

        console.log("course details", course)
    } catch (err) {
        console.log(err);
    }

    res.status(200).json(course)
}

const updateCourse = async (req, res) => {

    let id = req.params.id;

    try {

        let course = await CourseModel.findById(id);

    } catch (error) {

    }
}

const bulkByIds = async (req, res) => {
    const { ids = [] } = req.body;
    const courses = await CourseModel.find({ _id: { $in: ids } }).lean();
    res.json(courses);
}

module.exports = { createcourse, getAllCourses, getCourseById, updateCourse, bulkByIds }