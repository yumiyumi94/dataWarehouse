const { TokenExpiredError } = require("jsonwebtoken");

const {Querytypes} =require('sequelize');
const sequelize = require('./conexion');

const getCompany = async(id) => {
    try{
        const [companyFound] = await sequelize.query(`SELECT * FROM companies WHERE id= ${id}`, {type: Querytypes.SELECT}); 

        return companyFound || null;
    }catch(error){
        console.error('ERROR');
        return null; 
    }   
};

const getAllCompanies = async() => {
    try{
        const companies = await sequelize.query(`SELECT * FROM companies;`, {type: Querytypes.SELECT});
        return companies;
    }catch(error){
        console.error('ERROR');
        return [];
    }
};

const createCompany = async(company)=>{
    //si el contacto tiene nombre, apellido y correo
    if (company.name && company.adress && company.mail && company.city){
        try{
            const [companyId] = await sequelize.query (
                `INSERT INTO companies (city, name, adress, mail)
                 VALUES
                ('${company.city}, '${company.name}', '${company.adress}', '${company.mail}');`,
                {type: Querytypes.INSERT}
            );
            const companySaved = {
                id: companyId,
                ...company
            };
            return companySaved;
        }catch(error){
            console.error('ERROR');
        }
    }
};

const updateCompany = async(id, company)=>{
    //si no hay name ni mail no hay nada que actualizar
    if(!company.name || !company.adress &&!company.mail){
        return null;
    }
    try{
        await sequelize.query (
            `UPDATE companies 
            SET name = '${company.name}', adress = '${company.adress}', mail = '${company.mail}'
            WHERE (id = ${id});`,
            {type: Querytypes.UPDATE}
        );

        const companySaved = {
            id,
            ...company
        };
        return companySaved;
    }catch(error){
        console.error('ERROR');
    }
};

const deleteCompany = async(id)=>{
    try{
     await sequelize.query(
            `DELETE FROM companies WHERE id = ${id};`,
            {type: Querytypes.DELET}
        );
        return id; 
    }catch(error){
        console.error('ERROR');
        return[];
    }
};

module.exports = {
    createCompany,
    deleteCompany,
    getCompany, 
    getAllCompanies,
    updateCompany
}; 