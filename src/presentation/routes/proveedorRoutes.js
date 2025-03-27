const express = require("express");
const router = express.Router();
const ProveedorService = require("../../application/ProveedorService");

// Crear un nuevo proveedor
router.post("/", async (req, res) => {
  try {
    const proveedor = await ProveedorService.crearProveedor(req.body);
    res.status(201).json(proveedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los proveedores
router.get("/", async (req, res) => {
  try {
    const proveedores = await ProveedorService.obtenerProveedores();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un proveedor por NIT o por Nombre
router.get("/buscar", async (req, res) => {
  try {
    const { nit, nombre } = req.query; // Obtener los parámetros de la URL

    if (!nit && !nombre) {
      return res
        .status(400)
        .json({ mensaje: "Debe proporcionar NIT o Nombre para buscar" });
    }
    const proveedor = await ProveedorService.buscarProveedor(nit, nombre);
    if (!proveedor) {
      return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    }
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un proveedor por NIT
router.put("/:nit", async (req, res) => {
  try {
    const proveedorActualizado = await ProveedorService.actualizarProveedor(
      req.params.nit,
      req.body
    );
    res.json(proveedorActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un proveedor por NIT
router.delete("/:nit", async (req, res) => {
  try {
    const proveedorEliminado = await ProveedorService.eliminarProveedor(
      req.params.nit
    );
    res.json({ mensaje: "Proveedor eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
