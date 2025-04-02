import connection from "../utils/db.js";

class Categoria {
  // constructor(nombre, descripcion) {
  //   this.nombre = nombre;
  //   this.descripcion = descripcion;
  // }
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

  async create(nombre, descripcion) {
    try {
      const [result] = await connection.query("INSERT INTO categorias(nombre, descripcion) values (?,?)", [nombre, descripcion]);
      return {
        id: result.id,
        nombre,
        descripcion
      }
    } catch (error) {
      throw new Error("Error al crear la categoria.")
    }
  }

  async update(nombre, descripcion, id) {
    try {
      const [result] = await connection.query("UPDATE categorias SET nombre = ?,  descripcion = ? WHERE id = ?", [nombre, descripcion, id]);
      if (result.effectedRows === 0) throw new Error("Categoria no encontrada");
      return {
        id,
        nombre,
        descripcion
      }
    } catch (error) {
      throw new Error("Error al actualizar la categoria")
    }
  }

  async updateParcial(campos, id) {
    try {
      let sql = "UPDATE categorias SET "
      for (let i = 0; i < Object.keys(campos).length; i++) {
        let key = Object.keys(campos)[i];
        sql += `${key} = "${campos[key]}"`;
        if (i != Object.keys(campos).length - 1) sql += ", ";
      }
      sql += ` WHERE id = ${id}`

      const [result] = await connection.query(sql);
      if (result.effectedRows === 0) throw new Error("Categoria no encontrada");
      return {
        mensaje: "Categoria actualizada"
      }
    } catch (error) {
      throw new Error("Error al actualizar la categoria")
    }
  }
}

export default Categoria;