const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Conexión a la base de datos
connectDB();
// Habilitar express.json
app.use(express.json());

// Rutas
app.use("/api/categorias", require("./presentation/routes/categoriaRoutes"));
app.use("/api/clientes", require("./presentation/routes/clienteRoutes"));
app.use("/api/compras", require("./presentation/routes/compraRoutes"));
app.use("/api/productos", require("./presentation/routes/productoRoutes"));
app.use("/api/proveedores", require("./presentation/routes/proveedorRoutes"));
app.use("/api/ventas", require("./presentation/routes/ventaRoutes"));

// Puerto
app.listen(process.env.PORT, () =>
  console.log("Servidor corriendo en puerto 4000")
);
