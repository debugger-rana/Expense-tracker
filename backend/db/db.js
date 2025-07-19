const { model } = require("mongoose");

const mongoose=require('mongoose')

const db= async()=>{
    try{
        mongoose.set('strictQuery', false); // Set strictQuery to false
        await mongoose.connect(process.env.MONOGO_URI)
        console.log("DB connected")
    }catch(error){
        console.log("DB connection failed")
    }
}

module.exports={db};