
const TicketDAO = require('../daos/TicketDAO');

class TicketRepository {
  static async create(data) { return TicketDAO.create(data); }
  static async findByPurchaser(purchaserId) { return TicketDAO.findByPurchaser(purchaserId); }
}

module.exports = TicketRepository;
