const { DataTypes } = require('sequelize')
const { db } = require('../config/DBManager')

const catalogoView = db.define('catalogoview',{
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

    categoria: {
        type: DataTypes.STRING  
    },

    generos: {
        type: DataTypes.STRING
    },

    resumen: {
        type: DataTypes.TEXT
    },

    temporadas: {
        type: DataTypes.STRING
    },

    reparto: {
        type: DataTypes.STRING
    },

    trailer: {
        type: DataTypes.STRING
    }

}, {
    tableName:'catalogoView',
    timestamps: false
})

module.exports = catalogoView