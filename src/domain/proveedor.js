const mongoose = require('mongoose');

const ProveedorSchema = new mongoose.Schema({
    nit: { 
        type: String, 
        required: true, 
        unique: true 
    },
    nombre: { 
        type: String, 
        required: true 
    },
    direccion: { 
        type: String 
    },
    telefono: { 
        type: String 
    },
    vendedor: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Proveedor', ProveedorSchema);
    