
const express = require("express");
const Stripe = require("stripe");
const axios  = require("axios");
const Payment = require("../models/paymentModel");
const Enrollment = require("../models/enrollmetModel"); 
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
   
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    return res.sendStatus(400);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const md = session.metadata || {};

      const userId    = md.userId || null;
      const userName  = md.userName || "";
      const userEmail = md.userEmail || session.customer_details?.email || "";
      const userPhone = md.userPhone || "";
      let   courseIds = [];
      try { courseIds = JSON.parse(md.courseIds || "[]"); } catch {}

     
      await Payment.findOneAndUpdate(
        { sessionId: session.id },
        {
          $set: {
            status: "succeeded",
            paymentIntentId: session.payment_intent || null,
            amountTotal: session.amount_total ? session.amount_total / 100 : undefined,
            currency: session.currency || "usd",
            userId,
            raw: { type: event.type, sessionId: session.id }
          }
        },
        { upsert: true }
      );

     
      if (userId && courseIds.length) {
        const ops = courseIds.map(id => ({
          updateOne: {
            filter: { userId, courseId: id },
            update: { $setOnInsert: { userId, courseId: id, sessionId: session.id } },
            upsert: true
          }
        }));
        await Enrollment.bulkWrite(ops);
      }

      console.log("notofications reached")

      console.log("brfore ",userPhone)

       let revievedUserPhone = userPhone;
        if (revievedUserPhone.startsWith("0")) {
            revievedUserPhone = revievedUserPhone.replace(/^0/, "+94");
        }

        
      console.log("after",revievedUserPhone)

      const payload = {
        email: userEmail ? { to: userEmail, subject: "Enrollment confirmed 🎉", text: `Hi ${userName || "there"}, your payment was successful and you're enrolled.` } : undefined,
        sms:   revievedUserPhone ? { to: revievedUserPhone, body: "Payment successful. Enrollment confirmed." } : undefined
      };

      if (payload.email || payload.sms) {
        axios.post(
          "http://notification-Service:7004/api/notifications/send-notifications",
          payload,
        ).catch(err => console.error("Notify failed:", err.message));
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      await Payment.findOneAndUpdate(
        { sessionId: session.id },
        { $set: { status: "expired" } }
      );
    
    }

    return res.sendStatus(200);
  } catch (e) {
    console.error("Webhook handler error:", e.message);
    return res.sendStatus(500);
  }
});

module.exports = router;
