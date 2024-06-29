const express = require('express');
const router = express.Router();
const {checkUserJWT, checkPermissionUser} = require("../middleware/verifyJWT");
const PurchaseController = require("../app/controllers/PurchaseController");

// API Purchase Order 
router.post('/create/purchase/', checkUserJWT, checkPermissionUser, PurchaseController.createPurchaseOrder)
router.get("/get/purchase/", checkUserJWT, checkPermissionUser, PurchaseController.getAllPurchaseOrder)

module.exports = router;