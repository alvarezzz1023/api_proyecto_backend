const express = require('express')
const {dbConnection} = require('../database/config')
const cors = require('cors')//Implementar seguridad
const bodyParser = require('body-parser')//Recibir datos de formulario html

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT//capturando variables

        this.proveedorPath = '/api'
  
        this.compraPath = '/api'
        this.usuarioPath = '/api'
        this.middlewares()//ayudas extras enlaces o puentes
        this.routes()//las rutas
        this.conectarDB()//conectarse a la base de datos
    }
    
    listen(){
        this.app.listen(this.port,() => {
            console.log(`Escuchando el puerto ${this.port}`)
        })
    }

    middlewares(){
        this.app.use(express.static(__dirname + "/public"));
        this.app.use(cors());
        this.app.use(bodyParser.json())
    }

    routes(){

        this.app.use(this.proveedorPath,require('../routes/proveedor')),
        this.app.use(this.usuarioPath,require('../routes/usuario')),
        this.app.use(this.compraPath,require('../routes/compra'))
       
    }
    //asincronica porque no se sabe cuanto tiempo hay que esperar siempre hya que retornar con await

    async conectarDB(){
       await dbConnection() //esprando la conexion o respuesta del servidor
    }
}

module.exports = Server
