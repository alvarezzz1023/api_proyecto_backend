const { Schema, model } = require('mongoose');

const proveedorSchema = Schema({
    tipoProveedor: { 
        type: String,
        enum: ['Empresa', 'Persona natural'],
        required: [true, 'El tipo de proveedor es requerido']
    },
    tipoIdentificacion: {
        type: String,
        enum: ['C.C', 'C.E', 'T.E', 'NIT', 'T.I'],
        required: [true, 'El tipo de identificación es obligatorio']
    },
    numeroIdentificacion: {
        type: Number,
        required: [true, 'El número de identificación es obligatorio'],
        unique: true,
        min: 5
    },
    razonSocial: {
        type: String,
        required: [true, 'La razón social es obligatoria'],
        match: /^[A-Za-z\s]+$/
    },
    nombreComercial: {
        type: String,
        required: [true, 'El nombre comercial es obligatorio'],
        match: /^[A-Za-z\s]+$/
    },
    ciudad: {
        type: String,
        required: [true, 'La ciudad es obligatoria'],
        match: /^[A-Za-z\s]+$/
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    contacto: {
        type: String,
        required: [true, 'El nombre del contacto es obligatorio'],
        match: /^[A-Za-z\s]+$/
    },
    telefono: {
        type: String,
        required: [true, 'El número de teléfono es obligatorio'],
        unique: true
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

module.exports = model('Proveedor', proveedorSchema);
