const VentaRepository = require("../infrastructure/repositories/ventaRepository");
const ProductoRepository = require("../infrastructure/repositories/ProductoRepository");
const Cliente = require("../domain/Cliente");

const VentaService = {
  // Registramos una venta
  async registrarVenta(datosVenta) {
    const { cliente, productos } = datosVenta;

    // Verificar si el cliente existe
    const clienteExiste = await Cliente.findOne({ cedula: cliente });
    if (!clienteExiste) {
      throw new Error("El cliente con esta cedula no existe.");
    }

    // Verificar si los productos existen y actualizar stock
    for (let item of productos) {
      const productoExiste = await ProductoRepository.obtenerPorCodigo(
        item.codigo
      );
      if (!productoExiste) {
        throw new Error(`El producto con código ${item.codigo} no existe.`);
      }
      item.nombreProducto = productoExiste.nombre;

      // Restar la cantidad vendida al stock existente
      if (productoExiste.stock < item.cantidad) {
        throw new Error(
          `No hay suficiente stock para el producto con código ${item.codigo}.`
        );
      }
      productoExiste.stock -= item.cantidad;
      await productoExiste.save();
    }

    return await VentaRepository.crear(datosVenta);
  },

  // Consultamos por numero de venta
  async venta(numVenta) {
    // Verificamos si el numero de venta corresponde a una venta existente
    const ventaExiste = await VentaRepository.obtenerPorNumeroVenta(numVenta);

    if (!ventaExiste) {
      throw new Error("El número de venta no existe");
    }

    return ventaExiste;
  },

  // Consultamos todas las ventas
  async ventas() {
    // Verificamos si hay ventas registradas
    const ventas = await VentaRepository.obtenerTodas();
    if (!ventas) {
      throw new Error("No hay ventas registradas");
    }
    return ventas;
  },

  // Consultamos por cliente
  async ventasPorCliente(cedula) {
    //virificamos si el cliente existe
    const clienteExiste = await Cliente.findOne({ cedula });
    if (!clienteExiste) {
      throw new Error("El cliente con esta cedula no existe");
    }

    // Verificamos si el cliente tiene ventas registradas
    const ventas = await VentaRepository.obtenerPorCliente(cedula);

    if (ventas.length === 0) {
      throw new Error("El cliente no tiene ventas registradas");
    }
    return ventas;
  },

  // Consultamos por fecha
  async ventasPorFecha(fecha) {
    return await VentaRepository.obtenerPorFecha(fecha);
  },

  // Consultamos por rango de fechas
  async ventasPorRangoFechas(fechaInicio, fechaFin) {
    return await VentaRepository.obtenerPorRangoFechas(fechaInicio, fechaFin);
  },

  // consultamos por tipo de venta
  async ventasPorTipo(tipo) {
    //Consultamos si exiten ventas de ese tipo
    const ventas = await VentaRepository.obtenerPorTipo(tipo);
    if (ventas.length === 0) {
      throw new Error("No hay ventas de este tipo");
    }
    return ventas;
  },

  // Actualizamos una venta
  async actualizarVenta(numVenta, datosVenta) {
    // Verificamos si la venta existe
    const ventaExiste = await VentaRepository.obtenerPorNumeroVenta(numVenta);
    if (!ventaExiste) {
      throw new Error("La venta no existe");
    }

    return await VentaRepository.actualizar(numVenta, datosVenta);
  },

  // Eliminamos una venta
  async eliminarVenta(numVenta) {
    const ventaExiste = await VentaRepository.obtenerPorNumeroVenta(numVenta);
    if (!ventaExiste) {
      throw new Error("La venta no existe");
    }
    return await VentaRepository.eliminar(numVenta);
  },
};

module.exports = VentaService;
