const mongoose = require('mongoose');
const express = require('express')
const multer  = require('multer')
var cors = require('cors')
var bodyParser = require('body-parser');
const route = require('./src/routes/api');
const rateLimit = require('express-rate-limit')
const app= express()

app.use(rateLimit({windowMs:15*60*1000,max:100,
}))
app.use(bodyParser.json())
app.use(cors())


const url =`mongodb+srv://practice:<password>@cluster0.j7uymnz.mongodb.net/ToDoTasker?retryWrites=true&w=majority`
const options = {user:"practice", pass:"practice"}
mongoose.connect(url,options)
.then(()=>{
    console.log("DB connected")
})
.catch((err)=>{
    console.log(err)
})

app.use("/api/v1", route)
app.use("*",(req,res)=>{
    res.status(404).json({message:"not found"})
})


module.exports = app