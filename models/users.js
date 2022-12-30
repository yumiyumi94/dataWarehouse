const bycrypt = require('bcryptjs');
const {Querytypes} =require('sequelize');

const sequelize = require('./conexion');

const saltRounds = 10;

const { users } = require("../routes");
const { QueryTypes } = require('sequelize');

//mi data base
const usuarios = [
    {
        id:0,
        user:"codigo",
        name: "Pepito",
        last_name:"Pérez",
        mail: "pepitop@gmail.com",
        profile: "CEO de pepito leches SA",
        type: "Admin",
        password: "$2a$10$Go2bXvqI2LL9ei3777/2OerE7.TkzTdvygLWcZjWbEtntsjGWbfzG" //1234
    },
    {
        id:1,
        user: "acamica",
        name: "Camila",
        last_name:"Gómez",
        mail: "camilag@gmail.com",
        profile: "CEO de Camila Gómez quesos SAS",
        type: "Basic",
        password: "$2a$10$Sv4JZ01VxOVV2TcOjwQ8kuJ0e.XXuf2cccdbwFM2oSHTUUHBh5cxi" //acamica123
    },
];

const createUser = async (user) => {
// validación: user tiene que tener nombre apellido mail perfil y contraseña para ser creado
    if(!(user.mail || user.name || user.password)){
        return null;
    }
    try {
// validar que no existe usuario en bd
        const [userAlreadyExist] = await sequelize.query(`SELECT * FROM users WHERE mail = '${user.mail}';`, {type: QueryTypes.SELECT});
        
        if(userAlreadyExist){
            return null;
        }
//hasheo password
        const {password} = user;
        const hash = await bycrypt.hash(password, saltRounds);
//insert en la db de users
        const [userId] = await sequelize.query(
            `INSERT INTO users 
            (name, last_name, mail, profile, type, password) 
            VALUES 
            ('${user.name}', '${user.last_name}', '${user.mail}', '${user.profile}', '${user.type}', '${hash}');`, {type: QueryTypes.INSERT}
        );

        const userSaved = {
            id: userId,
            name: user.name,
            last_name:user.last_name,
            mail: user.mail
        }

        return userSaved;
    } catch(error){
        console.log('ERROR: ', error);
    }
};

const getUser = async(mail, password) => {
    try{
        const [userFind] = await sequelize.query(`SELECT * FROM users WHERE mail = '${mail}';`, {type: QueryTypes.SELECT});
        console.log({userFind});
        
        if(!userFind){
            return null;
        }

        const isPasswordCorrect = await bycrypt.compare(password, userFind.password);

        if(!isPasswordCorrect){
        return null;
        }
        delete userFind.password;
    return userFind;

    }catch(error){
        console.error('ERROR', error);
        return null; 
    }
};

const getAllUsers = async () => {
    try{
        const users = await sequelize.query(`SELECT * FROM users;`, { type:QueryTypes.SELECT});
        return users;
    }catch(error){
        console.error('ERROR', error);
        return [];
    }
};

const updateUser = async(id, user)=>{
    //si no hay name no hay nada que actualizar
    if(!user.name){
        return null;
    }
    try{
        await sequelize.query (
            `UPDATE users 
            SET name = '${user.name}'
            WHERE (id = ${id});`,
            {type: Querytypes.UPDATE}
        );

        const userSaved = {
            id,
            ...user
        };
        return userSaved;
    }catch(error){
        console.error('ERROR');
    }
};

const deleteUser = async(id)=>{
    try{
     await sequelize.query(
            `DELETE FROM users WHERE id = ${id};`,
            {type: Querytypes.DELET}
        );
        return id; 
    }catch(error){
        console.error('ERROR');
        return[];
    }
};

module.exports = {
    getUser, getAllUsers, createUser, updateUser, deleteUser
}; 
