const { DataTypes } = require('sequelize')
const { db } = require('../config/DBManager')
const { catalogo } = require('./catalogo.js')
const { genero } = require('./generos.js')

const contenidoGeneros = db.define('contenidoGeneros',{
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

    idGenero: {
        type: DataTypes.INTEGER,
        references: {
            model: genero,
            key: 'id'
        }      
    }
    
}, {
    tableName:'contenidoGeneros',
    timestamps: false
})

module.exports = contenidoGeneros