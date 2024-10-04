const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
    email:{type:String, unique:true},
    password:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    profilePicture:{type:String},
    createdDate:{type:Date,default:Date.now()}
  },
  {versionKey:false}
);
const UsersModel = mongoose.model("users",userSchema)
module.exports = UsersModel;