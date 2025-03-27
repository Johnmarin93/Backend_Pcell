const ClienteRepository = require("../infrastructure/repositories/ClienteRepository");

const ClienteService = {
  // Crear un nuevo cliente
  async crearCliente(datos) {
    return await ClienteRepository.crear(datos);
  },

  // Obtener todos los clientes
  async obtenerClientes() {
    const clientes = await ClienteRepository.obtenerTodos();
    if (!clientes) throw new Error("No se encontraron clientes");

    return clientes;
  },

  // Obtener un cliente por cédula
  async obtenerClientePorCedula(cedula) {
    const cliente = await ClienteRepository.obtenerPorCedula(cedula);
    if (!cliente) throw new Error("Cliente no encontrado");
    return cliente;
  },

  //Actualizar un cliente por cédula
  async actualizarCliente(cedula, datos) {
    const cliente = await ClienteRepository.obtenerPorCedula(cedula);
    if (!cliente) throw new Error("Cliente no encontrado");
    return await ClienteRepository.actualizar(cedula, datos);
  },

  //Eliminar un cliente por cédula
  async eliminarCliente(cedula) {
    const cliente = await ClienteRepository.obtenerPorCedula(cedula);
    if (!cliente) throw new Error("Cliente no encontrado");
    return await ClienteRepository.eliminar(cedula);
  },
};

module.exports = ClienteService;
