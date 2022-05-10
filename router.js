const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const User = require('./database/model')
const controller = require('./controller/controller')
const path = require('path')

const router = express.Router()

router.get('/',auth,(req,res)=>{
    // const data = await User.find({email:req.user.email})
    res.status(200).json({message:"ok"})
})

// api for register require email and password!!
router.post('/api/register',controller.register);

// api for login require email and password!!
router.post('/api/login',controller.login);

// api for logout
router.get('/api/logout',controller.logout);

// api for add movies and there ratings. 
router.post('/api/movieadd',auth,controller.add);

// api for search movie rating require movie nmae.
router.post('/api/search',auth,controller.search)

module.exports = router;