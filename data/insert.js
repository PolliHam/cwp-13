module.exports = async function (db) {
    await db.sequelize.sync({force: true});
    return Promise.all([
        db.Fleet.create({
            name: "Первый машинный парк"
        }),
        db.Fleet.create({
            name: "Второй машинный парк"
        }),
        db.Vehicle.create({
            name: "Первая машина",
            fleetId: 1
        }),
        db.Vehicle.create({
            name: "Вторая машина",
            fleetId: 1
        }),
        db.Vehicle.create({
            name: "Третья машина",
            fleetId: 1
        }),
        db.Vehicle.create({
            name: "Четвертая машина",
            fleetId: 2
        }),
        db.Vehicle.create({
            name: "Пятая машина",
            fleetId: 2
        }),
        db.Vehicle.create({
            name: "Шестая машина",
            fleetId: 2
        }),
        db.Motion.create({
            latitude: 51.5103,
            longitude: 7.49347,
            time: "2018-10-05T15:26:56.000Z",
            vehicleId: 1
        }),
        db.Motion.create({
            latitude: 59.1432,
            longitude: 49.1432,
            time: "2018-10-05T15:56:56.000Z",
            vehicleId: 1
        }),
        db.Motion.create({
            latitude: 121.5103,
            longitude: 71.49347,
            time: "2018-10-05T16:04:00.000Z",
            vehicleId: 1
        }),
        db.Motion.create({
            latitude: 151.5103,
            longitude: 117.49347,
            time: "2018-10-05T17:11:12.000Z",
            vehicleId: 1
        }),
    ]);
};