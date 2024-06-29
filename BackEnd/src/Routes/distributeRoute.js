const express = require('express');
const router = express.Router();
const {checkUserJWT, checkPermissionUser} = require("../middleware/verifyJWT");
const DistributeController = require("../app/controllers/DistributeController");

// API Purchase Order 
router.post('/create/distribute/', checkUserJWT, checkPermissionUser, DistributeController.createDistributeOrder);
router.get('/show/distribute/', checkUserJWT, checkPermissionUser, DistributeController.getDistribute);
router.get('/show/distribute/branch/', checkUserJWT, checkPermissionUser, DistributeController.getDistributeBranch);
router.get('/show/detail-distribute/:DistributeId', checkUserJWT, checkPermissionUser, DistributeController.showDetailDistribute);
router.put('/confirm/distribute/:DistributeId', checkUserJWT, checkPermissionUser, DistributeController.confirmDistributeOrder)
router.post('/create/distribute/branch/', checkUserJWT, checkPermissionUser, DistributeController.createDistributeBranch);


module.exports = router;