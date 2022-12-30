const { TokenExpiredError } = require("jsonwebtoken");

const {Querytypes} =require('sequelize');
const sequelize = require('./conexion');

const getRegion = async(id) => {
    try{
        const [regionFound] = await sequelize.query(`SELECT * FROM regions WHERE id= ${id}`, {type: Querytypes.SELECT}); 

        return regionFound || null;
    }catch(error){
        console.error('ERROR');
        return null; 
    }   
};

const getAllRegions = async() => {
    try{
        const regions = await sequelize.query(`SELECT * FROM regions;`, {type: Querytypes.SELECT});
        return regions;
    }catch(error){
        console.error('ERROR');
        return [];
    }
};

const createRegion = async(region)=>{
    //si la region tiene nombre
    if (region.name){
        try{
            const [regionId] = await sequelize.query (
                `INSERT INTO regions (name)
                 VALUES
                ('${region.name});`,
                {type: Querytypes.INSERT}
            );
            const regionSaved = {
                id: regionId,
                ...region
            };
            return regionSaved;
        }catch(error){
            console.error('ERROR');
        }
    }
};

const updateRegion = async(id, region)=>{
    //si no hay name no hay nada que actualizar
    if(!region.name){
        return null;
    }
    try{
        await sequelize.query (
            `UPDATE regions 
            SET name = '${region.name}'
            WHERE (id = ${id});`,
            {type: Querytypes.UPDATE}
        );

        const regionSaved = {
            id,
            ...region
        };
        return regionSaved;
    }catch(error){
        console.error('ERROR');
    }
};

const deleteRegion = async(id)=>{
    try{
     await sequelize.query(
            `DELETE FROM regions WHERE id = ${id};`,
            {type: Querytypes.DELET}
        );
        return id; 
    }catch(error){
        console.error('ERROR');
        return[];
    }
};

module.exports = {
    createRegion,
    deleteRegion,
    getRegion, 
    getAllRegions,
    updateRegion
}; 