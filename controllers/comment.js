const User = require('../models/userModels');
const { findById } = require('../models/userModels');
const { name } = require('ejs');
const blog = require('../models/blogmodel');
const TPost = require('../models/textpost')
const comment = require('../models/commentModel');
const { post } = require('../routes/uswrRoute');


const commentblog = async (req, res) => {
  try {
    // mydeletepost ke jayesa isse banana hai
    const id = req.params.id;
    const userDatas = await blog.findById({ _id: id })
    if (userDatas) {
      const commentdata = new comment({
        content: req.body.content,
        userid: req.session.user._id,
        username: req.session.user.name,
        userimage: req.session.user.image,

        blogid: userDatas.id

      })

      const userdatas = await commentdata.save();
      // const commented = await comment.find({})
console.log("ok")
        const commented = await comment.find({})
         const usersiddata = await User.findById({_id: userDatas.userid})

        // if(post.length > 0){
        //   for(let i = 0; i < post.length; i++){
             
        //   }
        // }


        res.status(200).send({ user: userDatas, admin: usersiddata, userco: commented,post: userDatas,usercu: req.session.user._id })
      //  res.render('blogviews', {user: userDatas,userco: commented,post: userDatas})
    } else {
      res.status(200).send({ user: "not done"})

    }


  }
  catch (error) {
    console.log(error.message)

  }
}
const commenttextpost = async (req, res) => {
  console.log("first")
  try {
    // mydeletepost ke jayesa isse banana hai
    const id = req.params.id;
    const userDatas = await TPost.findById({ _id: id })
    if (userDatas) {
      const commentdata = new comment({
        content: req.body.content,
        userid: req.session.user._id,
        username: req.session.user.name,
        userimage: req.session.user.image,

        blogid: userDatas.id

      })

      const userdatas = await commentdata.save();
      // const commented = await comment.find({})
console.log("ok")
        const commented = await comment.find({})
         const usersiddata = await User.findById({_id: userDatas.userid})

        // if(post.length > 0){
        //   for(let i = 0; i < post.length; i++){
             
        //   }
        // }


        res.status(200).send({ user: userDatas, admin: usersiddata, userco: commented,post: userDatas,usercu: req.session.user._id })
      //  res.render('blogviews', {user: userDatas,userco: commented,post: userDatas})
    } else {
      res.status(200).send({ user: "not done"})

    }


  }
  catch (error) {
    console.log(error.message)

  }
}

const commentblogload = async (req, res) => {
  try {
    // mydeletepost ke jayesa isse banana hai
    const id = req.params.id;
    const userDatas = await comment.find({ blogid: id })
    if (userDatas) {
        res.status(200).send({ usercomment: userDatas})
      //  res.render('blogviews', {user: userDatas,userco: commented,post: userDatas})
    } else {
      res.status(200).send({ usercomment: "not work"})

    }


  }
  catch (error) {
    console.log(error.message)

  }
}


module.exports = {
  commentblog,
  commenttextpost,
  commentblogload
}
