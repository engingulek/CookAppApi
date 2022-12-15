const mongoose = require('mongoose')
const Category = require('./Category')
const CookSchema = new mongoose.Schema ({
    userId :{type:String,required:true},
    imageURL: {type:String,required:true},
    name: {type:String,required:true},
    category: {type:Object,required:true},
    detail: {type:Array,required:true},
    rating: {type:Number,required:true},
    minute: {type:Number,required:true},
    date : {type:Date,required:true},
    ingredients : {type:Array,required:true}
})

module.exports = mongoose.model("Cook",CookSchema)
