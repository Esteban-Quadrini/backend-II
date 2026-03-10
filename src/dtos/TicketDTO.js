
class TicketDTO {
  constructor(ticket) {
    this.id = ticket._id || ticket.id;
    this.code = ticket.code;
    this.amount = ticket.amount;
    this.purchaser = ticket.purchaser;
    this.products = ticket.products;
    this.purchase_datetime = ticket.purchase_datetime;
  }
}

module.exports = TicketDTO;
