import Producto from "../models/Producto.js";

class ProductoController{
  static getAllProductos = async (req, res) => {
    const objProducto = new Producto();
    const productos = await objProducto.getAll();
    res.json(productos);
  }
  
  static createProducto = async (req, res) => {
    try {
      const { nombre, descripcion, precio, categoria_id } = req.body;
      const objProducto = new Producto();
      const productos = await objProducto.create(nombre, descripcion, precio, categoria_id);
      res.status(201).json(productos)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static updateProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria_id } = req.body;
    try {
      const objProducto = new Producto();
      const productos = await objProducto.update(nombre, descripcion, precio, categoria_id, id);
      res.status(201).json(productos)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static updateParcialProducto = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    try {
      const objProducto = new Producto();
      const productos = await objProducto.updateParcial(campos, id);
      res.status(201).json(productos)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
      const objProducto = new Producto();
      const productos = await objProducto.delete(id);
      res.status(201).json(productos)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default ProductoController;