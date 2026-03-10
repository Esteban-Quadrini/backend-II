
const ProductDAO = require('../daos/ProductDAO');

class ProductRepository {
  static async create(data) { return ProductDAO.create(data); }
  static async findById(id) { return ProductDAO.findById(id); }
  static async updateById(id, update) { return ProductDAO.updateById(id, update); }
  static async findAll() { return ProductDAO.findAll(); }
}

module.exports = ProductRepository;
