// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Inizializar variables
var app = express();

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

//Conexion a la bd
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if(err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});

//rutas middleguare
app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);
app.use('/login', loginRoutes);


//Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server corriendo por el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});