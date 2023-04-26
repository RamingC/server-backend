const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        await  mongoose.connect(process.env.DATABAsE_URI, { useNewUrlParser: true})
    } catch (err) {
        console.log(err);
    }
}

module.exports=connectDB