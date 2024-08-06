const express = require('express');
const router = express.Router();
const multer=require('multer');
const {dregister, oregister } = require('../controllers/registrations');
const upload= multer({storage:multer.memoryStorage()});

router.post("/dr",dregister);
router.post("/Or",upload.fields([
    { name:'Certificate',maxCount:1},
    { name:'vat',maxCount:1}
]) ,oregister);
module.exports = router;