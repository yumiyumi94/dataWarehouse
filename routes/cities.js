const express =require('express');

const { getAllCities, createCity, deleteCity, getCity, updateCity} = require('../models/cities');

const citiesRouter = express.Router();

/*GET contact listin. */
citiesRouter.get('/', async(req, res, next)=>{
    console.log('cities: ', req.city);
    const cities = await getAllCities();
    res.send({message: 'success', cities});
});

citiesRouter.get('/:id', async (req, res, next)=>{
    const id = parseInt(req.params.id);
    const city = await getCity(id);
    if(city){
    res.send({message: 'success', data: city});
    }else{
        res.send(404).json({message: 'city not found or not exist'})
    }

});

citiesRouter.post('/', async (req, res, next)=>{
    console.log(req.body);

    const newCity = req.body;
    const citySaved = await createCity(newCity);

    if(citySaved){
        res.send({
        message:'city created succesfully', data:citySaved
    })
    }else{
        res.status(404).json({messade: 'Region was not created'});
    }
    
});

citiesRouter.put('/:id', async (req, res, next)=>{
    const cityUpdate = req.body;
    const cityId = parseInt(req.params.id);

    const citySaved = await updateCity(cityId, cityUpdate, true);

    console.log({cityUpdate});
    console.log({cityId}); 

    if(citySaved){
        res.send({
            message: 'city updated successfuly',
            data: cityUpdate
        });
    }else{
        res.status(404).json({message: 'city not updated'});
    }
});

citiesRouter.delete('/:id', async(req, res, next)=>{
    const id = parseInt(req.params.id);
    console.log(id);

    const cityIdDeleted = await deleteCity(id);

    if( cityIdDeleted){
        res.send({
            message: 'City deleted successfuly',
            data: {
                id: cityIdDeleted}
        });
    }else{
        res.status(404).json({message: 'city delet wrong'});
    }
});

module.exports = citiesRouter;