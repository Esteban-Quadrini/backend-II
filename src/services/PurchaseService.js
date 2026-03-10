
const ProductRepository = require('../repositories/ProductRepository');
const TicketRepository = require('../repositories/TicketRepository');
const UserRepository = require('../repositories/UserRepository');
const { v4: uuidv4 } = require('uuid');

class PurchaseService {
  static async createPurchase(userId, items) {
  
    const insufficient = [];
    const productsSnapshot = [];
    let total = 0;

    for (const it of items) {
      const product = await ProductRepository.findById(it.productId);
      if (!product) throw { status: 400, message: `Producto ${it.productId} no encontrado` };
      if (product.stock < it.quantity) insufficient.push({ product: product._id, available: product.stock, requested: it.quantity });
      productsSnapshot.push({ product, quantity: it.quantity });
      total += product.price * it.quantity;
    }

    if (insufficient.length) {
      return { success: false, details: insufficient };
    }

    
    for (const p of productsSnapshot) {
      await ProductRepository.updateById(p.product._id, { stock: p.product.stock - p.quantity });
    }

    
    const code = uuidv4();
    const ticketData = {
      code,
      amount: total,
      purchaser: userId,
      products: productsSnapshot.map(p => ({ product: p.product._id, quantity: p.quantity, price: p.product.price }))
    };
    const ticket = await TicketRepository.create(ticketData);

    
    await UserRepository.clearCart(userId);

    return { success: true, ticket };
  }
}

module.exports = PurchaseService;
