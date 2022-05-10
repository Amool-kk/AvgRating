const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const dotenv = require('dotenv')
const cookieparser = require('cookie-parser');

dotenv.config({path: './config.env'})

const controller = require('./controller/controller');
require('./database/connection')

app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./router'))



app.listen(port,()=>{
    console.log(`Connection is done at ${port}`)
})

