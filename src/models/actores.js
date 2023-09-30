const { DataTypes } = require('sequelize')
const { db } = require('../config/DBManager')

const actores = db.define('actores',{
    id: {
        type: DataTypes.INTEGER, primaryKey: true, 
        autoIncrement: true, allowNull: false
    },

    nombreActor: {
        type: DataTypes.STRING
    }
    
}, {
    tableName:'actores',
    timestamps: false
})

module.exports = actores