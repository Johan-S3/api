import Categoria from "../models/Categoria.js";
import CategoriasConProductos from "../services/CategoriaConProductos.js";

class CategoriaController {
  static getAllCategorias = async (req, res) => {
    const objCategoria = new Categoria();
    const categorias = await objCategoria.getAll();
    res.json(categorias);
  }

  static getCategoria = async (req, res) => {
    const { id } = req.params;
    const objServicio = new CategoriasConProductos();
    const categoriasConProductos = await objServicio.getCategoriaWithProducto(id);
    res.json(categoriasConProductos);
  }

  static createCategoria = async (req, res) => {
    try {
      const { nombre, descripcion } = req.body;
      const objCategoria = new Categoria();
      const categorias = await objCategoria.create(nombre, descripcion);
      res.status(201).json(categorias)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static updateCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    try {
      const objCategoria = new Categoria();
      const categorias = await objCategoria.update(nombre, descripcion, id);
      res.status(201).json(categorias)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static updateParcialCategoria = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    try {
      const objCategoria = new Categoria();
      const categorias = await objCategoria.updateParcial(campos, id);
      res.status(201).json(categorias)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static deleteCategoria = async (req, res) => {
    const { id } = req.params;
    try {
      const objCategoria = new Categoria();
      const categorias = await objCategoria.delete(id);
      res.status(201).json(categorias)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default CategoriaController;