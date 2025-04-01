import express from "express";
import ProductoController from "../controller/ProductoController.js";


const router = express.Router();

router.get('/', ProductoController.getAllProductos);


router.post('/', ProductoController.createProducto);

router.put('/:id', (req, res) => {
  console.log(req.body);
});

export default router;