const {Router} = require('express')

const route = Router()

const { compraGet, compraPost, compraPut, compraDelete } = require('../controllers/compra')

route.get('/compra',compraGet)

route.post('/compra',compraPost)

route.put('/compra',compraPut)

route.delete('/compra',compraDelete)

module.exports = route