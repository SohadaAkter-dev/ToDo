const ToDoModel = require("../models/ToDoModel")

// create ToDo start
exports.CreateToDo = async (req,res)=>{
    try{
    const reqBody = req.body;
    reqBody.email = req.headers.email;
    const todo = await ToDoModel.create(reqBody);
    res.status(200).json({status:"success",data:todo});
    }
    catch(error){
        res.status(200).json({status:"fail",data:error})
    }
}
// create ToDo end

// update ToDo start
exports.UpdateTodosStatus =async(req,res)=>{
    try{
        let id = req.params.id;
        let status = req.params.status;
        let query ={_id:id};
        const todo = await ToDoModel.updateOne(query,{status:status});
        res.status(200).json({status:"success",data: todo});
    }
    catch(error){
        res.status(200).json({status:"fail",data: error})
    }
}
// update ToDo end

// delete ToDo start
exports.DeleteTodosStatus =async(req,res)=>{
    try{
        let id = req.params.id; 
        let query ={_id:id};
        const todo = await ToDoModel.deleteOne(query);
        res.status(200).json({status:"success",data: todo});
    }
    catch(error){
        res.status(200).json({status:"fail",data: error})
    }
}
// delete ToDo end 

// ToDo list by status start 
exports.ToDoListByStatus = async(req,res)=>{
    try{
    let status = req.params.status;
    let email = req.headers.email;
    const result = await ToDoModel.aggregate([
        {$match:{status:status,email:email}},
        {$project:{_id:1,title:1,description:1,status:1,createdDate:{$dateToString:{format: "%d-%m-%Y",date: "$createdDate"}}}}
    ])
    res.status(200).json({status:"success",data: result});
    }
    catch(error){
        res.status(200).json({status:"fail",data: error})
    }
}
// ToDo list by status end 


// ToDo count by status start 
exports.ToDoCountByStatus = async(req,res)=>{
    try{ 
    let email = req.headers.email;
    const result = await ToDoModel.aggregate([
        {$match:{email:email}},
        {$group:{_id:"$status",total:{$count:{}}}}    
    ])
    res.status(200).json({status:"success",data: result});
    }
    catch(error){
        res.status(200).json({status:"fail",data: error})
    }
}
// ToDo count by status end 