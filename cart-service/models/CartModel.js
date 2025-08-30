const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    quantity: { type: Number, required: true, default: 1 },
});

module.exports = mongoose.model('Cart', cartSchema);
