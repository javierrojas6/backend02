var express = require('express');
var router = express.Router();

router.post('/save', (req, res, next) => {

  const nuevoProducto = {
    nombre: req.query.nombre,
    description: req.query.descripcion,
  };

  models.Product.create(nuevoProducto)
    .then(elNuevoProducto => {
      res.json(elNuevoProducto);
    });
});

module.exports = router;
