const { DataTypes } = require('sequelize')
const { db } = require('../config/DBManager')

const generos = db.define('generos',{
    id: {
        type: DataTypes.INTEGER, primaryKey: true, 
        autoIncrement: true, allowNull: false
    },

    nombreGenero: {
        type: DataTypes.STRING
    }
    
}, {
    tableName:'generos',
    timestamps: false
})

module.exports = generos