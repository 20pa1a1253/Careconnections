const express = require('express');
const router = express.Router();
const { needform, need, foodneed, clothneed, oneed } = require('../controllers/needs');

router.post("/needform",needform);
router.get("/need1",clothneed);
router.get("/need2",foodneed);
router.get("/need3",oneed);
module.exports = router;