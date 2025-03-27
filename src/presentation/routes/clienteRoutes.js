const express = require("express");
const router = express.Router();
const ClienteService = require("../../application/ClienteService");

// Crear un nuevo cliente
router.post("/", async (req, res) => {
  try {
    const cliente = await ClienteService.crearCliente(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los clientes
router.get("/", async (req, res) => {
  try {
    const clientes = await ClienteService.obtenerClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un cliente por cédula
router.get("/:cedula", async (req, res) => {
  try {
    const cliente = await ClienteService.obtenerClientePorCedula(
      req.params.cedula
    );
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un cliente por cédula
router.put("/:cedula", async (req, res) => {
  try {
    const clienteActualizado = await ClienteService.actualizarCliente(
      req.params.cedula,
      req.body
    );
    res.json(clienteActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un cliente por cédula
router.delete("/:cedula", async (req, res) => {
  try {
    const clienteEliminado = await ClienteService.eliminarCliente(
      req.params.cedula
    );
    res.json({ mensaje: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
