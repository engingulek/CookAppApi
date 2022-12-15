const express = require('express');
const Cook = require('../models/Cook');
const Likes = require('../models/Likes');
const router = express.Router();

router.get("/cooks",(req,res)=>{
    Cook.find()
    .then(cooks=>{
        res.json({
            list:cooks,
            success:1
        })
    }).catch(err=>{
        res.json(EvalError)
    })
})


router.post("/likes",(req,res)=>{
    var cookIdList = []
    var cookList = []
    Likes.find()
    .then((likes)=>{
        likes.forEach((e) =>{
            var s = {
                "_id" : e._id,
                "cookId" : e.cookId,
                
            }
            cookIdList.push(s)
        } )

        var list = []
        var s = {}
        Cook.find()
        .then((cook =>{
            cookIdList.forEach((e)=>{
               var v = cook.filter(m => m._id == e.cookId)
               cookList.push(v[0])
                s = {
                "_id" : e._id,
                "cook" : v[0]

               }
               list.push(s)
            })
            

          
            res.json({
                list:list,
                success: 1
            })
        })).catch((error)=>{
    
        })




    }).catch((error)=>{
    
    })

    



    
   /* cookIdList.forEach((id)=>{
        console.log(id)
    })*/
   
})


router.post("/addCook",(req,res)=>{
    const newCook = new Cook({
        userId : req.body.userId,
        imageURL : req.body.imageURL,
        name : req.body.name,
        category : req.body.category,
        detail : req.body.detail,
        rating : req.body.rating,
        minute : req.body.minute,
        date : req.body.date,
        ingredients : req.body.ingredients
    })
    newCook.save()
    res.json({
        success:1,
        message:"success"
    })
})


router.post("/addLike",(req,res)=>{
    Likes.find()
    .then(cooks=>{
        if(cooks.filter(e => e.cookId === req.body.cookId && e.userId === req.body.userId).length > 0){
            console.log("Bulunmaktadır")
            res.json({
                success:0,
                message:"fail"
            })
        }else{
            const newCook = new Likes({
                cookId : req.body.cookId,
                userId : req.body.userId,
            })

            Cook.findById(req.body.cookId)
            .then((cook)=>{
                Cook.findByIdAndUpdate(
                    req.body.cookId,
                    {$set: {'rating': cook.rating + 1}}, 
                    {new: true},
                    function(err,user){
                        if(err){
                        } else{
                            
                        }
                    });
            })
            newCook.save()
            res.json({
                success:1,
                message:"success"
            })
        }

    }).catch((error)=>{
        console.log(error)
    })
})


router.post("/deleteData",(req,res)=>{
    console.log(req.body.deleteId)
   Cook.findByIdAndDelete(req.body.deleteId)
    .then((cooks)=>{
        res.json({
            message:"success",
            success:1
        });
    }).catch(err =>{
        res.json(err)
    })  
})
module.exports = router





 /*var a = {
                "_id" : like._id,
                "userId" : like.userId,
                "cook" : cook
            }*/