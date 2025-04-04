import express from "express";
import CategoriaController from "../controller/CategoriaController.js";
import { validarCategoria } from "../middlewares/validarCategoria.js";


const router = express.Router();

router.get('/', CategoriaController.getAllCategorias);

router.get('/:id', CategoriaController.getCategoria);

router.post('/', validarCategoria, CategoriaController.createCategoria);

router.put('/:id', CategoriaController.updateCategoria);

router.patch('/:id', CategoriaController.updateParcialCategoria);

router.delete('/:id', CategoriaController.deleteCategoria);

router.put('/:id', (req, res) => {
  console.log(req.body);
});

export default router;
