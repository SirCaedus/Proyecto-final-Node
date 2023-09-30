const { DataTypes } = require('sequelize')
const { db } = require('../config/DBManager')
const { catalogo } = require('./catalogo.js')
const { actores } = require('./actores.js')

const contenidoActores = db.define('contenidoActores',{
    id: {
        type: DataTypes.INTEGER, primaryKey: true, 
        autoIncrement: true, allowNull: false
    },

    idCatalogo: {
        type: DataTypes.INTEGER,
        references: {
            model: catalogo,
            key: 'id'
        }
    },

    idActor: {
        type: DataTypes.INTEGER,
        references: {
            model: actores,
            key: 'id'
        }      
    }
    
}, {
    tableName:'contenidoActores',
    timestamps: false
})

module.exports = contenidoActores