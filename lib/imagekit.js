const ImageKit = require('imagekit')

const {
    IMAGEKIT_PUB_KEY,
    IMAGEKIT_PRIV_KEY,
    IMAGEKIT_URL
} = process.env;

module.exports = new ImageKit ({
    publicKey : IMAGEKIT_PUB_KEY,
    privateKey : IMAGEKIT_PRIV_KEY,
    urlEndpoint : IMAGEKIT_URL,

})