module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Privilege', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        privilegeName: {
            type: DataTypes.STRING,
        },
    })
}