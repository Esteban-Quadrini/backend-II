const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1 }
});

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true, required: true },
  age: Number,
  password: { type: String, required: true },
  role: { type: String, enum: ['user','premium','admin'], default: 'user' },
  cart: [CartItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
