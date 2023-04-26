require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const corsOptions=require('./src/config/corsOptions')
const mongoose = require('mongoose')
const connectDB=require('./src/config/dbConn')
const path = require('path')
const cookieParser = require('cookie-parser')

connectDB()



app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname,'public')))

app.use('/api/auth',require('./src/routes/authRoutes'))



/*mongoose set up */
const port=process.env.PORT || 5001

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
    app.listen(port,()=>console.log('server is runing with port :'+port))
})

mongoose.connection.on('error',(err)=>console.log(err))






