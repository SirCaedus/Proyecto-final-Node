const { CatalogoView } = require('../config/associations.js')
const { Op } = require('sequelize')


const listarCatalogo = async (req,res) => {
    try {
        const catalogo = await CatalogoView.findAll()

        if(catalogo.length === 0){
            return res.status(404).json({error: 'no hay catalogo.'})
        }

        catalogo.forEach(titulo => {
            if(titulo.temporadas === null){
                titulo.temporadas = "N/A"
            }           
        })

        res.json(catalogo)
    } catch (error) {
        console.error('Error al recuperar el catalogo:', error)    
        res.status(500).json({ error: 'error al recuperar el catalogo'})
    }
}

const obtenerCodigo = async (req,res) => {
    const id = req.params.id
    try {
        const catalogo = await CatalogoView.findByPk(id)

        if(catalogo.length === 0){
            return res.status(404).json({error: 'objeto no encontrado'})
        }

        if(catalogo.temporadas === null){
            catalogo.temporadas = "N/A"
        }

        res.json(catalogo)
    } catch (error) {
        console.error('Error al recuperar el objeto del catalogo:', error)    
        res.status(500).json({ error: 'error al recuperar el objeto del catalogo'})       
    }
}

const obtenerTitulo = async (req,res) => {
    const titulo = req.params.titulo
    try {
        const catalogo = await CatalogoView.findAll({
            where: { titulo: {
                [Op.like]: `%${titulo}%`
            }}
        })

        if(catalogo.length === 0){
            return res.status(404).json({error: 'objeto no encontrado'})
        }

        catalogo.forEach(titulo => {
            if(titulo.temporadas === null){
                titulo.temporadas = "N/A"
            }           
        })
        
        res.json(catalogo)
    } catch (error) {
        console.error('Error al recuperar el objeto del catalogo:', error)    
        res.status(500).json({ error: 'error al recuperar el objeto del catalogo'})       
    }    
}

const obtenerGenero = async (req,res) => {
    const genero = req.params.genero
    try {
        const catalogo = await CatalogoView.findAll({
            where: {generos: {
                [Op.like]: `%${genero}%`
            }}
        })

        if(catalogo.length === 0){
            return res.status(404).json({error: 'objeto no encontrado'})
        }

        catalogo.forEach(titulo => {
            if(titulo.temporadas === null){
                titulo.temporadas = "N/A"
            }           
        })

        res.json(catalogo)
    } catch (error) {
        console.error('Error al recuperar el objeto del catalogo:', error)    
        res.status(500).json({ error: 'error al recuperar el objeto del catalogo'})       
    } 
}

const obtenerCategoria = async (req,res) => {
    const categoria = req.params.categoria
    try {
        const catalogo = await CatalogoView.findAll({
            where: {categoria: {
                [Op.like]: `%${categoria}%`
            }}
        })

        if(catalogo.length === 0){
            return res.status(404).json({error: 'objeto no encontrado'})
        }

        res.json(catalogo)
    } catch (error) {
        console.error('Error al recuperar el objeto del catalogo:', error)    
        res.status(500).json({ error: 'error al recuperar el objeto del catalogo'})       
    } 
}

module.exports = {
    listarCatalogo,
    obtenerCodigo,
    obtenerTitulo,
    obtenerGenero,
    obtenerCategoria
}