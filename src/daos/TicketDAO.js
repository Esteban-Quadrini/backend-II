
const Ticket = require('../models/Ticket');

class TicketDAO {
  static async create(data) { return Ticket.create(data); }
  static async findById(id) { return Ticket.findById(id); }
  static async findByPurchaser(purchaserId) { return Ticket.find({ purchaser: purchaserId }); }
}

module.exports = TicketDAO;
