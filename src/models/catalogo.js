const { DataTypes } = require('sequelize')
const { db } = require('../config/DBManager')
const { categoria } = require('./categoria.js')

const catalogo = db.define('catalogo',{
    id: {
        type: DataTypes.INTEGER, primaryKey: true, 
        autoIncrement: true, allowNull: false
    },

    poster: {
        type: DataTypes.STRING
    },

    titulo: {
        type: DataTypes.STRING
    },

    idCategoria: {
        type: DataTypes.INTEGER,
        references: {
            model: categoria,
            key: 'id'
        }
    },

    resumen: {
        type: DataTypes.TEXT
    },

    temporadas: {
        type: DataTypes.INTEGER
    },

    trailer: {
        type: DataTypes.STRING
    }

}, {
    tableName:'catalogo',
    timestamps: false
})

module.exports = catalogo
