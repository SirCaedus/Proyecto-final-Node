const { CatalogoView, Actores } = require('../config/associations.js')
const { Op } = require('sequelize')


const listarActores = async (req,res) => {
    try {
        const actores = await Actores.findAll()

        if(actores.length === 0){
            return res.status(404).json({error: 'no hay actores.'})
        }

        res.json(actores)
    } catch (error) {
        console.error('Error al recuperar a los actores:', error)    
        res.status(500).json({ error: 'error al recuperar a los actores'})
    }
}

const actoresCatalogo = async (req,res) => {
    try {
        const actor = req.params.actor

        const catalogo = await CatalogoView.findAll({
            where: { reparto: {
                [Op.like]: `%${actor}%`
            }}
        })

        if(catalogo.length === 0){
            return res.status(404).json({error: 'objeto no encontrado'})
        }

        res.json(catalogo)
    } catch (error) {
        console.error('Error al recuperar a los actores:', error)    
        res.status(500).json({ error: 'error al recuperar a los actores'})        
    }
}


module.exports = { listarActores, actoresCatalogo }