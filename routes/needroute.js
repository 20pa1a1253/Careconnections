const express = require('express');
const router = express.Router();
const { needform, need } = require('../controllers/needs');

router.post("/needform",needform);
router.get("/ned",need)
module.exports = router;