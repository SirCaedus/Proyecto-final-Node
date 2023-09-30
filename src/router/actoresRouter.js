const express = require('express')
const router = express.Router()
const actoresController = require('../controllers/actoresController')

//rutas del catalogo
router.get('/actores', actoresController.listarActores)
router.get('/actores/:actor', actoresController.actoresCatalogo)

module.exports = router