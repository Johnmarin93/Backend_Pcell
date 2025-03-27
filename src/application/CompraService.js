const compraRepository = require("../infrastructure/repositories/compraRepository");
const Proveedor = require("../domain/proveedor");
const Producto = require("../domain/producto");

class CompraService {
  async crearCompra(data) {
    const { proveedor, productos } = data;

    // Verificar si el proveedor existe
    const proveedorExiste = await Proveedor.findOne({ nit: proveedor });
    if (!proveedorExiste) {
      throw new Error("El proveedor con este NIT no existe.");
    }

    // Verificar si los productos existen y actualizar stock
    for (let item of productos) {
      const productoExiste = await Producto.findOne({ codigo: item.codigo });
      if (!productoExiste) {
        throw new Error(`El producto con código ${item.codigo} no existe.`);
      }
      item.nombreProducto = productoExiste.nombre;

      // Sumar la cantidad comprada al stock existente
      productoExiste.stock += item.cantidad;
      await productoExiste.save();
    }

    return await compraRepository.crear(data);
  }
  //Obtienie todas las compras
  async obtenerCompras() {
    const compras = await compraRepository.obtenerTodas();
    if (!compras) {
      throw new Error("No hay compras registradas.");
    }
    return compras;
  }

  //Obtiene las compras por fecha
  async obtenerComprasPorFecha(fecha) {
    const compra = await compraRepository.obtenerPorFecha(fecha);
    if (!compra) {
      throw new Error("No hay compras registradas en esta fecha.");
    }
    return compra;
  }

  //Obtiene las compras por rango de fechas
  async obtenerComprasPorRangoFechas(fechaInicio, fechaFin) {
    const compra = await compraRepository.obtenerPorRangoFechas(
      fechaInicio,
      fechaFin
    );
    if (!compra) {
      throw new Error("No hay compras registradas en este rango de fechas.");
    }
    return compra;
  }

  //Obtiene las compras por proveedor
  async obtenerComprasPorProveedor(nit) {
    const compra = await compraRepository.obtenerPorProveedor(nit);
    if (!compra) {
      throw new Error("El proveedor no tiene Compras.");
    }
    return compra;
  }

  //Obtiene las compras por estado de pago
  async obtenerComprasPorEstadoPago(estadoPago) {
    return await compraRepository.obtenerPorEstadoPago(estadoPago);
  }

  //Obtiene la compra por número
  async obtenerCompraPorNumero(numCompra) {
    const compra = await compraRepository.obtenerPorNumero(numCompra);
    if (!compra) {
      throw new Error("La compra no existe.");
    }
    return compra;
  }

  //Actualiza la compra
  async actualizarCompra(numCompra, data) {
    const compra = await compraRepository.obtenerPorNumero(numCompra);
    if (!compra) {
      throw new Error("La compra no existe.");
    }
    return await compraRepository.actualizar(numCompra, data);
  }

  // Elimina la compra
  async eliminarCompra(numCompra) {
    const compra = await compraRepository.obtenerPorNumero(numCompra);
    if (!compra) {
      throw new Error("La compra no existe.");
    }
    return await compraRepository.eliminar(numCompra);
  }
}

module.exports = new CompraService();
