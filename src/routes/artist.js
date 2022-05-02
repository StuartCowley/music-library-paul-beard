const express = require('express');
const router = express.Router();

const artistController = require('../controllers/artist');

router.get ('/', artistController.readArtist);

router.post ('/', artistController.createArtist);




module.exports = router;