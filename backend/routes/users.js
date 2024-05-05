const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// UPDATE USER
router.put("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
       if(req.body.password){
           try{
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);

           }catch(err){
               return res.status(500).json(err)
           }
       } 
        //  $set: {
        //    <field>: <value>,
        //    <field>: <value>, 
        //  }    
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });
            res.status(200).json("Account Updated")
        } catch(err){
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).json("Can update your ac only")
    }
})



// DELETE USER
router.delete("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){  
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account  Deleted")
        } catch(err){
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).json("Can delete your ac only")
    }
})




// GET A USER
router.get("/", async(req,res)=>{
    const username = req.query.username;
    const userId = req.query.userId;
    try{
        const user = userId 
        ? await User.findById(userId)
        : await User.findOne({username: username});
        const {password,updatedAt,...other} = user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err)
    }
})

//  get friends
router.get("/friends/:userId" , async(req,res)=>{
    try{
        const user = await User.findById(req.params.userId);
         const friends = await Promise.all(
             user.followings.map(friendId =>{
                 return User.findById(friendId)
             })
         )
         let friendList = [];
         friends.map(friend=>{
             const {_id, username,profilePicture} = friend;
             friendList.push({_id, username,profilePicture})
         })
         res.status(200).json(friendList)
    }catch(err){
        res.status(500).json(err)
    }
})



// FOLLOW A USER
router.put("/:id/follow", async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const CurrentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push: {followers: req.body.userId}});
                await CurrentUser.updateOne({ $push: {followings: req.params.id}})
                res.status(200).json("user followed")
            } else{
                res.status(403).json("you follow this user")
            }
        }catch(err){
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you cant follow yourself")
    }
    
})



// UNFOLLOW A USER
router.put("/:id/unfollow", async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const CurrentUser = await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({ $pull: {followers: req.body.userId}});
                await CurrentUser.updateOne({ $pull: {following: req.params.id}})
                res.status(200).json("user unfollowed")
            } else{
                res.status(403).json("you dont follow this user")
            }
        }catch(err){
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you cant unfollow yourself")
    }
    
})



module.exports = router