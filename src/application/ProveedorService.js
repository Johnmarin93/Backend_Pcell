const ProveedorRepository = require("../infrastructure/repositories/ProveedorRepository");

const ProveedorService = {
  // Crear un nuevo proveedor
  async crearProveedor(datos) {
    return await ProveedorRepository.crear(datos);
  },

  // Obtener todos los proveedores
  async obtenerProveedores() {
    const proveedor = await ProveedorRepository.obtenerTodos();
    if (!proveedor) {
      throw new Error("No se encontraron proveedores");
    }
    return proveedor;
  },

  // Obtener un proveedor por NIT o por Nombre
  async buscarProveedor(nit, nombre) {
    return await ProveedorRepository.buscarPorNitONombre(nit, nombre);
  },

  // Actualizar un proveedor por NIT
  async actualizarProveedor(nit, datos) {
    const proveedor = await ProveedorRepository.buscarPorNit(nit);
    if (!proveedor) {
      throw new Error(`El proveedor con NIT "${nit}" no existe.`);
    }
    return await ProveedorRepository.actualizar(nit, datos);
  },

  // Eliminar un proveedor por NIT
  async eliminarProveedor(nit) {
    const proveedor = await ProveedorRepository.buscarPorNit(nit);
    if (!proveedor) {
      throw new Error(`El proveedor con NIT "${nit}" no existe.`);
    }
    return await ProveedorRepository.eliminar(nit);
  },
};

module.exports = ProveedorService;
