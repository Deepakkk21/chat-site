
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    username: String,
    message : String,
    timeStamp: Date
})

 const Chatmodel= mongoose.model("Chat",chatSchema);

 module.exports = {Chatmodel};
