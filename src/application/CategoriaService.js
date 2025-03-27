const CategoriaRepository = require("../infrastructure/repositories/categoriaRepository");

const CategoriaService = {
  //Crear una categoria
  async crearCategoria(datos) {
    return await CategoriaRepository.crear(datos);
  },

  //Obtener todas las categorias
  async obtenerCategorias() {
    const categoria = await CategoriaRepository.obtenerTodas();
    if (!categoria) {
      throw new Error("No se encontraron categorías");
    }
    return categoria;
  },

  //Obtener una categoria por su nombre
  async obtenerPorNombre(nombre) {
    const categoria = await CategoriaRepository.obtenerPorNombre(nombre);
    if (!categoria) {
      throw new Error(`No se encontró la categoría con nombre "${nombre}".`);
    }
    return categoria;
  },

  //Obtener una categoria por su codigo
  async obtenerPorCodCategoria(codCategoria) {
    const categoria = await CategoriaRepository.obtenerPorCodCategoria(
      codCategoria
    );
    if (!categoria) {
      throw new Error(
        `No se encontró la categoría con código "${codCategoria}".`
      );
    }
    return categoria;
  },

  //Actualizar una categoria por su codigo
  async actualizarCategoria(codCategoria, datosActualizados) {
    const categoria = await CategoriaRepository.obtenerPorCodCategoria(
      codCategoria
    );
    if (!categoria) {
      throw new Error(
        `No se encontró la categoría con código "${codCategoria}".`
      );
    }
    return await CategoriaRepository.actualizarPorCodCategoria(
      codCategoria,
      datosActualizados
    );
  },

  //Eliminar una categoria por su codigo
  async eliminarCategoria(codCategoria) {
    const categoria = await CategoriaRepository.obtenerPorCodCategoria(
      codCategoria
    );
    if (!categoria) {
      throw new Error(
        `No se encontró la categoría con código "${codCategoria}".`
      );
    }
    return await CategoriaRepository.eliminar(codCategoria);
  },
};

module.exports = CategoriaService;
