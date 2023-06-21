const { response, json } = require('express');
const Proveedor = require('../models/proveedor');

const proveedorGet = async (req, res = response) => {
    const { numeroIdentificacion } = req.query;

    try {
        let proveedores;

        if (numeroIdentificacion) {
            proveedores = await Proveedor.find({ numeroIdentificacion });
        } else {
            proveedores = await Proveedor.find();
        }

        res.json({
            proveedores
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        });
    }
};

const proveedorPost = async (req, res = response) => {
    const body = req.body;

    try {
        const proveedor = new Proveedor(body);
        await proveedor.save();

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

const proveedorPut = async (req, res = response) => {
    const { numeroIdentificacion, tipoProveedor, tipoIdentificacion, razonSocial, nombreComercial, ciudad, direccion, contacto, telefono, correo, estado } = req.body;

    try {
        const proveedor = await Proveedor.findOneAndUpdate(
            { numeroIdentificacion: numeroIdentificacion },
            { tipoProveedor, tipoIdentificacion, razonSocial, nombreComercial, ciudad, direccion, contacto, telefono, correo, estado },
            { new: true }
        );

        if (!proveedor) {
            return res.status(404).json({
                msg: 'Proveedor no encontrado'
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

const proveedorDelete = async (req, res = response) => {
    const { _id } = req.body;

    try {
        const proveedor = await Proveedor.findOneAndDelete({ _id });

        if (!proveedor) {
            return res.status(404).json({
                msg: 'Proveedor no encontrado'
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
    proveedorGet,
    proveedorPost,
    proveedorPut,
    proveedorDelete
};
