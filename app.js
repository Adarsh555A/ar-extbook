// require('dotenv').config();
// const { PORT } = process.env;
var {Mongo_Url} = require('./key')
var mongoose = require('mongoose');
mongoose.set('strictQuery', true)
const express = require('express');
const path = require('path')
mongoose.connect(Mongo_Url).then( () => console.log("Mongodb is connected!"))
const app= require('express')();
const cors = require("cors")
const http = require('http').Server(app)
let port = process.env.port || 5500;
const User = require('./models/userModels')
const userRoute = require('./routes/uswrRoute');
app.use(cors())
app.use('/',cors(),userRoute)



// send file frontend
app.use(express.static(path.join(__dirname,"./build")))
app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname,"./build/index.html"),
    function(err){
        res.status(500).send(err)
    }
    )
})
// app.get("/login", (req, res) => {
//     res.json({status: "sucess"})
// })
// const server = http.createServer(app)
// const io = new Server(http, {
//     cors:{
//         origin:"http://localhost:3000",
//         methods:["GET","POST"],
//     }
// })
// // var usp = io.of('/user-namespace');

// io.on("connection", (socket) => {
//     console.log("user is connected")
//     // var useridd = socket.handshake.auth.token;
//     // console.log(useridd)
//     // const connected = await User.findByIdAndUpdate({_id: useridd}, {$set: {is_online: '1'}})

//     // socket.on("join_room", (data)=>{
//     //     socket.join(data)
//     //     console.log(data)
//     // })
//     // socket.on('setup', (userData) =>{
//     //     socket.join(userData)
//     //     socket.emit("connected")
//     // })
//     // socket.on('join_user', (room) =>{
//     //     socket.join(room)
//     //     console.log("connected room on " + room)
//     //     io.sockets.in(room).emit('joined', "conected socket");

//     // })
//     socket.on("send_message",(data) =>{
//         // console.log(data.room + " r")
//         io.sockets.emit('receive_message', data);
//         console.log(data)
//         // io.sockets.in(data.room).emit('receive_message', data);

//     })
//     socket.on('disconnect', function(){
//         console.log("user disconnected")
//         // yeh code handsake undar se token ko get karega phir usse userid mil jayega
//       // yeh code mein userid ki help se [is_online] ko 1 se 0 mein update karega.
//         // const disconnected = await User.findByIdAndUpdate({_id: useridd}, {$set: {is_online: '0'}})
//         //boardcast status
//         // socket.broadcast.emit('getOfflineUser',{user_id: userid})

//     })

// })
http.listen(port, function (){
    console.log('server started', port)
})