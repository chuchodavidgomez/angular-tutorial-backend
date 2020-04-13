// Requires
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var mdAutenticacion = require('../middlewares/autenticacion');
//Inizializar variables
var app = express();

var Usuario = require('../models/usuario');

//obtener todos los usuarios
app.get('/', (req, res, next) => {
    Usuario.find({ }, 'name email img role')
        .exec(
            (err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Get de usuarios',
                    errors: err
                })
            }

            res.status(200).json({
                ok: false,
                usuarios: usuarios
            })
        }
    )
    
});

//actualizar usuario
app.put('/:id', mdAutenticacion.verficarToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario usuarios',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario no  el id existe',
                errors: {message: 'No existe un usuario con ese ID'}
            });
        }

        usuario.nombre = body.nombre,
        usuario.email = body.email,
        usuario.role = body.role

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el usuario',
                    errors: err
                });
            }
            res.status(200).json({
                ok: false,
                body: usuarioGuardado
            });
        });
    });
})

// cRear usuario
app.post('/', mdAutenticacion.verficarToken, (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });
    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuarios',
                errors: err
            })
        }
        res.status(201).json({
            ok: false,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        })
    });    
});

//borrar por id
app.delete('/:id', mdAutenticacion.verficarToken, (req, res) => {
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuarios',
                errors: err
            })
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: err
            })
        }
        res.status(200).json({
            ok: false,
            body: usuarioBorrado
        })
    })

})

module.exports = app;