const express = require('express');
const router = express.Router();
const LoginController = require('../app/controllers/LoginController')
const {checkUserJWT, checkPermissionUser} = require("../middleware/verifyJWT")

router.post('/login', LoginController.handlerLogin);
router.get('/position', LoginController.getPosition);
router.get('/testmdw',checkUserJWT, checkPermissionUser,  LoginController.testMDW);

module.exports = router;