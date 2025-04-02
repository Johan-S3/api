export const validarCategoria = (req, res, next) => {
  const { nombre, descripcion } = req.body;

  if (!nombre.trim()) return res.status(400).json({ mensaje: "El nombre en la categoria es obligatorio." });
  if (!descripcion.trim()) return res.status(400).json({ mensaje: "La descripción en la categoria es obligatorio." });
  if (nombre.length > 255) return res.status(400).json({ mensaje: "El nombre se pasa de los caracteres permitidos." })

  next();
}