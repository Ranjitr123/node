const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// Define routes and link them to the controller methods
router.post('/persons', staffController.createStaff);
router.get('/persons', staffController.getAllStaff);
router.get('/persons/:id', staffController.getStaffById);
router.delete('/persons/:id', staffController.deleteStaffById);

module.exports = router;
