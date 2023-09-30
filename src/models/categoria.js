const { DataTypes } = require('sequelize')
const { db } = require('../config/DBManager')

const categoria = db.define('categoria',{
    id: {
        type: DataTypes.INTEGER, primaryKey: true, 
        autoIncrement: true, allowNull: false
    },

    nombreCategoria: {
        type: DataTypes.STRING
    }
    
}, {
    tableName:'categoria',
    timestamps: false
})

module.exports = categoria