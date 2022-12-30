const express = require('express');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');
const { getUser, createUser } = require('../models/users');


const authRouter = express.Router();

authRouter.post('/login', async(req, res, next)=>{
    const user = await getUser(req.body.mail, req.body.password);
    if(user){
        const token = jwt.sign (user, SECRET);
        return res.send({message:'login success and token', token});
    }else{
        return res.status(403).send({message:'user or password incorrect'});
    }
});

authRouter.post('/sign-up', async (req, res, nex)=>{
  console.log(req.body);
  const newUser = req.body;
  const userSaved = await createUser(newUser);
  if(userSaved){
    res.send({message: 'sign up success', data: userSaved});
  }else{
    res.status(404).json({message: 'sign up wrong'});
  }
})

module.exports = authRouter;