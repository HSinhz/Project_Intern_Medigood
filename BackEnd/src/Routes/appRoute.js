const express = require('express');
const router = express.Router();
const AppController = require("../app/controllers/AppController");

router.post('/login/app', AppController.handlerLoginApp);
router.get('/get/medicine', AppController.getMedicine);
router.get("/get/category", AppController.getCategory);
router.get("/get/medicine/:categoryId", AppController.getMedcineByCategory);
router.get("/show/detail/medicine/:MedicineId", AppController.getMedcineById);
router.get("/app/get/customer/:PhoneCustomer", AppController.getDataCustomer);
router.post('/app/buy/prescription', AppController.buyPrescription);



module.exports = router;