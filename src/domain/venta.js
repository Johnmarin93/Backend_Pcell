const mongoose = require('mongoose');

const VentaSchema = new mongoose.Schema({
    numVenta: { 
        type: Number, 
        unique: true 
    },
    cliente: { 
        type: String,
        ref: 'Cliente',
        required: true 
    },
    tipoVenta: { 
        type: String, 
        enum: ['Contado', 'Crédito'], 
        required: true 
    },
    fecha: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    productos: [{
        codigo: { 
            type: String,
            required: true
        },
        nombreProducto: { 
            type: String, 
            required: true 
        },
        cantidad: { 
            type: Number, 
            required: true 
        },
        precioUnidad: { 
            type: Number, 
            required: true 
        },
        subTotal: { 
            type: Number, 
            required: true 
        }
    }],
    total: { 
        type: Number, 
        required: true 
    }
});

module.exports = mongoose.model('Venta', VentaSchema);
