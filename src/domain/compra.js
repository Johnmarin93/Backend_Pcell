
const mongoose = require('mongoose');

const CompraSchema = new mongoose.Schema({
    numCompra: {
        type: Number,
        unique: true
    },
    fecha: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    proveedor: { 
        type: String,
        ref: 'Proveedor',
        required: true 
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
    },
    estadoPago: { 
        type: String, 
        enum: ['Pendiente', 'Pagado'], 
        default: 'Pendiente' 
    },
    montoAbonado: { 
        type: Number,
        default: 0 
    },
    montoPendiente: { 
        type: Number, 
        required: true 
    }
});

module.exports = mongoose.model('Compra', CompraSchema);
