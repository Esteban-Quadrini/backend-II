
const express = require('express');
const router = express.Router();
const purchaseCtrl = require('../controllers/purchase.controller');
const auth = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize.middleware');

router.post('/', auth, authorize(['user','premium']), purchaseCtrl.createPurchase);

module.exports = router;
