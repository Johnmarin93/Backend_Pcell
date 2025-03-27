const Compra = require("../../domain/compra");
const Contador = require("../../domain/contador");

const CompraRepository = {
  // Crea una compra
  async crear(compraData) {
    compraData.numCompra = await this.obtenerSiguienteNumeroCompra();
    return await Compra.create(compraData);
  },

  // Obtiene el siguiente número de compra
  async obtenerSiguienteNumeroCompra() {
    const contador = await Contador.findOneAndUpdate(
      { nombre: "compra" },
      { $inc: { secuencia: 1 } },
      { new: true, upsert: true }
    ); // Incrementa el valor de la secuencia y lo retorna
    return contador.secuencia;
  },

  // Obtiene todas las compras
  async obtenerTodas() {
    return await Compra.find();
  },

  // Obtiene las compras por fecha
  async obtenerPorFecha(fecha) {
    return await Compra.find({ fecha });
  },

  // Obtiene las compras por rango de fechas
  async obtenerPorRangoFechas(fechaInicio, fechaFin) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    fin.setHours(23, 59, 59, 999);

    return await Compra.find({
      fecha: { $gte: inicio, $lte: fin },
    });
  },

  // Obtiene las compras por nit del proveedor
  async obtenerPorProveedor(nit) {
    return await Compra.find({ proveedor: nit });
  },

  // Obtiene las compras por estado de pago
  async obtenerPorEstadoPago(estadoPago) {
    return await Compra.find({ estadoPago });
  },

  // Obtiene la compra por número
  async obtenerPorNumero(numCompra) {
    return await Compra.findOne({ numCompra });
  },

  // Actualiza la compra
  async actualizar(numCompra, compraData) {
    return await Compra.findOneAndUpdate({ numCompra }, compraData, {
      new: true,
    });
  },

  // Elimina una compra
  async eliminar(numCompra) {
    return await Compra.findOneAndDelete({ numCompra });
  },
};

module.exports = CompraRepository;
