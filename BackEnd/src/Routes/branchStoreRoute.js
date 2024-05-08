const express = require('express');
const router = express.Router();
const BranchStoreController = require('../app/controllers/BranchStoreController');
const CustomerController = require('../app/controllers/CustomerController');
const {checkUserJWT, checkPermissionUser} = require("../middleware/verifyJWT");

router.get('/store/show/',checkUserJWT, checkPermissionUser, BranchStoreController.getBranchStoreWithId);
router.get('/store/show/medicine/',checkUserJWT, checkPermissionUser, BranchStoreController.getMedicineBranch);
router.post('/create/order/', checkUserJWT, checkPermissionUser, BranchStoreController.createPrescription)
router.get('/show/prescription/branch/', checkUserJWT, checkPermissionUser, BranchStoreController.fetchDataPrescriptionWithBranch)
router.get('/show/detail-prescription/:prescriptionId', checkUserJWT, checkPermissionUser, BranchStoreController.fetchPrescriptionDetail)
// API Customer
router.get('/get/customer/:phone', checkUserJWT, checkPermissionUser, CustomerController.getCustomer);
module.exports = router;