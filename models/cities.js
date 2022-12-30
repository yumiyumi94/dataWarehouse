const { TokenExpiredError } = require("jsonwebtoken");

const {Querytypes} =require('sequelize');
const sequelize = require('./conexion');

const getCity = async(id) => {
    try{
        const [cityFound] = await sequelize.query(`SELECT * FROM cities WHERE id= ${id}`, {type: Querytypes.SELECT}); 

        return cityFound || null;
    }catch(error){
        console.error('ERROR');
        return null; 
    }   
};

const getAllCities = async() => {
    try{
        const cities = await sequelize.query(`SELECT * FROM cities;`, {type: Querytypes.SELECT});
        return cities;
    }catch(error){
        console.error('ERROR');
        return [];
    }
};

const createCity = async(city)=>{
    //si la ciudad tiene nombre
    if (city.name){
        try{
            const [cityId] = await sequelize.query (
                `INSERT INTO cities (name)
                 VALUES
                ('${city.name});`,
                {type: Querytypes.INSERT}
            );
            const citySaved = {
                id: cityId,
                ...city
            };
            return citySaved;
        }catch(error){
            console.error('ERROR');
        }
    }
};

const updateCity = async(id, city)=>{
    //si no hay name no hay nada que actualizar
    if(!city.name){
        return null;
    }
    try{
        await sequelize.query (
            `UPDATE cities 
            SET name = '${city.name}'
            WHERE (id = ${id});`,
            {type: Querytypes.UPDATE}
        );

        const citySaved = {
            id,
            ...city
        };
        return citySaved;
    }catch(error){
        console.error('ERROR');
    }
};

const deleteCity = async(id)=>{
    try{
     await sequelize.query(
            `DELETE FROM cities WHERE id = ${id};`,
            {type: Querytypes.DELET}
        );
        return id; 
    }catch(error){
        console.error('ERROR');
        return[];
    }
};

module.exports = {
    createCity,
    deleteCity,
    getCity, 
    getAllCities,
    updateCity
}; 