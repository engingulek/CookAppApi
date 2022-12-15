const mongoose = require('mongoose')
const LikeCookSchema = new mongoose.Schema ({
    userId :{type:String,required:true},
    cookId :{type:String,required:true},
})

module.exports = mongoose.model("Likes",LikeCookSchema)
