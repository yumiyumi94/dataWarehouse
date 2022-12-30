require('dotenv').config();
const { QueryTypes } = require('sequelize');
const sequelize = require('../models/conexion');

const CREATE_USERS_TABLE = `
CREATE TABLE dataWarehouse.users (
    id_user INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL,
    profile VARCHAR(45) NULL,
    type VARCHAR(45) NOT NULL,
    password VARCHAR(300) NOT NULL,
    PRIMARY KEY (id_user));
`;

const CREATE_REGIONS_TABLE = `
CREATE TABLE regions (
    id_region INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    PRIMARY KEY (id_region));
`;

const CREATE_COUNTRIES_TABLE = `
CREATE TABLE countries (
    id_country INT NOT NULL AUTO_INCREMENT,
    region_id INT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_country));
`;

const CREATE_CITIES_TABLE = `
CREATE TABLE cities (
    id_city INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_city));
`;

const CREATE_COMPANIES_TABLE = `
CREATE TABLE companies (
    id_company INT NOT NULL AUTO_INCREMENT,
    city VARCHAR(255) NULL,
    name VARCHAR(255) NOT NULL,
    adress VARCHAR(255) NOT NULL,
    mail VARCHAR(45) NOT NULL,
    PRIMARY KEY (id_company));
`;

const CREATE_CONTACTS_TABLE = `
CREATE TABLE contacts (
    id_contact INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    position VARCHAR(45) NOT NULL,
    mail VARCHAR(45) NOT NULL,
    company VARCHAR(255) NULL,
    region VARCHAR(45) NULL,
    country VARCHAR(255) NULL,
    city VARCHAR(255) NULL,
    adress VARCHAR(255) NOT NULL,
    interest VARCHAR(45) NULL,
    contactChannel VARCHAR(45) NULL,
    userAccount VARCHAR(45) NULL,
    preferences VARCHAR(45) NULL,
    PRIMARY KEY (id_contact));`;

const INSERT_USER_1 = `
INSERT INTO dataWarehouse.users (id_user, name, last_name, mail, profile, type, password) 
VALUES ('1', 'Pepito', 'Perez', 'pepitop@gmail.com', 'CEO pepitos Car SA', 'Admin', '$2a$10$Go2bXvqI2LL9ei3777/2OerE7.TkzTdvygLWcZjWbEtntsjGWbfzG');
`;
//contraseña 1234

const INSERT_USER_2 =`
    INSERT INTO dataWarehouse.users (id_user, name, last_name, mail, profile, type, password) 
    VALUES 
    (2, 'Camila', 'Gomez', 'camilag@gmail.com', 'CEO de camilas cheese SA', 'Basic', '$2a$10$Sv4JZ01VxOVV2TcOjwQ8kuJ0e.XXuf2cccdbwFM2oSHTUUHBh5cxi');
`;
//contraseña acamica123

const INSERT_REGION_1 = `
    INSERT INTO dataWarehouse.regions (id_region, name) 
    VALUES 
    ('1', 'Latam');
`
const INSERT_REGION_2 = `
    INSERT INTO dataWarehouse.regions (id_region, name) 
    VALUES 
    ('2', 'Europe');
`
const INSERT_COUNTRY_1 =`
    INSERT INTO dataWarehouse.countries (id_country, name) 
    VALUES 
    ('1', 'Argentina');`

const INSERT_COUNTRY_2 =`
    INSERT INTO dataWarehouse.countries (id_country, name) 
    VALUES 
    ('2', 'España');`

const INSERT_CITY_1 = `
    INSERT INTO dataWarehouse.cities (id_city, name) 
    VALUES 
    ('1', 'Buenos Aires');
`
const INSERT_CITY_2 = `
    INSERT INTO dataWarehouse.cities (id_city, name) 
    VALUES 
    ('2', 'Madrid');
`
const INSERT_COMPANY_1=`
    INSERT INTO dataWarehouse.companies (id_company, city, name, adress, mail) 
    VALUES 
    ('1', 'Buenos Aires', 'Acamica', 'Buenos Aires 1', 'acamica@acamica.com');
`

const INSERT_COMPANY_2=`
    INSERT INTO dataWarehouse.companies (id_company, city, name, adress, mail) 
    VALUES 
    ('2', 'Madrid', 'Globant', 'Madrid 2', 'globant@globant.com');
`

const INSERT_CONTACT_1 = `
INSERT INTO dataWarehouse.contacts (id_contact, user_id, name, last_name, position, mail, company, region, country, city, adress, interest, contactChannel, userAccount, preferences) 
VALUES ('1', '1', 'Pepito', 'Paez', 'CEO', 'ppaez@gmail.com', 'pepitos car', 'Latam', 'Argentina', 'Buenos Aires', 'Buenos Aires 1', '25%', 'instagram', '@ppaez', 'after3pm');
`;

const INSERT_CONTACT_2 = `
INSERT INTO dataWarehouse.contacts (id_contact, user_id, name, last_name, position, mail, company, region, country, city, adress, interest, contactChannel, userAccount, preferences) 
VALUES ('2', '2', 'Adriana', 'Gomez', 'COO', 'agom@gmail.com', 'Adricarteras', 'Europe', 'España', 'Madrid', 'Madrid 1', '55%', 'whatsapp', '312357545541', 'in the morning');
`;

const DROP_USER_TABLE = `DROP TABLE IF EXISTS users;`
const DROP_REGION_TABLE = `DROP TABLE IF EXISTS regions;`
const DROP_COUNTRIES_TABLE = `DROP TABLE IF EXISTS countries;`
const DROP_CITIES_TABLE = `DROP TABLE IF EXISTS cities;`
const DROP_COMPANIES_TABLE = `DROP TABLE IF EXISTS companies;`
const DROP_CONTACTS_TABLE = `DROP TABLE IF EXISTS contacts;`

const createTables = async () =>{
    try{
        await sequelize.query(CREATE_USERS_TABLE);
        await sequelize.query(CREATE_REGIONS_TABLE);
        await sequelize.query(CREATE_COUNTRIES_TABLE);
        await sequelize.query(CREATE_CITIES_TABLE);
        await sequelize.query(CREATE_COMPANIES_TABLE);
        await sequelize.query(CREATE_CONTACTS_TABLE);
    }catch(error){
        console.error('Error; ', error);
    }
}

const insertData = async ()=>{
    try{
        await sequelize.query(INSERT_USER_1, {type: QueryTypes.INSERT});
        await sequelize.query(INSERT_USER_2, {type: QueryTypes.INSERT});
        await sequelize.query(INSERT_REGION_1, {type: QueryTypes.INSERT});
        await sequelize.query(INSERT_REGION_2, {type: QueryTypes.INSERT});
        await sequelize.query(INSERT_COUNTRY_1, {type: QueryTypes.INSERT});
        await sequelize.query(INSERT_COUNTRY_2, {type: QueryTypes.INSERT});
        await sequelize.query(INSERT_CITY_1, {type: QueryTypes.INSERT});
        await sequelize.query(INSERT_CITY_2, {type: QueryTypes.INSERT});
        await sequelize.query(INSERT_COMPANY_1, {type: QueryTypes.INSERT});
        await sequelize.query(INSERT_COMPANY_2, {type: QueryTypes.INSERT});
        await sequelize.query(INSERT_CONTACT_1, {type: QueryTypes.INSERT});
        await sequelize.query(INSERT_CONTACT_2, {type: QueryTypes.INSERT});
        console.log('contact created succesfully');
    }catch(error){
        console.error('Error; ', error);
    }
};

const deleteTables = async () => {
    try {
      await sequelize.query(DROP_USER_TABLE);
      await sequelize.query(DROP_REGION_TABLE);
      await sequelize.query(DROP_COUNTRIES_TABLE);
      await sequelize.query(DROP_CITIES_TABLE);
      await sequelize.query(DROP_COMPANIES_TABLE);
      await sequelize.query(DROP_CONTACTS_TABLE);
      console.log('tables users, regions, countries, cities, companies, contacts deleted successfuly');
    } catch (error) {
      console.error('Error: ', error);
    }
  };

const main = async()=>{
    //await deleteTables();
    //await createTables();
    await insertData();
};

main();

