
const PurchaseService = require('../services/PurchaseService');
const TicketDTO = require('../dtos/TicketDTO');

exports.createPurchase = async (req, res) => {
  try {
    const userId = req.user._id;
    const items = req.body.items || [];
    const result = await PurchaseService.createPurchase(userId, items);
    if (!result.success) return res.status(400).json({ error: 'Stock insuficiente', details: result.details });
    res.status(201).json(new TicketDTO(result.ticket));
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || err });
  }
};
