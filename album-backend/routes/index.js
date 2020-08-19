const express = require('express');
const router = express.Router();

const { imageController } = require('../controllers')
const upload = require('../services')

router.get('/health', imageController.checkHealth)
router.post('/photos/list', imageController.photosList)


router.put('/photos', upload.array('documents'), imageController.photosUpload)

router.delete('/photos/:album/:fileName', imageController.photoDelete)
router.delete('/photos', imageController.photoDeletes)

module.exports = router