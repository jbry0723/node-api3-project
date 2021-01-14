const express = require('express');
const Posts=require("./posts-model")
const {validatePostId,validatePost}=require('../middleware/middleware')


const router = express.Router();

router.get('/', (req, res, next) => {
  Posts.get()
    .then(posts=>{
      res.status(200).json(posts)
    })
    .catch(next)

});

router.get('/:id', validatePostId,  (req, res, next) => {
  res.status(200).json(req.post)
  // do your magic!
  // this needs a middleware to verify post id
});

router.delete('/:id',validatePostId, (req, res,next) => {
  Posts.remove(req.params.id)
    .then(deleted=>{
      if(deleted===1){
        res.status(200).json({message:"The post was deleted"})
      }
      else{res.status(500).json ({message:"There was an error deleting the post."})}
    })
    .catch(next)
  // do your magic!
  // this needs a middleware to verify post id
});

router.put('/:id', validatePostId,validatePost, (req, res,next) => {
  Posts.update(req.params.id, req.body)
  .then(updated=>{
    if(updated===1){
      res.status(200).json({message:"The post was updated"})
    }
    else{res.status(500).json ({message:"There was an error updating the post."})
  }
})
  .catch(next)
  
  // this needs a middleware to verify post id
});

// do not forget to export the router

router.use((error, req, res, next)=>{
  res.status(500).json({ info: 'There was an error in the router',
message: error.message,
stack: error.stack})
})

module.exports=router