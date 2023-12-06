const express = require('express');
const router = express.Router();
const infoController = require('../controllers/adminController')

router.post('/info', infoController.createInfo)
router.get('/info', infoController.getInfo)
router.get('/info/:id', infoController.getInfobyId)
router.patch('/info/:id', infoController.updateInfo)
router.delete('/info/:id', infoController.deleteInfo)

module.exports = router;