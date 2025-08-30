const mongoose = require('mongoose');

const LineItemSchema = new mongoose.Schema({
  courseId: { type: String, required: true },      
  name:     { type: String, required: true },
  price:    { type: Number, required: true },     
  quantity: { type: Number, default: 1 },
}, { _id: false });

const PaymentSchema = new mongoose.Schema({
  sessionId:        { type: String, index: true, unique: true }, 
  paymentIntentId:  { type: String, index: true },              
  status:           { type: String, enum: ['created','succeeded','failed','expired'], default: 'created' },
  amountTotal:      { type: Number },      
  currency:         { type: String, default: 'usd' },
  userId:           { type: String, index: true }, 
  orderId:          { type: String },             
  lineItems:        [LineItemSchema],              
  receiptUrl:       { type: String },
  stripeCustomerId: { type: String },

  raw:              { type: Object },             
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
