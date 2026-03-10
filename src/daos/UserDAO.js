
const User = require('../models/User');

class UserDAO {
  static async create(data) { return User.create(data); }
  static async findByEmail(email) { return User.findOne({ email }); }
  static async findById(id) { return User.findById(id).populate('cart.product'); }
  static async updateById(id, update) { return User.findByIdAndUpdate(id, update, { new: true }); }
  static async addToCart(userId, productId, quantity) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    const item = user.cart.find(i => i.product.toString() === productId.toString());
    if (item) item.quantity += quantity;
    else user.cart.push({ product: productId, quantity });
    await user.save();
    return user;
  }
  static async clearCart(userId) {
    return User.findByIdAndUpdate(userId, { cart: [] }, { new: true });
  }
  static async findAll() { return User.find(); }
}

module.exports = UserDAO;
