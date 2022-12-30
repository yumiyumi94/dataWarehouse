const express =require('express');

const { getAllCompanies, createCompany, deleteCompany, getCompany, updateCompany } = require('../models/companies');

const companiesRouter = express.Router();

/*GET company listin. */
companiesRouter.get('/', async(req, res, next)=>{
    console.log('company: ', req.company);
    const companies = await getAllCompanies();
    res.send({message: 'success', companies});
});

companiesRouter.get('/:id', async (req, res, next)=>{
    const id = parseInt(req.params.id);
    const company = await getCompany(id);
    if(company){
    res.send({message: 'success', data: company});
    }else{
        res.send(404).json({message: 'company not found or not exist'})
    }

});

companiesRouter.post('/', async (req, res, next)=>{
    console.log(req.body);

    const newCompany = req.body;
    const companySaved = await createCompany(newCompany);

    if(companySaved){
        res.send({
        message:'contactr created succesfully', data:companySaved
    })
    }else{
        res.status(404).json({messade: 'company was not creeated'});
    }
    
});

companiesRouter.put('/:id', async (req, res, next)=>{
    const companyUpdate = req.body;
    const companyId = parseInt(req.params.id);

    const companySaved = await updateCompany(companyId, companyUpdate, true);

    console.log({companyUpdate});
    console.log({companyId}); 

    if(companySaved){
        res.send({
            message: 'company updated successfuly',
            data: companyUpdate
        });
    }else{
        res.status(404).json({message: 'company not updated'});
    }
});

companiesRouter.delete('/:id', async(req, res, next)=>{
    const id = parseInt(req.params.id);
    console.log(id);

    const companyIdDeleted = await deleteCompany(id);

    if(companyIdDeleted){
        res.send({
            message: 'company deleted successfuly',
            data: {
                id: companyIdDeleted}
        });
    }else{
        res.status(404).json({message: 'company delet wrong'});
    }
});

module.exports = companiesRouter;