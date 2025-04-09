import Categoria from "../models/Categoria";
import Producto from "../models/Producto";

class CategoriasConProductos{
  categoria;
  producto;
  constructor() {
    this.categoria = new Categoria();
    this.producto = new Producto();
  }

  async getCategoriaWithProducto(id) {
    const categoria = await this.categoria.getById(id);
    if(categoria.length > 0){
      const productos = await this.producto.getProductoByCategoriaId(id);
      categoria.productos = productos
      return categoria; 
    }
    return{
      mensaje: "Categoria no encontrada"
    }
  }
}
