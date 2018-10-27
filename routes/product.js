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

router.put('/save/:id', (req, res, next) => {
  console.log(req.params.id);
  models.Product.findOne({
    where: { id: req.params.id }
  }).then(product => {
    product.nombre = req.query.nombre;
    product.description = req.query.description;

    product.save()
      .then(p => {
        res.json(p);
      })
  });
});

module.exports = router;
