const mongoose = require("mongoose");

const connect =async()=>{
    await mongoose.connect("mongodb+srv://dk135781:TE3y2B6REb8TSL1a@cluster00.4xkmrz5.mongodb.net/?retryWrites=true&w=majority/CHAT_DATA",{
        useNewUrlParser : true,
        useUnifiedTopology: true
    });

    console.log("mongodb Connected")
}

module.exports = {connect};
