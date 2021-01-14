const Posts=require('../posts/posts-model')
const Users=require('../users/users-model')
function logger(req,res,next){
  console.log(`method: ${req.method}`,`URL:${req.url}`,`time:${Date.now()}`)
  
  next()
}
async function validateUserId(req, res, next) {
  try{ const user= await Users.getById(req.params.id)
    if (user){
      req.user=user
      next()
    }
    else{
      res.status(404).json (`User with id ${req.params.id} not found`)
    }
  }
  catch(error){
    console.log(error)
    res.status(500).json('Error in validation')
  }
  // do your magic!
}

async function validateUser(req, res, next) {
   if(Object.keys(req.body).length===0){
     res.status(400).json({message:"missing user data"})
   }
   else if(!req.body.name){
    res.status(400).json({message:"missing required name field"})
   }
   else{next()}
  // do your magic!
}

async function validatePostId(req, res, next) {
  try{const post=await Posts.getById(req.params.id)
   if(post){
     req.post=post
     next()
  }
   else{res.status(404).json (`Post with id ${req.params.id} not found`)}
  }
  catch(error){
    console.log(error)
    res.status(500).json ('Error in validation')
  }
  // do your magic!
}

async function validatePost(req, res, next) {
  if(Object.keys(req.body).length===0){
    res.status(400).json({message:"missing user data"})
  }
  else if(!req.body.text){
   res.status(400).json({message:"missing required text field"})
  }
  else{next()}
 // do your magic!
}
// do not forget to expose these functions to other modules
module.exports={logger, validateUserId, validateUser,validatePost, validatePostId}