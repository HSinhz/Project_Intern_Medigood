const express = require('express');
const router = express.Router();
const {checkUserJWT, checkPermissionUser} = require("../middleware/verifyJWT")
const BranchController = require('../app/controllers/BranchController')

router.get('/show/branch', checkUserJWT, BranchController.getBranch)
router.get('/show/branch/id/', checkUserJWT, BranchController.getBranchWithId)


module.exports = router;