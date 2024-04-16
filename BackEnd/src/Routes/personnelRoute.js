const express = require('express');
const router = express.Router();
const PersonnelController = require('../app/controllers/PersonnelController');
const FireBaseController = require('../app/controllers/FireBaseController');
const {checkUserJWT, checkPermissionUser} = require("../middleware/verifyJWT");
const multer = require('multer');
const uploadImg = multer({storage: multer.memoryStorage() });


router.get('/show/emlpoyee/',checkUserJWT, checkPermissionUser,  PersonnelController.getEmployeeWithPagination);
router.post('/create/personal/', uploadImg.single('image') ,checkUserJWT, checkPermissionUser, PersonnelController.createPersonal);
router.put('/edit/personal/:personalId', uploadImg.single('image') ,checkUserJWT, checkPermissionUser, PersonnelController.editPersonal);
router.delete('/delete/personal/:personalId', uploadImg.single('image') ,checkUserJWT, checkPermissionUser, PersonnelController.deletePersonal);

// Position API 
router.get('/show/position', checkUserJWT, PersonnelController.getPosition)

module.exports = router;