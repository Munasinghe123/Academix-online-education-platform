const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  userId:   { type: String, index: true, required: true },
  courseId: { type: String, index: true, required: true },
  sessionId:{ type: String, index: true },
}, { timestamps: true });

EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
