const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    codigo: { 
        type: String, 
        required: true, 
        unique: true 
    },
    nombre: { 
        type: String, 
        required: true 
    },
    servicio: { 
        type: Boolean, 
        required: true 
    },
    categoria: { 
        type: String, 
        required: true 
    },
    stockMinimo: { 
        type: Number, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true 
    },
    precio: { 
        type: Number, 
        required: true 
    }
});

module.exports = mongoose.model('Producto', ProductoSchema);
