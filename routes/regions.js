const express =require('express');

const { getAllRegions, createRegion, deleteRegion, getRegion, updateRegion} = require('../models/regions');

const regionsRouter = express.Router();

/*GET contact listin. */
regionsRouter.get('/', async(req, res, next)=>{
    console.log('region: ', req.region);
    const regions = await getAllRegions();
    res.send({message: 'success', regions});
});

regionsRouter.get('/:id', async (req, res, next)=>{
    const id = parseInt(req.params.id);
    const region = await getRegion(id);
    if(region){
    res.send({message: 'success', data: region});
    }else{
        res.send(404).json({message: 'region not found or not exist'})
    }

});

regionsRouter.post('/', async (req, res, next)=>{
    console.log(req.body);

    const newRegion = req.body;
    const regionSaved = await createRegion(newRegion);

    if(regionSaved){
        res.send({
        message:'region created succesfully', data:regionSaved
    })
    }else{
        res.status(404).json({messade: 'Region was not created'});
    }
    
});

regionsRouter.put('/:id', async (req, res, next)=>{
    const regionUpdate = req.body;
    const regionId = parseInt(req.params.id);

    const regionSaved = await updateRegion(regionId, regionUpdate, true);

    console.log({regionUpdate});
    console.log({regionId}); 

    if(regionSaved){
        res.send({
            message: 'region updated successfuly',
            data: regionUpdate
        });
    }else{
        res.status(404).json({message: 'region not updated'});
    }
});

regionsRouter.delete('/:id', async(req, res, next)=>{
    const id = parseInt(req.params.id);
    console.log(id);

    const regionIdDeleted = await deleteRegion(id);

    if(regionIdDeleted){
        res.send({
            message: 'region deleted successfuly',
            data: {
                id: regionIdDeleted}
        });
    }else{
        res.status(404).json({message: 'region delet wrong'});
    }
});

module.exports = regionsRouter;