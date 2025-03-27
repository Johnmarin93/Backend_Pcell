const mongoose = require("mongoose");

const ContadorSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  secuencia: { type: Number, required: true },
});

module.exports = mongoose.model("Contador", ContadorSchema);
