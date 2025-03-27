const Categoria = require("../../domain/categoria");

const CategoriaRepository = {
  //Crear una categoria
  async crear(datos) {
    const categoria = new Categoria(datos); // Crea una nueva categoria
    return await categoria.save(); // Guarda la categoria en la base de datos
  },
  //Obtener todas las categorias
  async obtenerTodas() {
    return await Categoria.find(); // Busca todas las categorias
  },
  //Obtener una categoria por su nombre
  async obtenerPorNombre(nombre) {
    return await Categoria.findOne({
      nombre: {
        $regex: new RegExp(nombre, "i"), // Busca por el nombre sin importar mayusculas y minusculas
      },
    }); //
  },
  //Obtener una categoria por su codigo
  async obtenerPorCodCategoria(codCategoria) {
    return await Categoria.findOne({ codCategoria }); // Busca por codigo de categoria
  },
  //Actualizar una categoria por su codigo
  async actualizarPorCodCategoria(codCategoria, datosActualizados) {
    return await Categoria.findOneAndUpdate(
      { codCategoria: codCategoria }, // Buscar por codCategoria
      datosActualizados, // Nuevos datos
      { new: true } // Devuelve la categoría actualizada
    );
  },
  //Eliminar una categoria por su codigo
  async eliminar(codCategoria) {
    return await Categoria.findOneAndDelete({ codCategoria: codCategoria }); // Elimina por codigo de categoria
  },
};

module.exports = CategoriaRepository;
