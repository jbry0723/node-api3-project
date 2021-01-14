const express = require('express');
const {validateUserId, validateUser, validatePost}=require('../middleware/middleware')
const Users=require("./users-model")
const Posts=require("../posts/posts-model")
const router = express.Router();



router.post('/',validateUser,(req, res,next) => {
  Users.insert(req.body)
    .then(newUser=>{
      res.status(200).json(`${req.body.name} was successfully added to database`)
    })
    .catch(next)
  
  // this needs a middleware to check that the request body is valid
});

router.get('/', (req, res, next) => {
  Users.get()
    .then(posts=>{
      
      res.status(200).json(posts)
    })
    .catch(next)
    

  
});

router.get('/:id',validateUserId, (req, res) => {
res.status(200).json(req.user)
  
  // this needs a middleware to verify user id
});

router.delete('/:id',validateUserId, (req, res, next) => {
  Users.remove(req.user.id)
    .then(deleted=>{
      if(deleted===1){
        res.status(200).json({message:`The user with the id of ${req.user.id} was deleted`})
      }
      else{res.status(500).json ({message:"There was an error deleting the user."})}
    })
    .catch(next)
  
  // this needs a middleware to verify user id
});

router.put('/:id',validateUserId,validateUser, (req, res, next) => {
  Users.update(req.params.id,req.body)
    .then(updated=>{
      if(updated===1){
        res.status(200).json({message:"The user was successfully updated"})
      }
      else{res.status(500).json ({message:"There was an error updating the user."})}
    })
    .catch(next)

  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.post('/:id/posts',validateUserId,validatePost, (req, res,next) => {
  let postBody=req.body
  postBody.user_id=req.params.id
  Posts.insert(postBody)
    .then(post=>{
      res.status(200).json(post)
    })
    .catch(next)
  
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.get('/:id/posts',validateUserId, (req, res, next) => {
  Users.getUserPosts(req.user.id)
      .then(posts=>{
        res.status(200).json(posts)
      })
      .catch(next)
  // this needs a middleware to verify user id
});


router.use((error, req, res, next)=>{
  res.status(500).json({ info: 'There was an error in the router',
message: error.message,
stack: error.stack})
})

// do not forget to export the router

module.exports=router;