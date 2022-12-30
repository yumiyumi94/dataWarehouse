const express = require('express');
const logger = require('morgan');//middleware para logeo de request
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
require('dotenv').config();


//routers
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const contactsRouter = require('./routes/contacts');
const companiesRouter = require('./routes/companies');
const regionsRouter = require('./routes/regions');
const citiesRouter = require('./routes/cities');
const usersRouter = require('./routes/users');


const validAuthentication = require('./middlewares/validAuthentication');



//inicio de api
var app = express();

//middleware
app.use(logger('dev')); //logeo de request a modo dev con libreria morgan
app.use(express.json()); //configura un header para leer y restaurar jsons
app.use(express.urlencoded({ extended: false }));//encodear la url querecibe el endoint
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

//documentation
const swaggerDocument = YAML.load('./spec.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//router publicos
app.use('/', indexRouter);
app.use('/auth', authRouter);

//middleware de autenticación
app.use(validAuthentication);

//router privado con autenticación
app.use('/contacts', contactsRouter);
app.use('/companies', companiesRouter);
app.use('/regions', regionsRouter);
app.use('/cities', citiesRouter);
app.use('/users', usersRouter);



module.exports = app;
