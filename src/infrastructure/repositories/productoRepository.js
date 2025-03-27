const Producto = require("../../domain/producto");
const Categoria = require("../../domain/categoria");

const ProductoRepository = {
  // Crear un nuevo producto
  async crear(datos) {
    // Verificar si la categoría existe por codCategoria
    const categoria = await Categoria.findOne({
      codCategoria: datos.categoria,
    });

    if (!categoria) {
      throw new Error(
        `La categoría con código "${datos.categoria}" no existe.`
      );
    }

    // Asignar codCategoria en lugar de ObjectId
    datos.categoria = categoria.codCategoria;

    const nuevoProducto = new Producto(datos);
    return await nuevoProducto.save();
  },

  // Obtener todos los productos
  async obtenerTodos() {
    return await Producto.find().populate("categoria");
  },

  // Obtener un producto por código
  async obtenerPorCodigo(Codigo) {
    return await Producto.findOne({ codigo: Codigo });
  },

  // Obtener un producto por nombre
  async obtenerPorNombre(nombre) {
    const normalizar = (texto) =>
      texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return await Producto.findOne({
      nombre: {
        $regex: new RegExp(normalizar(nombre), "i"), // Ignora mayúsculas, minúsculas y tildes
      },
    });
  },

  // Actualizar un producto por código
  async actualizar(codigo, datos) {
    return await Producto.findOneAndUpdate({ codigo }, datos, {
      new: true,
    }).populate("categoria");
  },

  // Eliminar un producto por código
  async eliminar(codigo) {
    return await Producto.findOneAndDelete({ codigo });
  },

  // Aumentar el stock de un producto
  async aumentarStock(id, cantidad) {
    return await Producto.findByIdAndUpdate(
      id,
      { $inc: { stock: cantidad } },
      { new: true }
    );
  },

  // Reducir el stock de un producto
  async reducirStock(id, cantidad) {
    return await Producto.findByIdAndUpdate(
      id,
      { $inc: { stock: -cantidad } },
      { new: true }
    );
  },
};

module.exports = ProductoRepository;
