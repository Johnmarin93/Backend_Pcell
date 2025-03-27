const ProductoRepository = require("../infrastructure/repositories/productoRepository");
const CategoriaRepository = require("../infrastructure/repositories/categoriaRepository");

const ProductoService = {
  // Crear un nuevo producto
  async crearProducto(datos) {
    // Verificar si la categoría existe
    const categoriaExistente = await CategoriaRepository.obtenerPorCodCategoria(
      datos.categoria
    );
    if (!categoriaExistente) {
      throw new Error("La categoría especificada no existe");
    }
    return await ProductoRepository.crear(datos);
  },

  // Obtener todos los productos
  async obtenerProductos() {
    const producto = await ProductoRepository.obtenerTodos();
    if (!producto) {
      throw new Error("No se encontraron productos");
    }
    return producto;
  },

  // Obtener un producto por código
  async obtenerProductoPorCodigo(codigo) {
    const producto = await ProductoRepository.obtenerPorCodigo(codigo);
    if (!producto) {
      throw new Error(`No se encontró el producto con código "${codigo}".`);
    }
    return producto;
  },

  // Obtener un producto por nombre
  async obtenerPorNombre(nombre) {
    const producto = await ProductoRepository.obtenerPorNombre(nombre);
    if (!producto) {
      throw new Error(`No se encontró el producto con nombre "${nombre}".`);
    }
    return producto;
  },

  // Actualizar un producto por código
  async actualizarProducto(codigo, datos) {
    if (datos.categoria) {
      const categoriaExistente =
        await CategoriaRepository.obtenerPorCodCategoria(datos.categoria);
      if (!categoriaExistente) {
        throw new Error("El producto especificada no existe");
      }
    }
    return await ProductoRepository.actualizar(codigo, datos);
  },

  // Eliminar un producto por código
  async eliminarProducto(codigo) {
    const producto = await ProductoRepository.obtenerPorCodigo(codigo);
    if (!producto) {
      throw new Error(`El producto con código "${codigo}" no existe.`);
    }
    return await ProductoRepository.eliminar(codigo);
  },

  // Aumentar el stock de un producto
  async aumentarStock(codigo, cantidad) {
    return await ProductoRepository.aumentarStock(codigo, cantidad);
  },

  // R
  async reducirStock(codigo, cantidad) {
    return await ProductoRepository.reducirStock(codigo, cantidad);
  },
};

module.exports = ProductoService;
