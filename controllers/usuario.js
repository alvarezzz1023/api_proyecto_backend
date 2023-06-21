const { response, json } = require('express');
const Usuario = require('../models/usuario');

const usuarioGet = async (req, res = response) => {
    const { numeroIdentificacion } = req.query;

    try {
        let usuarios;

        if (numeroIdentificacion) {
            usuarios = await Usuario.find({ numeroIdentificacion });
        } else {
            usuarios = await Usuario.find();
        }

        res.json({
            usuarios
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        });
    }
};

const usuarioPost = async (req, res = response) => {
    const body = req.body;

    try {
        const usuario = new Usuario(body);
        await usuario.save();

        res.json({
            msg: 'La inserción se realizó exitosamente'
        });
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            const mensajesError = Object.values(error.errors).map(val => val.message);

            res.status(400).json({
                errores: mensajesError
            });
        } else {
            res.status(500).json({
                msg: 'Ocurrió un error en el servidor'
            });
        }
    }
};

const usuarioPut = async (req, res = response) => {
    const { nombre, numeroIdentificacion, correo, estado} = req.body;

    try {
        const usuario = await Usuario.findOneAndUpdate(
            { numeroIdentificacion: numeroIdentificacion },
            { nombre: nombre, correo:correo, estado:estado},
            { new: true }
        );

        if (!usuario) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            });
        }

        res.json({
            msg: 'La modificación se efectuó exitosamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        });
    }
};

const usuarioDelete = async (req, res = response) => {
    const { _id } = req.body;

    try {
        const usuario = await Usuario.findOneAndDelete({ _id });

        if (!usuario) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            });
        }

        res.json({
            msg: 'La eliminación se efectuó exitosamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        });
    }
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
};
