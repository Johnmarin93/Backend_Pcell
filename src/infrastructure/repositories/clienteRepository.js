const Cliente = require("../../domain/Cliente");

const ClienteRepository = {
  // Crear un nuevo cliente
  async crear(datos) {
    const cliente = new Cliente(datos);
    return await cliente.save();
  },

  // Obtener todos los clientes
  async obtenerTodos() {
    return await Cliente.find();
  },

  // Obtener un cliente por cédula
  async obtenerPorCedula(cedula) {
    return await Cliente.findOne({ cedula });
  },

  // Actualizar un cliente por cédula
  async actualizar(cedula, datos) {
    return await Cliente.findOneAndUpdate({ cedula }, datos, { new: true });
  },

  // Eliminar un cliente por cédula
  async eliminar(cedula) {
    return await Cliente.findOneAndDelete({ cedula });
  },
};

module.exports = ClienteRepository;
