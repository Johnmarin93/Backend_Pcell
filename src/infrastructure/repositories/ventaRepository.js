const Venta = require("../../domain/venta");
const Contador = require("../../domain/contador");

const VentaRepository = {
  // Crear una venta
  async crear(ventaData) {
    ventaData.numVenta = await this.obtenerSiguienteNumeroVenta();
    return await Venta.create(ventaData);
  },

  // obtener el siguiente número de venta
  async obtenerSiguienteNumeroVenta() {
    const contador = await Contador.findOneAndUpdate(
      { nombre: "venta" },
      { $inc: { secuencia: 1 } },
      { new: true, upsert: true }
    );
    return contador.secuencia;
  },

  // Consultamos por numero de venta
  async obtenerPorNumeroVenta(numVenta) {
    return await Venta.findOne({ numVenta });
  },

  // Consultamos todas las ventas
  async obtenerTodas() {
    return await Venta.find();
  },

  // Consultamos por cliente
  async obtenerPorCliente(cedula) {
    return await Venta.find({ cliente: cedula });
  },

  // Consultamos por fecha
  async obtenerPorFecha(fecha) {
    // Consultar si hay ventas en el rango de fechas
    const exiteVentas = await Venta.find({ fecha });
    if (exiteVentas.length === 0) {
      throw new Error("No hay ventas registradas en esta fecha");
    }

    const fechaInicio = new Date(fecha);
    fechaInicio.setUTCHours(0, 0, 0, 0); // Convertir la fecha a UTC para evitar problemas de zona horaria

    const fechaFin = new Date(fecha);
    fechaFin.setUTCHours(23, 59, 59, 999); // Asegurar que el rango incluya todo el día

    const ventas = await Venta.find({
      fecha: { $gte: fechaInicio, $lte: fechaFin },
    });

    return ventas;
  },

  // Consultamos por rango de fechas
  async obtenerPorRangoFechas(fechaInicio, fechaFin) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    fin.setHours(23, 59, 59, 999);

    return await Venta.find({
      fecha: { $gte: inicio, $lte: fin },
    });
  },

  // Consultamospor tipo de venta
  async obtenerPorTipo(tipo) {
    return await Venta.find({ tipoVenta: tipo });
  },

  // Actualizamos una venta
  async actualizar(numVenta, ventaData) {
    return await Venta.findOneAndUpdate({ numVenta }, ventaData, { new: true });
  },

  // Eliminamos una venta
  async eliminar(numVenta) {
    return await Venta.findOneAndDelete({ numVenta });
  },
};

module.exports = VentaRepository;
