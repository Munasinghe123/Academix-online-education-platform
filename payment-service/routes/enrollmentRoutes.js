
const axios = require('axios');
const jwt = require('jsonwebtoken');
const Enrollment = require('../models/enrollmetModel');
const express = require("express");
const router = express.Router();

router.get('/my-courses', async (req, res) => {
  try {
    
    const token = req.cookies?.accessToken;
    const decoded = token ? jwt.verify(token, process.env.JWT_SECRET) : null;
    const userId = decoded?.id;

    console.log("userId", userId);
    if (!userId) return res.status(401).json({ message: 'Unauthenticated' });

    const enrolls = await Enrollment.find({ userId }).select('courseId -_id').lean();
    const ids = enrolls.map(e => e.courseId);
    if (!ids.length) return res.json([]);

    console.log("course ids", ids);

   
    const { data } = await axios.post('http://course-service:7000/api/courses/bulkByIds', { ids });
    res.json(data);
  } catch (e) {
    console.error('my-courses error:', e.message);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
});


module.exports = router;
