const express= require('express')
const router = express.Router()
const usercontroller= require('../controllers/usercontroller')
const verifyToken = require('../middleware/verifytoken')

router.post('/signup',usercontroller.signup)
router.post('/login',usercontroller.login)
router.get('/user',verifyToken,usercontroller.getUser)



module.exports=router