const mongoose = require("mongoose");

const connect =async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/chattttt",{
        useNewUrlParser : true,
        useUnifiedTopology: true
    });

    console.log("mongodb Connected")
}

module.exports = {connect};
