const express = require('express');
const router = express.Router();
const {donor,org } = require('../controllers/profiles');

router.get('/profile/:useremail',donor);
router.get('/P/:email',org);
module.exports = router;