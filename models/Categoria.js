import connection from "../utils/db.js";

class Categoria{
  constructor(nombre, descripcion) {
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
  /**
   * Metodo para obtener los registros de la base de datos
   * @returns {Array} Listado de las categorias de un arreglo.
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM categorias");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener las categorías.")
    }
  }

  async create() {
    try {
      const [result] = await connection.query("INSERT INTO categorias(nombre, descripcion) values (?,?)", [this.nombre, this.descripcion]);
      return {
        id: result.id,
        nombre: this.nombre,
        descripcion: this.descripcion
      }
    } catch (error) {
      throw new Error("Error al crear la categoria.")
    }
  }
}

export default Categoria;