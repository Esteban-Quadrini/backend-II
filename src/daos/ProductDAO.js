const Product = require('../models/Product');

class ProductDAO {
  static async create(data) { return Product.create(data); }
  static async findById(id) { return Product.findById(id); }
  static async updateById(id, update) { return Product.findByIdAndUpdate(id, update, { new: true }); }
  static async findAll() { return Product.find(); }
}

module.exports = ProductDAO;
