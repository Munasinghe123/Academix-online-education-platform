const express = require("express");
const Stripe = require("stripe");
const Payment = require("../models/paymentModel");
const router = express.Router();
const jwt = require('jsonwebtoken');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Enrollment = require("../models/enrollmetModel")
const axios = require('axios');

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems = [], userName } = req.body;

    const token = req.cookies?.accessToken;
    const decoded = token ? jwt.verify(token, process.env.JWT_SECRET) : null;
    const userId = decoded?.id || '';
    const userEmail = decoded.email || '';
    const userPhone = decoded.phone || '';

  
    const line_items = cartItems.map(i => ({
      price_data: {
        currency: "usd",
        product_data: { name: i.courseId.courseName },
        unit_amount: Math.round(Number(i.courseId.price) * 100),
      },
      quantity: Number(i.quantity || 1),
    }));

    const courseIds = cartItems.map(i => String(i.courseId._id));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ['card'],
      line_items,
      success_url: `${process.env.FRONTEND_URL}/payment-success?name=${encodeURIComponent(userName || '')}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      metadata: {
        
        userId,
        userName,
        userEmail,
        userPhone,
        courseIds: JSON.stringify(courseIds),
      },
    });

   
    const snapshot = cartItems.map(i => ({
      courseId: String(i.courseId?._id || i.courseId),
      name: i.courseId.courseName,
      price: Number(i.courseId.price),
      quantity: Number(i.quantity || 1),
    }));

    await Payment.findOneAndUpdate(
      { sessionId: session.id },
      {
        $setOnInsert: {
          sessionId: session.id,
          status: 'created',
          currency: 'usd',
          userId: req.user?.id || '',
          lineItems: snapshot,
        }
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe create session error:", err.message);
    return res.status(500).json({ message: "Checkout session failed" });
  }
});


router.get('/course-content/:courseId', async (req, res) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) return res.status(401).json({ message: 'Unauthenticated' });
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

    const { courseId } = req.params;
    const enrolled = await Enrollment.findOne({ userId, courseId }).lean();
    if (!enrolled) return res.status(403).json({ message: 'Not enrolled' });

    const headers = process.env.INTERNAL_SECRET
      ? { 'x-internal-secret': process.env.INTERNAL_SECRET }
      : {};

    const { data } = await axios.get(
      `http://course-service:7000/api/courses/content/${courseId}`,
      { headers, timeout: 5000 }
    );
    return res.json(data); 
  } catch (e) {
    console.error('course-content error:', e.message);
    res.status(500).json({ message: 'Failed to fetch content' });
  }
});


module.exports = router;
