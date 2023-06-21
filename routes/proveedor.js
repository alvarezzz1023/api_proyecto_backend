const {Router} = require('express')

const route = Router()

const{ proveedorGet, proveedorPost, proveedorPut, proveedorDelete } = require('../controllers/proveedor')

route.get('/proveedor',proveedorGet)

route.post('/proveedor',proveedorPost)

route.put('/proveedor',proveedorPut)

route.delete('/proveedor',proveedorDelete)

module.exports = route