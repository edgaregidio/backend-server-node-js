import 'dotenv/config'
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('../routes/personRoutes')

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use(router)

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apicluster.svckz.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
.then(() => {
  app.listen(5000, () => {
    console.log('The server is running!')
  })
})
.catch((err) => console.log(err))