const express = require('express');
const vehiclesRouter = express.Router();
const bodyParser = require('body-parser');
const db = require('../db/db');
vehiclesRouter.use(bodyParser.json());

const ErrorObj = { code: 404, message: 'Error!!!' };
class Vehicle {
    constructor(name, fleetId) {
        this.name = name;
        this.fleetId = fleetId;
    }
}
//возвращает массив машин по переданному fleedId
vehiclesRouter.get('/readall', (req, resp, next) => {
    resp.statusCode = 200;
    db.Vehicle.findAll().then((res) => {
        resp.json(res.map(i => i.id+' - '+i.name ));
    });
});

vehiclesRouter.get('/read', (req, resp, next) => {
    if (!req.body.id || isNaN(++req.body.id)) { resp.json(ErrorObj); return; }
    const id = --req.body.id;
    db.Vehicle.findAll(
        {
            attributes: ['name'],
            where: {
                id: id,
                deletedAt: null
            },
        }).then((res) => {
        if (!res.length) resp.json(ErrorObj);
        else resp.json(res);
    });
});
vehiclesRouter.post('/update', (req, resp, next) => {
    req = req.body;
    if (!req.id || isNaN(++req.id)) { resp.json(ErrorObj); return; }
    const id = --req.id;
    const vehicle = new Vehicle(req.name, req.fleetId);
    vehicle.id = id;
    db.Vehicle.update({ name: req.name, fleetId: req.fleetId },
        {
            where: {
                id: id,
                deletedAt: null
            }
        }
    );
    resp.json(vehicle);
});
vehiclesRouter.post('/delete', (req, resp, next) => {
    req = req.body;
    if (!req.id || isNaN(++req.id)) { resp.json(ErrorObj); return; }
    const id = --req.id;
    db.Vehicle.destroy(
        {
            where:
                {
                    id: id,
                    deletedAt: null
                }
        }
    ).catch((e) => {
        resp.json(ErrorObj);
    });
    resp.json(req.id);
});

vehiclesRouter.post('/create', (req, resp, next) => {
    req = req.body;
    if (!req.name && !req.fleetId || isNaN(++req.fleetId)) { resp.json(ErrorObj); return; }
    const vehicle = new Vehicle(req.name, --req.fleetId);
    db.Vehicle.create(vehicle);
    resp.json(vehicle);
});
//по переданному id машины, читает все движения и вычисляет пройденное машиной расстояние
vehiclesRouter.get('/milage', async (req, resp, next) => {
    if (!req.body.id || isNaN(++req.body.id)) { resp.json(ErrorObj); return; }
    const id = --req.body.id;
    let vehicle = await db.Vehicle.findById(id);
    if (vehicle) {
        let coords = [];
        let motions = await db.Motion.findAll({
            where: {
                vehicleId: id
            }
        });
        motions.forEach((motion) => {
            coords.push(motion.latLng)
        });
        if (coords.length < 2)
            resp.json(0);
        else {
            let distance = require('geolib').getPathLength(coords);
            resp.json(distance);
        }
    }
    else resp.json(ErrorObj);
});

module.exports = vehiclesRouter;