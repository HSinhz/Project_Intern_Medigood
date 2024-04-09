const express = require('express');
const router = express.Router();
const PersonnelController = require('../app/controllers/PersonnelController')
const {checkUserJWT, checkPermissionUser} = require("../middleware/verifyJWT")


router.get('/show/emlpoyee',checkUserJWT, checkPermissionUser,  PersonnelController.getEmployeeWithPagination);

// Position API 
router.get('/show/position', checkUserJWT, PersonnelController.getPosition)

module.exports = router;