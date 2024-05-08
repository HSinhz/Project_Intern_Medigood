const express = require('express');
const router = express.Router();
const MedicineController = require('../app/controllers/MedicineController');
const {checkUserJWT, checkPermissionUser} = require("../middleware/verifyJWT")
const multer = require('multer');
const uploadImg = multer({storage: multer.memoryStorage() });

router.get('/medicine/show/',checkUserJWT, checkPermissionUser, MedicineController.showMedicine);
router.get('/show/medicine/category', checkUserJWT, MedicineController.getCategoryMedicine );
router.get('/show/medicine/category/:typeId', checkUserJWT, MedicineController.getCategoryMedicineByType );

router.get('/show/medicine/type', checkUserJWT, MedicineController.getTypeMedicine );
router.get('/show/medicine/unit', checkUserJWT, MedicineController.getUnit );

router.get('/medicine/show/detail/:medicineId', checkUserJWT, MedicineController.getMedicineById );

router.post('/create/medicine/', uploadImg.single('image'), checkUserJWT, checkPermissionUser, MedicineController.createMedicine);
router.put('/edit/medicine/:medicineId', uploadImg.single('image'), checkUserJWT, checkPermissionUser, MedicineController.editMedicine);
router.delete('/delete/medicine/:medicineId', checkUserJWT, checkPermissionUser, MedicineController.deleteMedicine);
module.exports = router;