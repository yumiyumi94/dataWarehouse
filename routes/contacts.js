const express =require('express');

const { getAllContacts, createContact, deleteContact, getContact, updateContact } = require('../models/contacts');

const contactsRouter = express.Router();

/*GET contact listin. */
contactsRouter.get('/', async(req, res, next)=>{
    console.log('user: ', req.user);
    try{
        const contacts = await getAllContacts();
        console.log(contacts);
        res.status(200).json({message: 'success', contacts});
    }catch{
        res.status(400).json({message: 'error'});
    }
});

contactsRouter.get('/:id', async (req, res, next)=>{
    const id = parseInt(req.params.id);
    const contact = await getContact(id);
    if(contact){
    res.send({message: 'success', data: contact});
    }else{
        res.send(404).json({message: 'product not found or not exist'})
    }

});

contactsRouter.post('/', async (req, res, next)=>{
    console.log(req.body);

    const newContacat = req.body;
    const contactSaved = await createContact(newContacat);

    if(contactSaved){
        res.send({
        message:'contactr created succesfully', data:contactSaved
    })
    }else{
        res.status(404).json({messade: 'Contact was not creeated'});
    }
    
});

contactsRouter.put('/:id', async (req, res, next)=>{
    const contactUpdate = req.body;
    const contactId = parseInt(req.params.id);

    const contactSaved = await updateContact(contactId, contactUpdate, true);

    console.log({contactUpdate});
    console.log({contactId}); 

    if(contactSaved){
        res.send({
            message: 'contact updated successfuly',
            data: contactUpdate
        });
    }else{
        res.status(404).json({message: 'contact not updated'});
        return;
    }
});

contactsRouter.delete('/:id', async(req, res, next)=>{
    const id = parseInt(req.params.id);
    console.log(id);

    const contactIdDeleted = await deleteContact(id);

    if(contactIdDeleted){
        res.send({
            message: 'contact deleted successfuly',
            data: {
                id: contactIdDeleted}
        });
    }else{
        res.status(404).json({message: 'contact delet wrong'});
    }
});

module.exports = contactsRouter;