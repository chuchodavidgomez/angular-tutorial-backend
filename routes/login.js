// Requires
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

var app = express();
var Usuario = require('../models/usuario');

//login
app.post('/', (req, res) => {
    var body = req.body;
    Usuario.findOne({email: body.email}, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if (!usuarioDB || !bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas',
                errors: err
            });
        }

        // crear un token
        usuarioDB.password = ':)';
        var token = jwt.sign({ usuario: usuarioDB}, SEED, { expiresIn: 14400});
        res.status(200).json({
            ok: false,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB.id
        })
    })
    
})

module.exports = app;