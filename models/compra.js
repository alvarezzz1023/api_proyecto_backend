const { Schema, model } = require('mongoose');

const compraSchema = Schema({
  proveedor: {
    type: String,
    required: [true, 'El nombre del proveedor es obligatorio'],
    match: /^[A-Za-z\s]+$/
  },
  contacto: {
    type: String,
    required: [true, 'El nombre del contacto es obligatorio'],
    match: /^[A-Za-z\s]+$/
  },
  factura: {
    type: Number,
    require: [true, 'El numero de factura es obligatorio'],
    unique: true,
    min: 1
  },
  fechaCompra: {
    type: Date,
    required: [true, 'La fecha de compra es obligatoria']
  },
  fechaRegistro: {
    type: Date
  },
  formaPago: {
    type: String,
    enum: ['Contado', 'Credito'],
    required: [true, 'La forma de pago es obligatoria']
  },
  valorTotal: {
    type: Number,
    require: [true, 'El valor total es obligatorio'],
    min: 1
  },
  observaciones: {
    type: String,
    required: false,
    max: 500
  },
  estado: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo'
  }
});
compraSchema.pre('save', function (next) {
    this.fechaRegistro = new Date();
    next();
  });

module.exports = model('Compra', compraSchema);
