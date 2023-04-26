require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const corsOptions=require('./src/config/corsOptions')
const mongoose = require('mongoose')



app.use(express.json)
app.use(cors(corsOptions))



app.listen(3300,()=>console.log('server is runing with port :'+ process.env.PORT))




