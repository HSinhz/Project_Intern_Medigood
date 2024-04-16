const express = require('express');
const router = express.Router();
const MedicineController = require('../app/controllers/MedicineController');
const {checkUserJWT, checkPermissionUser} = require("../middleware/verifyJWT")


router.get('/medicine/show/',checkUserJWT, checkPermissionUser, MedicineController.showMedicine);

module.exports = router;