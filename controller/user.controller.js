const qr = require('node-qr-image')
// const ImageKit = require('imagekit');
const imagekit = require('../lib/imagekit');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const fs = require('fs').promises;

function storageImage(req, res) {
    const imageUrl = `${req.protocol}: // ${req.get('host')}/images/${req.file.filename}`;

        res.status(200).json ({
            status : true,
            message : 'success',
            data : {
                image_url : imageUrl
            }
        })
        return
}

function StorageVideo(req, res) {
    const videoUrl = `${req.protocol}: // ${req.get('host')}/videos/${req.file.filename}`;
    
    res.status(200).json ({
        status : true,
        message : 'success',
        data : {
            video_url : videoUrl
        }
    })
    return
}

 function storageFile(req, res) {
    const fileUrl = `${req.protocol}: // ${req.get('host')}/files/${req.file.filename}`;

    res.status(200).json ({
        status : true,
        message : 'success',
        data : {
            file_url : fileUrl
        }
    }); 
    return
}

 function GenerateQR(req, res)  {
        
        const message = req.query.message
        try {
            var pngString = qr.image(message, { type: 'png' });
            pngString.pipe(require('fs').createWriteStream(`${message.toLowerCase()}.png`));
    
            // const pngString = qr.imageSync(message, { type: 'png' });
            res.status(200).json({
                message: 'QR code generated successfully',
                status: 'success',
                error: null
            })
    
        } catch (error) {
            res.status(500).json({
                data: null,
                message: 'internal server error',
                status: 500,
                error: error.message
            })
        }}

function storageImages(req, res){
    // const imageUrl = `${req.protocol}: // ${req.get('host')}/images/${req.file.filename}`;
     let respArray = []

     for (let index =0; index < req.files.length; index++){
            const element = req.files[index]
            const imageUrl = `${req.protocol}: // ${req.get('host')}/images/${
                element.filename}`; 
        //    console.log(imageUrl) 
        respArray.push(imageUrl)
     }
     res.status(200).json ({
            status : true,
            message : 'success',
            data : {
                image_url : respArray
            }
        })
        return
}

async function imagekitUpload(req, res) {
   try{
        // const stringFile = req.file.buffer.toString('base64')
        
        // const uploadFile = await imagekit.upload({
        //     fileName : req.file.originalname,
        //     file: stringFile
        // })
        const {  title , description} = req.body; 
        const imageUrl = req.file.buffer.toString('base64');

        const newImage = await prisma.imageKit.create({
            data: {
              title,
              description,
              imageUrl,
            }
          });


        return res.json ({
            status : true,
            message : 'success',
            data: {
                id: newImage.id,
                title: newImage.title,
                description : newImage.description,
                imageUrl: newImage.imageUrl
            }
        })
   }catch(err){
       res.status(500).json({
           data : null,
           message : 'internal server error',
           status: 500,
           error : err.message
       })
   } finally {
       await prisma.$disconnect();
   }
}

async function getAllImages(req, res) {
    try {
        const images = await prisma.imageKit.findMany();
        res.json({
            status: true,
            data: images,
        });
    } catch (err) {
        res.status(500).json({
            data: null,
            message: 'internal server error',
            status: 500,
            error: err.message,
        });
    }
}

async function getImageById(req, res) {
    try {
        const { id } = req.params;
        const image = await prisma.imageKit.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!image) {
            return res.status(404).json({
                status: false,
                message: 'Image not found',
            });
        }

        res.json({
            status: true,
            data: image,
        });
    } catch (err) {
        res.status(500).json({
            data: null,
            message: 'internal server error',
            status: 500,
            error: err.message,
        });
    }
}

async function updateImageById(req, res) {
    try {
        const { id } = req.params;
        const { title, description, imageUrl } = req.body;

        const updatedImage = await prisma.imageKit.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                description,
                imageUrl,
              }
        });

        res.json({
            status: true,
            data: updatedImage,
        });
    } catch (err) {
        res.status(500).json({
            data: null,
            message: 'internal server error',
            status: 500,
            error: err.message,
        });
    }
}

async function deleteImageById(req, res) {
    try {
        const { id } = req.params;

        const deletedImage = await prisma.imageKit.delete({
            where: {
                id: parseInt(id),
            },
        });

        res.json({
            status: true,
            data: deletedImage,
        });
    } catch (err) {
        res.status(500).json({
            data: null,
            message: 'internal server error',
            status: 500,
            error: err.message,
        });
    }
}










 module.exports = {
     storageImage,
     storageFile,
     StorageVideo,
     GenerateQR,
     storageImages,
     imagekitUpload,
     getAllImages,
     getImageById,
     updateImageById,
     deleteImageById
 }
