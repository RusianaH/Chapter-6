const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const router = require('./route/user.route')

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
// const Joi = require('joi');
// const morgan = require('morgan');

const port = process.env.PORT || 3000

app.use('/images', express.static('public/images')),
app.use('/videos', express.static('public/videos')),
app.use('/files', express.static('public/files')),
app.use('/qrcode',express.static('public/qrcode') )



app.use('/', router)

app.listen(port, () => {
    console.log("running in port:" + port)
});