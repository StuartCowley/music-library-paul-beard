const express = require('express');
const router = express.Router();

const albumController = require('../controllers/album');

router.get ('/', albumController.readAlbum);
router.get ('/:albumId', albumController.readAlbumById);
router.post ('/:artistId', albumController.createAlbum);
router.patch ('/:albumId', albumController.patchAlbumById);
router.delete ('/:albumId', albumController.deleteAlbumById);

module.exports = router;