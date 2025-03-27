const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    cedula: { 
        type: String, 
        required: true, 
        unique: true 
    },
    nombre: { 
        type: String, 
        required: true },
    direccion: { 
        type: String, 
        required: true },
    telefono: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('Cliente', ClienteSchema);
