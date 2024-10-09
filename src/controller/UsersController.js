const otpModel = require("../models/OtpModel");
const UsersModel = require("../models/UsersModel");
const jwt = require('jsonwebtoken');
const SendEmailUtility = require("../utility/SendEmailUtility");
// registration start
exports.Registration = async(req,res)=>{
    try{
        const reqBody = req.body;
        const user = await UsersModel.create(reqBody);
        res.status(200).json({status:"success",data:user})
    }
    catch(error){
        res.status(200).json({status:"fail",data:error.message})
    }
}
// registration end

// login start
exports.Login= async (req,res)=>{
    try{
        const reqBody = req.body;
        let user = await UsersModel.findOne({email:reqBody.email});
        if(!user){
            return res.status(200).json({status: "fail", message: "user not found"})
        }
        if(user.password !== reqBody.password){
            return res.status(200).json({status: "fail", message: "invalid password"})
        }
        else{
            let payload ={
                exp:Math.floor(Date.now()/1000)+(60*60), //1hour
                data:user['email']
            }
            let token= jwt.sign(payload,'suhu123');

            // projection
            const reponseData = {email: user['email'], firstName: user['firstName'], lastName: user['lastName'], photo: user['profilePicture']};

            res.status(200).json({status:"success", data:reponseData,token:token});
        }
    }
    catch(error){
        res.status(200).json({status:"fail", data: "error.message"});
    }
}
// login end

// profile details start
exports.ProfileDetails = async (req,res)=>{
    try{
        let email = req.headers.email; 
        let query = {email:email};
        const user = await UsersModel.findOne(query);
        res.status(200).json({status:"success",data:user})
    }
    catch(error){
        res.status(200).json({status:"fail", data:"error.message"})
    }
} 
// profile details end 

// profile update start
exports.UpdateProfile = async (req,res)=>{
    try{
        let email = req.headers.email;
        let reqBody = req.body;
        let query = {email:email};
        const user = await UsersModel.updateOne(query,reqBody);
        res.status(200).json({status:"success",data:user})
    }
    catch(error){
        res.status(200).json({status:"fail", data:"error.message"})
    }
}
// profile update end

// email verify start 
exports.EmailMailVerify = async(req,res)=>{
    try{
    let email = req.params.email;
    let query = {email:email};
    let otp = Math.floor(100000 + Math.random() * 900000); // generate 6 digit random number
    const user = await UsersModel.findOne(query);

    if(!user){
        return res.status(200).json({status: "fail", message: "user not found"});
    }
    else{
        //step -1
        let creatOtp = await otpModel.create({email:email, otp:otp})
        //setp-2
        let sendEmail = SendEmailUtility(email,"To-Do-Tasker password Verification", `Your OTP is ${otp}`);
        res.status(200).json({status: "success", message: "OTP send successfully"});
    }
    }
    catch(error){
      res.status(200).json({status: "fail", data: error.message});
    }
}
// email verify end

// otp verify start
exports.OtpVerify = async(req,res)=>{
    try{
        let email = req.params.email
        let otp = req.params.otp;
        let status = 0
        let updateStatus = 1
        let otpCheck = await otpModel.aggregate([
            {$match : {email:email, otp:otp}},
            {$count: "total"}
        ])
        if(otpCheck.length>0){
            let updateOtp = await otpModel.updateOne({email:email, otp:otp,status:status},{email:email, otp:otp, status:updateStatus})
            res.status(200).json({status: "success", data: "OTP verified successfully"});

        }
        else{res.status(200).json({status: "fail", data:"Invalid OTP"});

        }
    }
    catch(error){
        res.status(200).json({status: "fail", data: error.message});
    }
}
// otp verify end

// reset password start
exports.ResetPassword = async(req,res)=>{
    try{
        let email = req.body.email
        let otp = req.body.otp; 
        let updatePassword = req.body.password
        let updateStatus = 1
        let otpCheck = await otpModel.aggregate([
            {$match : {email:email, otp:otp,status:updateStatus}}, 
            {$count: "total"}
        ])
        if(otpCheck.length>0){
            let passwordUpdate = await UsersModel.updateOne({email : email},{ password : updatePassword})
            res.status(200).json({status: "success", data: passwordUpdate});

        }
        else{res.status(200).json({status: "fail", data:"Invalid OTP"});

        }
    }
    catch(error){
        res.status(200).json({status: "fail", data: error.message});
    }
} 
// reset password end