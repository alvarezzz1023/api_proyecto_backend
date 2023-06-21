const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({

    numeroIdentificacion: {
        type: Number,
        required: [true, 'El número de identificación es obligatorio'],
        unique: true,
        min: 5
    },
    nombre: {
        type: String,
        required: [true, 'El nombre comercial es obligatorio'],
        match: /^[A-Za-z\s]+$/
    },
    correo: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{3,}$/,
        unique: true
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },
});

module.exports = model('Usuario', usuarioSchema);
