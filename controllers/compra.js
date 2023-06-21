const {response, json} = require('express')

const Compra = require('../models/compra')

const compraGet = async (req, res = response) => {
    const {factura} = req.query

    const compras = await Compra.find()

    res.json({
        compras
    })
}

const compraPost = async (req, res = response) => {
    const body = req.body
    mensaje = ''

    try{
        const compra = new Compra(body)
        await compra.save()
        mensaje = 'La inserción se efectuo exitosamente'
    }
    catch(error){
        if (error){
            if (error.name   === 'ValidationError') {
                console.error(Object.values(error.errors).map(val => val.message))
                mensaje = Object.values(error.errors).map(val => val.message)
            }
        }
        console.log(mensaje)
    }
    res.json({
        msg: mensaje
    })
}

const compraPut = async(req, res = response) => {
    const{factura,fechaCompra,formaPago,valorTotal,observaciones,estado} = req.body
    mensaje = ''

    try{
        const compra = await Compra.findOneAndUpdate({factura:factura},
        {fechaCompra:fechaCompra,formaPago:formaPago,valorTotal:valorTotal,observaciones:observaciones,estado:estado})
        mensaje = 'La modificación se efectuo exitosamente'
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la modificación'
    }

    res.json({
        msg : mensaje
    })    
}

const compraDelete = async ( req, res = response) =>{
    const {_id} = req.body
    mensaje = ''

    try{
        const compra = await Compra.findOneAndDelete({_id:_id})
        mensaje = 'La eliminación se efectuo exitosamente'
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la eliminación'
    }

    res.json({
        msg : mensaje
    })

}

module.exports = ({
    compraGet,
    compraPost,
    compraPut,
    compraDelete
})