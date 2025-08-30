const { createcourse, getAllCourses, getCourseById, updateCourse,bulkByIds } = require('../controllers/CourseController')

const express = require('express')
const router = express.Router();

const verifyaccessToken = require('../middleware/VerifyAccessToken')
const verifyRefreshToken = require('../middleware/VerifyRefreshTokens')
const verifyRole = require('../middleware/RoleMiddleWare')
const verifyInternal = require('../middleware/verifyInternal')
const upload = require('../middleware/MutlerConfig')

const Course = require('../models/CourseModel');

router.post('/addCourse', verifyaccessToken, verifyRole("admin", "courseProvider"), upload.single('photo'), createcourse);

router.get('/getAllCourses', getAllCourses);
router.get('/getCourseById/:id', getCourseById);

router.put('/updateCourse', verifyaccessToken,verifyRefreshToken, verifyRole("admin", "courseProvider"), upload.single('photo'), updateCourse);

// router.get('/bulkByIds',verifyaccessToken,verifyRole("admin", "courseProvider","student"),bulkByIds);
router.post(
  '/bulkByIds',
  (req, res, next) => {
    console.log('[courses] HIT GET /bulkByIds', {
      query: req.query,
      body: req.body,        
      from: req.ip,
      ua: req.get('user-agent')
    });
    next();
  },

  bulkByIds
);

router.get('/content/:id', verifyInternal, async (req, res) => {
  const c = await Course.findById(req.params.id).lean();
  if (!c) return res.status(404).json({ message: 'Not found' });
  res.json({ topics: c.topics });
});


module.exports = router;