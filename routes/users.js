const express =require('express');

const { getAllUsers, createUser, deleteUser, getUser, updateUser} = require('../models/users');

const usersRouter = express.Router();

/*GET contact listin. */
usersRouter.get('/', async(req, res, next)=>{
    console.log('user: ', req.user);
    const users = await getAllUsers();
    res.send({message: 'success', users});
});

usersRouter.get('/:id', async (req, res, next)=>{
    const id = parseInt(req.params.id);
    const user = await getUser(id);
    if(user){
    res.send({message: 'success', data: user});
    }else{
        res.send(404).json({message: 'user not found or not exist'})
    }

});

usersRouter.post('/', async (req, res, next)=>{
    console.log(req.body);

    const newUser = req.body;
    const userSaved = await createUser(newUser);

    if(userSaved){
        res.send({
        message:'user created succesfully', data:userSaved
    })
    }else{
        res.status(404).json({messade: 'User was not created'});
    }
    
});

usersRouter.put('/:id', async (req, res, next)=>{
    const userUpdate = req.body;
    const userId = parseInt(req.params.id);

    const userSaved = await updateUser(userId, userUpdate, true);

    console.log({userUpdate});
    console.log({userId}); 

    if(userSaved){
        res.send({
            message: 'user updated successfuly',
            data: userUpdate
        });
    }else{
        res.status(404).json({message: 'user not updated'});
    }
});

usersRouter.delete('/:id', async(req, res, next)=>{
    const id = parseInt(req.params.id);
    console.log(id);

    const userIdDeleted = await deleteUser(id);

    if(userIdDeleted){
        res.send({
            message: 'user deleted successfuly',
            data: {
                id: userIdDeleted}
        });
    }else{
        res.status(404).json({message: 'user delet wrong'});
    }
});

module.exports = usersRouter;