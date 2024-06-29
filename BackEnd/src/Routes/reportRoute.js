const express = require('express');
const router = express.Router();
const {checkUserJWT, checkPermissionUser} = require("../middleware/verifyJWT");
const ReportController = require("../app/controllers/ReportController");

// API Purchase Order 
router.get("/show/report/", checkUserJWT, checkPermissionUser, ReportController.getSaleAllBranches)

module.exports = router;