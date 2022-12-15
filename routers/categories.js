const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

router.get("/categories",(req,res)=>{
    Category.find()
    .then(categories => {
        res.json({
            list:categories,
            success:1
        })
        
    }).catch(err=>{
        res.json(err)
    })
})

router.post("/addCategory",(req,res)=>{
    const newCategory = new Category({
        categoryName : req.body.categoryName
    })
    newCategory.save()
    res.json({
        success:1,
        message:"success"
    })
})

module.exports = router