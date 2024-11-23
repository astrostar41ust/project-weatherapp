//////dadadadadad


const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const expressSession = require('express-session')



//Controllers
const indexController = require('./controllers/indexController')
const storeDataController = require('./controllers/storeDataController')

//Mongodb Connection
/*
mongoose.connect('mongodb+srv://admin:212546@cluster0.gexcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {useNewUrlParser : true}
)
*/
mongoose.connect("mongodb://localhost:27017/cpe-project")

app.use(express.static('public'))
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

app.use(expressSession({
    
    resave: true,
    saveUninitialized: true,
    secret: "node secret"
}))
    
app.set('view engine', 'ejs')




app.get('/', indexController)
app.post('/result', storeDataController)




//Backup

const { spawn } = require('child_process')
const path = require('path')
const cron = require('node-cron')

const DB_NAME = "cpe-project"
const ARCHIVE_PATH = path.join(__dirname,'backup',`${DB_NAME}.gzip`)
cron.schedule('*/1 * * * *',() => backupMongoDB())

function backupMongoDB() {
    
    const child = spawn('mongodump', [
        `--db=${DB_NAME}`,
        `--archive=${ARCHIVE_PATH}`,
        '--gzip'
    ])


    child.stdout.on('data',(data) => {
        console.log('stdout:\n', data)
    })
    child.stderr.on('data',(data) => {
        console.log('stderr:\n', Buffer.from(data).toString())
    })
    child.on('error', (error) => {
        console.log('error:\n', error)
    })
    child.on('exit', (code, signal) => {
        if (code) console.log('Process exit with code:', code)
        else if (signal) console.log ('Process killed with signal:', signal)
        else console.log('Backup is successful')
    })
}


//Restore
//use 'restoreMongoDB()' to restore

//restoreMongoDB()

function restoreMongoDB() {
    
    const child = spawn('mongorestore', [
        `--db=${DB_NAME}`,
        `--archive=${ARCHIVE_PATH}`,
        '--gzip'
    ])


    child.stdout.on('data',(data) => {
        console.log('stdout:\n', data)
    })
    child.stderr.on('data',(data) => {
        console.log('stderr:\n', Buffer.from(data).toString())
    })
    child.on('error', (error) => {
        console.log('error:\n', error)
    })
    child.on('exit', (code, signal) => {
        if (code) console.log('Process exit with code:', code)
        else if (signal) console.log ('Process killed with signal:', signal)
        else console.log('Restoring process is successful')
    })
}



app.listen(3500,() => {

    console.log('server is running')
})