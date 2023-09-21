const express = require('express');
const router = express.Router();
const { fundform,foodfun,clothfun,ofun } = require('../controllers/funds');

router.post("/form",fundform);
router.get("/fun",foodfun);
router.get("/fun1",clothfun);
router.get("/fun2",ofun);
module.exports = router;