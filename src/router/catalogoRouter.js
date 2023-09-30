const express = require('express')
const router = express.Router()
const catalogoController = require('../controllers/catalogoController')

//rutas del catalogo
router.get('/catalogo', catalogoController.listarCatalogo)
router.get('/catalogo/:id', catalogoController.obtenerCodigo)
router.get('/catalogo/titulo/:titulo', catalogoController.obtenerTitulo)
router.get('/catalogo/genero/:genero', catalogoController.obtenerGenero)
router.get('/catalogo/categoria/:categoria', catalogoController.obtenerCategoria)

module.exports = router