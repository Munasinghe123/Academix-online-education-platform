const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    topicName: { type: String, required: true },
    documentUrl: { type: String },
    videoUrl: { type: String }
});

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    courseDescription: { type: String, required: true },
    instructorName: { type: String, required: true },
    instructorEmail: { type: String, required: true },
    category: { type: String, required: true },
    topics: [topicSchema],
    prerequisites: { type: String },
    price: { type: Number, required: true },
    photo: { type: String },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
