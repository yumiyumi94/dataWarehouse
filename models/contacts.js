const { TokenExpiredError } = require("jsonwebtoken");

const { QueryTypes } = require('sequelize');
const sequelize = require('./conexion');

const getContact = async(id) => {
    try{
        const [contactFound] = await sequelize.query(`SELECT * FROM contacts WHERE id= ${id}`, {type: Querytypes.SELECT}); 

        return contactFound || null;
    }catch(error){
        console.error('ERROR');
        return null; 
    }   
};

const getAllContacts = async() => {
    try{
        const contacts = await sequelize.query(`SELECT * FROM contacts;`, {type: QueryTypes.SELECT});
        return contacts;
    }catch(error){
        console.error('ERROR');
        return null;
    }
};

const createContact = async(contact)=>{
    //si el contacto tiene nombre, apellido y correo
    if (contact.name && contact.lastname && contact.mail){
        try{
            const [contactId] = await sequelize.query (
                `INSERT INTO contacts (name, last name, position, mail, company, region, country, city, adress, interest, contactChannel, userAccount, preferences)
                 VALUES
                ('${contact.name}, '${contact.lastname}', '${contact.position}', '${contact.mail}', '${contact.company}', '${contact.region}', '${contact.country}', '${contact.city}', '${contact.adress}','${contact.interest}' '${contact.contactChannel}', '${contact.userAccount}', '${contact.preferences}');`,
                {type: QueryTypes.INSERT}
            );
            const contactSaved = {
                id: contactId,
                ...contact
            };
            return contactSaved;
        }catch(error){
            console.error('ERROR');
        }
    }
};

const updateContact = async(id, contact)=>{
    //si no hay name ni lastname ni mail no hay nada que actualizar
    if(!contact.name || !contact.lastname &&!contact.mail){
        return null;
    }
    try{
        await sequelize.query (
            `UPDATE contacts 
            SET name = '${contact.name}', lastname = '${contact.lastname}', mail = '${contact.mail}'
            WHERE (id = ${id});`,
            {type: QueryTypes.UPDATE}
        );

        const contactSaved = {
            id,
            ...contact
        };
        return contactSaved;
    }catch(error){
        console.error('ERROR');
    }
};

const deleteContact = async(id)=>{
    try{
     await sequelize.query(
            `DELETE FROM contacts WHERE id = ${id};`,
            {type: QueryTypes.DELET}
        );
        return id; 
    }catch(error){
        console.error('ERROR');
        return[];
    }
};

module.exports = {
    createContact,
    deleteContact,
    getContact, 
    getAllContacts,
    updateContact
}; 