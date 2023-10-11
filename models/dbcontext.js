const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('testdb','root','celil123',{
    host:'localhost',
    dialect:'mysql'
})


try {
    sequelize.authenticate();
    console.log("başarili");
} catch (error) {
    console.log("başarisiz",error);
}

module.exports = sequelize;