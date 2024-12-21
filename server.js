const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const cron = require('node-cron')
const app = express()
require('dotenv').config();

//Controllers
const indexController = require('./controllers/indexController')
const storeDataController = require('./controllers/storeDataController')

//Mongodb Connection

mongoose.connect(process.env.MONGODB_URI_CONNECTION_STRING, { useNewUrlParser: true })
//mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


// view engine setup
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
/*
app.get('/', (req,res) => {
    res.sendFile(__dirname+ '/views', '/index.html')})

*/
app.get('/', indexController);
app.post('/', storeDataController)




app.listen(8080,() => {

    console.log('server is running')
})
