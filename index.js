const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const categoriesRouter = require("./routers/categories")
const cookRouter = require("./routers/cooks")
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://cookApp:C9TIRlaZq4NPNv3b@engingulek.hscve.mongodb.net/cookAppDatabase?retryWrites=true&w=majority")
mongoose.connection.once("open",()=>{
    console.log("Connect to DB!")

}).on("error",(error)=>{
    console.log("Failed to connect" + error)
})

app.use("/",categoriesRouter)
app.use("/",cookRouter)

app.listen(3000,()=> { 
    console.log("Server is running on port 8080")
    })