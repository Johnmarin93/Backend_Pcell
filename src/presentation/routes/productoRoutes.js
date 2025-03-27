const express = require("express");
const router = express.Router();
const ProductoService = require("../../application/ProductoService");

// Crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    const producto = await ProductoService.crearProducto(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await ProductoService.obtenerProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un producto por nombre
router.get("/:nombre", async (req, res) => {
  try {
    const producto = await ProductoService.obtenerPorNombre(req.params.nombre);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un producto por código
router.put("/:codigo", async (req, res) => {
  try {
    const productoActualizado = await ProductoService.actualizarProducto(
      req.params.codigo,
      req.body
    );
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un producto por código
router.delete("/:codigo", async (req, res) => {
  try {
    const productoEliminado = await ProductoService.eliminarProducto(
      req.params.codigo
    );
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
