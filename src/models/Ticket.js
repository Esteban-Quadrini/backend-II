const mongoose = require('mongoose');

const TicketProductSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  price: Number
}, { _id: false });

const TicketSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  amount: Number,
  purchaser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [TicketProductSchema],
  purchase_datetime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', TicketSchema);
