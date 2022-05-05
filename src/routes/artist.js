const express = require('express');
const router = express.Router();

const artistController = require('../controllers/artist');


router.get ('/:artistId', artistController.readArtistById);

router.get ('/', artistController.readArtist);

router.post ('/', artistController.createArtist);

router.patch ('/:artistId', artistController.patchArtistById);




module.exports = router;