const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config()
require ('./config/db.js');
const cors = require('cors');
const editJsonFile    = require('edit-json-file');
const fileUpload = require('express-fileupload');




const userRoutes = require('./routes/userRoutes');
const path = require('path');
const { TextDecoder } = require('util');

let TextDecoderFatal = new TextDecoder('utf8', { fatal: true });

const app = express();
const server = require('http').createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());
app.set('view engine', 'ejs');
require('dotenv').config();
app.use(fileUpload());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || ( "0.0.0.0" , 8000) ;

const allowedOrigins = ['http://localhost:5174','https://funtime-payment.vercel.app','https://4funtalk-admin.vercel.app'];

const corsOptions = {
  origin: ['http://localhost:5175/', 'https://funtime-payment.vercel.app','https://4funtalk-admin.vercel.app'], // Allow these local origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

//app.use(cors(corsOptions));

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});
