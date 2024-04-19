const express = require('express');
const router = express.Router();
const MedicineController = require('../app/controllers/MedicineController');
const {checkUserJWT, checkPermissionUser} = require("../middleware/verifyJWT")
const multer = require('multer');
const uploadImg = multer({storage: multer.memoryStorage() });

router.get('/medicine/show/',checkUserJWT, checkPermissionUser, MedicineController.showMedicine);
router.get('/show/medicine/category', checkUserJWT, MedicineController.getCategoryMedicine );
router.get('/show/medicine/type', checkUserJWT, MedicineController.getTypeMedicine );
router.get('/medicine/show/detail/:medicineId', checkUserJWT, MedicineController.getMedicineById );

router.post('/create/medicine/', uploadImg.single('image'), checkUserJWT, checkPermissionUser, MedicineController.createMedicine)

module.exports = router;