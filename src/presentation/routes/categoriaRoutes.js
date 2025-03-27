const express = require("express");
const router = express.Router();
const CategoriaService = require("../../application/CategoriaService");

// Registrar una categoría
router.post("/", async (req, res) => {
  try {
    const categoria = await CategoriaService.crearCategoria(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const categorias = await CategoriaService.obtenerCategorias();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una categoría por su nombre
router.get("/:nombre", async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const categoria = await CategoriaService.obtenerPorNombre(nombre);
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una categoría por su código
router.put("/:codCategoria", async (req, res) => {
  try {
    const categoriaActualizada = await CategoriaService.actualizarCategoria(
      req.params.codCategoria,
      req.body
    );
    res.json(categoriaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar una categoría por su código
router.delete("/:codCategoria", async (req, res) => {
  try {
    await CategoriaService.eliminarCategoria(req.params.codCategoria);
    res.json({ mensaje: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
