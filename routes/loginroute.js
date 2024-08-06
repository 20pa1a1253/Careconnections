const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/login');

router.post('/loginsubmit', login);
router.post('/signupsubmit', signup);

module.exports = router;
