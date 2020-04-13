// Requires
var express = require('express');

//Inizializar variables
var app = express();

//rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    })
})

module.exports = app;