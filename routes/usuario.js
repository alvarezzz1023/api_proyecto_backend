const {Router} = require('express')

const route = Router()

const{ usuarioGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/usuario')

route.get('/usuario',usuarioGet)

route.post('/usuario',usuarioPost)

route.put('/usuario',usuarioPut)

route.delete('/usuario',usuarioDelete)

module.exports = route