const multer = require('multer')
const path = require('path')

function filename(req, file, callback) {
    const fileName = Date.now() + path.extname(file.originalname)
    callback(null, fileName)
    
}
const generateStorage = (destination) => {
    return multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, destination)
        },
        filename,
    })
    
}

module.exports = {
    image : multer ({

        storage: generateStorage('./public/images'),
        fileFilter: (req, file, callback) => {
        const allowMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        
        if (allowMimeTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            const err = Error(`Only ${allowMimeTypes}.join(', ')}allowed to upload!`);
            callback(err, false);
        }
    },
    onError: (err, next) => {
        next(err);
    }
    
    }),

    video : multer ({

        storage: generateStorage('./public/videos'),
        fileFilter: (req, file, callback) => {
        const allowMimeTypes = ['video/mp4'];
        
        if (allowMimeTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            const err = Error(`Only ${allowMimeTypes}.join(', ')}allowed to upload!`);
            callback(err, false);
        }
    },
    onError: (err, next) => {
        next(err);
    }
    }),

    file : multer ({
        storage: generateStorage('./public/files'),
        fileFilter: (req, file, callback) => {
        const allowMimeTypes = ['application/pdf'];
        
        if (allowMimeTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            const err = Error(`Only ${allowMimeTypes}.join(', ')}allowed to upload!`);
            callback(err, false);
        }
    },
    onError: (err, next) => {
        next(err);
    }
    }),
}