const express= require('express');
const { connect } = require("./config");
const { Chatmodel } = require('./chat_schema');
const port =8000;
const app = express();


var users ={};


var io = require("socket.io")(8001,{
    cors:{
        origin:"*",
        
    }
});


io.on("connection",function(socket){
    
socket.on("new_user",function(name){
    users[socket.id]=name;

    // console.log(users);
    socket.broadcast.emit("new_user", name +" has joined")
       })

       

       socket.on("new_message",function(message){
        
        // mongodb code

         var userMessage={
            username: users[socket.id],
            message: message
        }
        const newChat = new Chatmodel({
            username:users[socket.id],
            message:message,
            timeStamp:new Date()
        })

        newChat.save();

        socket.broadcast.emit('new_message',userMessage);



        // khtm

        // socket.broadcast.emit("new_message",{name: users[socket.id],message})
       })
});

var io2 = require("socket.io")(8002,{
    cors:{
        origin:"*",
        
    }
})

io2.on("connection",function(socket){
    
    socket.on("new_user",function(name){
        users[socket.id]=name;
        console.log(users);
        socket.broadcast.emit("new_user", name +" has joined")
           })
           socket.on("new_message",function(message){

            var userMessage={
                username: users[socket.id],
                message: message
            }
            const newChat = new Chatmodel({
                username:users[socket.id],
                message:message,
                timeStamp:new Date()
            })
    
            newChat.save();
    
            socket.broadcast.emit('new_message',userMessage);
    
            // socket.broadcast.emit("new_message",{name: users[socket.id],message})
           })
    });

app.listen(port , function(err){
    if(err){
        console.log(err);
        return;

    }else{
        console.log("server is running at 8000")
        connect();   
    }
})