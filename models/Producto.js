import connection from "../utils/db.js";

class Producto{
  // constructor(nombre, descripcion, precio, categoria_id) {
  //   this.nombre = nombre;
  //   this.descripcion = descripcion;
  //   this.precio = precio;
  //   this.categoria_id = categoria_id;
  // }
  /**
   * Metodo para obtener los registros de la base de datos
   * @returns {Array} Listado de las categorias de un arreglo.
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM productos");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los productos.")
    }
  }

  /**
   * Metodo para obtener los productos relacionados con la id de la categoria recibida como parametro
   * @param {} id 
   * @returns {Array} Listo de los productos relacionados con esa categoria o un arreglo vacio si no se encuentran productos relacionados.
   */
  async getProductoByCategoriaId(id) {
    try {
      const [productos] = await connection.query("SELECT * from productos WHERE categoria_id = ?", [id]);
      return productos;
    } catch (error) {
      throw new Error("Error al obtener los productos.")
    }
  }

  async create(nombre, descripcion, precio, categoria_id) {
    try {
      const [result] = await connection.query("INSERT INTO productos(nombre, descripcion, precio, categoria_id) values (?,?,?,?)", [nombre, descripcion, precio, categoria_id]);
      return {
        id: result.id,
        nombre,
        descripcion,
        precio,
        categoria_id
      }
    } catch (error) {
      throw new Error("Error al crear el producto.")
    }
  }

  async update(nombre, descripcion, precio, categoria_id, id) {
    try {
      const [result] = await connection.query("UPDATE productos SET nombre = ?,  descripcion = ?, precio = ?, categoria_id = ? WHERE id = ?", [nombre, descripcion, precio, categoria_id, id]);
      if (result.affectedRows  === 0) {
        return{
          mensaje: "Producto no encontrado"
        }
      }
      return {
        id,
        nombre,
        descripcion,
        precio,
        categoria_id
      }
    } catch (error) {
      throw new Error("Error al actualizar el producto")
    }
  }

  async updateParcial(campos, id) {
    try {
      let sql = "UPDATE productos SET "
      for (let i = 0; i < Object.keys(campos).length; i++) {
        let key = Object.keys(campos)[i];
        sql += `${key} = "${campos[key]}"`;
        if (i != Object.keys(campos).length - 1) sql += ", ";
      }
      sql += ` WHERE id = ${id}`

      const [result] = await connection.query(sql);
      if (result.affectedRows  === 0) {
        return{
          mensaje: "Producto no encontrado"
        }
      }
      return {
        mensaje: "Producto actualizado"
      }
    } catch (error) {
      throw new Error("Error al actualizar el producto")
    }
  }

  async delete(id){
    try {
      const [result] = await connection.query("DELETE FROM productos WHERE id = ?", [id]);
      if (result.affectedRows  === 0){
        return {
          mensaje: "Producto no encontrado"
        }
      }
      return {
        mensaje: "Producto eliminado"
      }
    } catch (error) {
      throw new Error("Error al eliminar el producto");
    }
  }
}

export default Producto;