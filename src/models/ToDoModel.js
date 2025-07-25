const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema(
    { 
    title:{type:String},
    description:{type:String}, 
    status:{type:String},
    email:{type:String},
    createdDate:{type:Date,default:Date.now()}
  },
  {versionKey:false}
);
const ToDoModel = mongoose.model("todos",todoSchema)
module.exports = ToDoModel;