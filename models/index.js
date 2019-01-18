module.exports = (Sequelize, config) => {
    const sequelize = new Sequelize(config.db, config.login, config.password, {
        host: config.host,
        dialect: config.dialect,
        define : {
            timestamps : true,
            paranoid : true
        }
    });
    sequelize.authenticate().then(() => {
        console.log('Connection to database successful');
    }).catch((err) => {
        console.log('Unable to connect to database', err);
    });

    const Fleet = require('../models/fleets')(Sequelize, sequelize);
    const Motion = require('../models/motions')(Sequelize, sequelize);
    const Vehicle = require('../models/vehicles')(Sequelize, sequelize);

    Vehicle.hasMany(Fleet, {foreignKey: 'fleetId', sourceKey: 'id'});
    Motion.hasMany(Vehicle, {foreignKey: 'vehicleId', sourceKey: 'id'});

    return {
        Fleet, Motion, Vehicle,
        sequelize: sequelize,
        Sequelize: Sequelize,
    };
};