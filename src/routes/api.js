const express = require('express')
const router = express.Router()
const UsersController = require("../controller/UsersController")
const AuthVerifyMiddleWare = require('../middleware/AuthVerifyMiddleWare')
const ToDoController = require("../controller/ToDoController")

// user api routes start
router.post('/registration',UsersController.Registration)
router.get('/login',UsersController.Login) 
router.get('/user-profile-details', AuthVerifyMiddleWare, UsersController.ProfileDetails)
router.post('/user-profile-update', AuthVerifyMiddleWare, UsersController.UpdateProfile)

router.get('/email-verify/:email', UsersController.EmailMailVerify)
router.get('/otp-verify/:email/:otp', UsersController.OtpVerify)
router.post('/reset-password', UsersController.ResetPassword)
// user api routes end

// todo api routes start
router.post('/create-todo', AuthVerifyMiddleWare, ToDoController.CreateToDo)
router.get('/todo-update-status/:id/:status', AuthVerifyMiddleWare, ToDoController.UpdateTodosStatus)
router.get('/todo-delete-status/:id', AuthVerifyMiddleWare, ToDoController.DeleteTodosStatus)
router.get('/todo-list-by-status/:status', AuthVerifyMiddleWare, ToDoController.ToDoListByStatus)
router.get('/todo-count-by-status', AuthVerifyMiddleWare, ToDoController.ToDoCountByStatus)
// todo api routes end

module.exports= router