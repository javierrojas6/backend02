/* global passport, __dirname, locale */

let express = require('express'),
    router = express.Router(),
    path = require('path'),
    thumbnail = require('../modules/thumbnail'),
    fileUtils = require('../modules/fileUtils');

/**
 * @description router para cargar todos los archivos, por defecto todos los
 *  archivos son privados y con permisos de solo lectura y seran de imposible
 *  acceso ya que su nombre sera creado al azar y sin extension, esto por
 *  razones de seguridad para que no sean cargados archivos con scripts
 *  potencialmente peligrosos, para los archivos que seran publicos se
 *  debe especificar explicitamente que son publicos y en ese caso su
 *  extension se conservara.
 * */
router.post('/upload', (req, res, next) => {
    //TODO(LookApp): falta agregar el control de autenticacion, pero se deben cambiar las pruebas tambien
    console.log('router.file.upload');
    console.log(req.files);
   
});

//router.get('/private/*', (req, res, next) => {
router.get(config.validate.thumbnailUrl, (req, res, next) => {
    console.log('router.file.private');
    let filename = false;
    let uri = req.params[3];
    let options = {
        root: config.application.systemPath,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var result = /\/(\w+)$/.exec(uri);

    filename = result[1] ? result[1] : false;
    if (filename)
        models.File
            .findOne({ where: { filename: filename } })
            .then(file => {
                if (file) {
                    options.headers['Content-Type'] = file.mime;
                    options.headers['Content-Disposition'] = `inline; filename="${file.originalName}"`;
                    options.headers['maxAge'] = '15d';

                    //verifica el thumbnail, si no existe lo genera
                    thumbnail.check(req.url)
                        .then(thumbnail => {
                            let imagePath = `/${config.uploads.defaultPrivateFolder}/${thumbnail.filepath}`;

                            res.sendFile(imagePath, options, function (err) {
                                if (err) {
                                    res.locals.message = sprintf(locale.file.notExistFile, { filename: req.url });
                                    res.locals.error = {};
                                    res.locals.error.status = sprintf(locale.file.notExistFile, { filename: req.url });
                                    res.locals.error.stack = "";
                                    res.status(400);
                                    res.render('error');
                                }
                            });
                        })
                        .catch(m => {
                            res.locals.message = sprintf(locale.file.notExistFile, { filename: req.url });
                            res.locals.error = {};
                            res.locals.error.status = sprintf(locale.file.notExistFile, { filename: req.url });
                            res.locals.error.stack = "";
                            res.status(400);
                            res.render('error');
                        });
                } else {
                    res.locals.message = sprintf(locale.file.notExistFile, { filename: req.url });
                    res.locals.error = {};
                    res.locals.error.status = sprintf(locale.file.notExistFile, { filename: req.url });
                    res.locals.error.stack = "";
                    res.status(400);
                    res.render('error');
                }
            });
    else {
        res.locals.message = sprintf(locale.file.notExistFile, { filename: req.url });
        res.locals.error = {};
        res.locals.error.status = sprintf(locale.file.notExistFile, { filename: req.url });
        res.locals.error.stack = "";
        res.status(400);
        res.render('error');
    }
});

module.exports = router;