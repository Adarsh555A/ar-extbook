const express = require('express');
const user_route = express();
const bodyparser = require('body-parser')
const session = require('express-session');
const {SESSION_SECRET} = require('../key')
const User = require('../models/userModels')
user_route.use(bodyparser.json())
user_route.use(bodyparser.urlencoded({extended: true}))
user_route.use(session({ secret: SESSION_SECRET}))

// user_route.set('view engine' , 'ejs')
// user_route.set('views' , './views')

user_route.use(express.static('public'));

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: function(req, file, cb){
        const name = Date.now() + '-' + file.originalname;
        cb(null, name)
    }
})

const upload  = multer({ storage: storage});

const userControl = require('../controllers/userControl')
const blogpost = require('../controllers/blogpost')
const comment = require('../controllers/comment')


const auth = require('../middleware/auth');

// agar koi resgister url par hit kata hai toh page pe jane se pehle humara middleware yaani auth check karega ki user koi login logout kiya hai ki nahi 
user_route.get('/resgister', userControl.registerload)
user_route.post('/resgister', userControl.register)
// agar koi / url par hit kata hai toh page pe jane se pehle humara middleware yaani auth check karega ki user koi login logout kiya hai ki nahi 
user_route.get('/login', userControl.loadLogin);
user_route.post('/login', userControl.login);
// agar koi logout url par hit kata hai toh page pe jane se pehle humara middleware yaani auth check karega ki user koi logout login kiya hai ki nahi 
user_route.get('/logout', userControl.logout);
// agar koi dashboard url par hit kata hai toh page pe jane se pehle humara middleware yaani auth check karega ki user koi login kiya hai ki nahi 
user_route.get('/dashboard', userControl.loaddashboard);
// user_route.get('*', function (req, res) {
//     res.redirect('/')
// });
user_route.get('/edit', userControl.loadedit)
user_route.post('/edit', userControl.editprofile)
user_route.get('/verify/:id', userControl.verifymail)
user_route.get('/forget', userControl.forgetload)
user_route.post('/forget', userControl.forgetVerify)
user_route.get('/forget-password/:token', userControl.forgetPasswordload)
user_route.post('/forget-password/:token', userControl.forgetPassword)
user_route.get('/verification', userControl.verificationload)
user_route.post('/verification', userControl.verification)
//blog
user_route.get('/uploadblog', blogpost.uploadblogload)
user_route.post('/uploadblog',  blogpost.uploadblog)
user_route.get('/blogs', blogpost.blogsload)
user_route.get('/myblogs',  blogpost.myblogsload)
user_route.get('/editblog/:id',  blogpost.editblogload)
user_route.post('/editblog/:id', blogpost.editblog)
user_route.get('/mydeleteblogs/:id', blogpost.mydeleteblogs)
user_route.get('/like/:id', blogpost.likeblog)
user_route.get('/unlike/:id', blogpost.unlikeblog)
user_route.get('/reward', blogpost.rewardload)
user_route.get('/blogview/:id', blogpost.blogview)
user_route.get('/searchblogs', blogpost.searchblogs)
user_route.get('/searchusers', userControl.searchusers)


user_route.get('/usersviews', userControl.userviewsload)
user_route.get('/profile/:id', userControl.profileload)

//Text post
user_route.get('/textposts', blogpost.textpostload)
user_route.get('/uploadtpost',  blogpost.uploadtextpostload)
user_route.post('/uploadtpost',  blogpost.uploadtpost)
user_route.get('/mytextpost',  blogpost.mytextpostload)
user_route.get('/mytextpostdelete/:id',  blogpost.mydeletetextpost)
user_route.get('/likeTpost/:id', blogpost.liketextpost)
user_route.get('/unlikeTpost/:id', blogpost.unliketextpost)
user_route.get('/textpostview/:id', blogpost.textpostview)


//comment
user_route.post('/comment/:id', comment.commentblog)
user_route.get('/comment/:id', comment.commentblogload)
user_route.post('/commenttext/:id', comment.commenttextpost)

//follow
user_route.post('/follow', userControl.followpush)
user_route.post('/unfollow', userControl.followpull)
user_route.get('/followingposts', userControl.followingposts)

// user_route.post('/searchuser', userControl.followpush)

user_route.get('/following/:id',userControl.following)
user_route.get('/followers/:id',userControl.follower)
// chat
user_route.get('/savechat/:id', userControl.Savechatload)
user_route.get('/deletechat/:id', userControl.deletechatload)

user_route.post('/savechat/:id', userControl.Savechat)
// user_route.patch('/update/:name', async (req, res) => {
// //     const user = await User.find(req.params.name) 
// //  console.log(user)
//     let get = "Gupta";
//     const userupdate = await User.updateOne( { "name" : "Adarsh" }, [ { $set: { "password": get, modified: "$$NOW"} } ] )
//     // await user.save();

//     res.json({ status: "pending" });    

// })

module.exports = user_route;