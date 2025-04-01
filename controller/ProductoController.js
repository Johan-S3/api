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
      const objProducto = new Producto(nombre, descripcion, precio, categoria_id);
      const productos = await objProducto.create();
      res.status(201).json(productos)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    
  }
}

export default ProductoController;