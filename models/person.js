const { DataTypes } = require('sequelize')
const sequelize = require('./dbcontext')


const person = sequelize.define('person',{
    name:DataTypes.STRING,
    lastname:DataTypes.STRING
})

module.exports = person;
