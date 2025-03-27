const express = require("express");
const router = express.Router();
const compraService = require("../../application/CompraService");

// Crear una nueva compra
router.post("/", async (req, res) => {
  try {
    const compra = await compraService.crearCompra(req.body);
    res.status(201).json(compra);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Obtener todas las compras
router.get("/", async (req, res) => {
  try {
    const compras = await compraService.obtenerCompras();
    res.json(compras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Obtener compras por fecha
router.get("/fecha/:fecha", async (req, res) => {
  try {
    const compras = await compraService.obtenerComprasPorFecha(
      req.params.fecha
    );
    res.json(compras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Obtener compras por rango de fechas
router.get("/rango-fechas/:fechaInicio/:fechaFin", async (req, res) => {
  try {
    const compras = await compraService.obtenerComprasPorRangoFechas(
      req.params.fechaInicio,
      req.params.fechaFin
    );
    res.json(compras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Obtener compras por nit del proveedor
router.get("/proveedor/:nit", async (req, res) => {
  try {
    const compras = await compraService.obtenerComprasPorProveedor(
      req.params.nit
    );
    res.json(compras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Obtener compras por estado de pago
router.get("/estado/:estadoPago", async (req, res) => {
  try {
    const compras = await compraService.obtenerComprasPorEstadoPago(
      req.params.estadoPago
    );
    res.json(compras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Obtener compra por numero de compra
router.get("/:numCompra", async (req, res) => {
  try {
    const compra = await compraService.obtenerCompraPorNumero(
      req.params.numCompra
    );
    res.json(compra);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar una compra
router.put("/:numCompra", async (req, res) => {
  try {
    const compra = await compraService.actualizarCompra(
      req.params.numCompra,
      req.body
    );
    res.json(compra);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Eliminar una compra
router.delete("/:numCompra", async (req, res) => {
  try {
    const compra = await compraService.eliminarCompra(req.params.numCompra);
    res.json({ message: "Compra eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
