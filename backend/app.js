const express =require("express");
const cors=require("cors");
const {db} = require("./db/db.js"); 
const {readdirSync} = require("fs");

const app=express();
require('dotenv').config()

const PORT=process.env.PORT

//middleware
app.use(express.json())
app.use(cors())

//routes
readdirSync("./routes").map((route)=>app.use('/api/v1',require(`./routes/${route}`)));



const server=()=>{
    db()// Connect to the database
    app.listen(PORT,()=>{
        console.log(`listen to port:`, PORT)
    })
}

server();