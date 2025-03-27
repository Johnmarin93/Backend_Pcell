const mongoose = require("mongoose");

const CategoriaSchema = new mongoose.Schema({
  codCategoria: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
  },
});

module.exports = mongoose.model("Categoria", CategoriaSchema);
