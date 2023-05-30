//Importa express
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

//Funcion para ejecutar express a través de app
const app = express();

//Conectar bd
db.authenticate()
    .then( ()=> console.log('Base de datos conectada') )
    .catch( error => console.log(error) )

//Definir puerto
//process.env.PORT variable de entorno
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

//MIDDLEWARE
//Obtener el año actual
app.use( ( req, res, next) => { //request es lo que tu envies, response lo que express responde, next avanza cuando terminar de ejecutarse
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes'

    return next();
});

//Agregar body parser para leer los datos de un formulario
app.use(express.urlencoded( {extended: true} ))

//Definir la carpeta publica
app.use(express.static('public'));

//Agregar router
app.use('/', router);

//app arranca el servidor con el método listen
app.listen(port, ()=> {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});