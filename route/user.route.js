const router = require('express').Router()
const storage = require('../lib/multer');
const multer = require('multer')
const {
    storageImage, 
    StorageVideo, 
    storageFile, 
    GenerateQR, 
    storageImages, 
    imagekitUpload,
    getAllImages,
    getImageById,
    updateImageById,
    deleteImageById
} = require('../controller/user.controller');


router.post('/image', storage.image.single('image'), storageImage);
router.post('/videos', storage.video.single('videos'), StorageVideo);
router.post('/files', storage.file.single('files'), storageFile);
router.post('/qr-code', GenerateQR);

// upload multiple image
router.post('/images', storage.image.array('images', 3),storageImages )

// imagekit upload
const memoryStorage = multer.memoryStorage();
const multerUpload = multer({ storage: memoryStorage });
router.post('/imagekit', multerUpload.single('image'), imagekitUpload);
router.get('/imagekit', getAllImages);
router.get('/imagekit/:id', getImageById);
router.put('/imagekit/:id', multerUpload.single ('image'), updateImageById);
router.delete('/imagekit/:id', deleteImageById);









module.exports = router;