const Proveedor = require("../../domain/proveedor");

const ProveedorRepository = {
  // Crear un nuevo proveedor
  async crear(datos) {
    const proveedor = new Proveedor(datos);
    return await proveedor.save();
  },

  // Obtener todos los proveedores
  async obtenerTodos() {
    return await Proveedor.find();
  },

  // Obtener un proveedor por NIT o Nombre
  async buscarPorNitONombre(nit, nombre) {
    let query = {};

    if (nit) {
      query.nit = nit;
    } else if (nombre) {
      query.nombre = { $regex: new RegExp(nombre, "i") }; // Búsqueda insensible a mayúsculas y minúsculas
    }
    return await Proveedor.findOne(query);
  },

  // Actualizar un proveedor por NIT
  async actualizar(nit, datos) {
    return await Proveedor.findOneAndUpdate({ nit: nit }, datos, { new: true });
  },

  // Eliminar un proveedor por NIT
  async eliminar(nit) {
    return await Proveedor.findOneAndDelete({ nit: nit });
  },
};

module.exports = ProveedorRepository;
