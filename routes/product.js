var express = require('express');
var router = express.Router();
var object = require('../modules/objectsAndTypes');

router.post('/save', (req, res, next) => {
  object.save([
    'nombre',
    'description'
  ], req.query, 'Product')
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.put('/save/:id', (req, res, next) => {
  let values = req.query;
  values.id = req.params.id;
  object.update([
    'nombre',
    'description'
  ], values, 'Product')
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

module.exports = router;
