const express = require('express');
const router = express.Router();
const {dregister, oregister } = require('../controllers/registrations');

router.post("/dr",dregister);
router.post("/Or",oregister);
module.exports = router;