const express = require("express");
const VentaService = require("../../application/VentaService");

const router = express.Router();

// Registrar una venta
router.post("/", async (req, res) => {
  try {
    const venta = await VentaService.registrarVenta(req.body);
    res.status(201).json(venta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener una venta por número de venta
router.get("/:numVenta", async (req, res) => {
  try {
    const venta = await VentaService.venta(req.params.numVenta);
    res.json(venta);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Obtener todas las ventas
router.get("/", async (req, res) => {
  try {
    const ventas = await VentaService.ventas();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener ventas por cliente
router.get("/cliente/:cedula", async (req, res) => {
  try {
    const ventas = await VentaService.ventasPorCliente(req.params.cedula);
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener ventas por fecha
router.get("/fecha/:fecha", async (req, res) => {
  try {
    const ventas = await VentaService.ventasPorFecha(req.params.fecha);
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener ventas por rango de fechas
router.get("/rango-fechas/:fechaInicio/:fechaFin", async (req, res) => {
  try {
    const ventas = await VentaService.ventasPorRangoFechas(
      req.params.fechaInicio,
      req.params.fechaFin
    );
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener ventas por tipo de venta
router.get("/tipo/:tipo", async (req, res) => {
  try {
    const ventas = await VentaService.ventasPorTipo(req.params.tipo);
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizamos una venta por numero de Venta
router.put("/:numVenta", async (req, res) => {
  try {
    const venta = await VentaService.actualizarVenta(
      req.params.numVenta,
      req.body
    );
    res.json(venta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminamos una venta por numero de Venta
router.delete("/:numVenta", async (req, res) => {
  try {
    await VentaService.eliminarVenta(req.params.numVenta);
    res.status(404).json({ mensaje: "Venta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
