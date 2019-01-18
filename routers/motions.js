const express = require('express');
const motionsRouter = express.Router();
const bodyParser = require('body-parser');
const db = require('../db/db');
motionsRouter.use(bodyParser.json());

class Motion {
    constructor(lat, long, t, veh) {
        this.latitude = lat,
            this.longitude = long,
            this.time = t,
            this.vehicleId = veh
    }
}
const ErrorObj = { code: 404, message: 'Error!!!' };
//создает запись о движении с привязкой к машине
motionsRouter.post('/create', (req, resp, next) => {
    req = req.body;
    if (!req.latitude && !req.longitude && !req.time && !req.vehicleId) { resp.json(ErrorObj); return; }
    const motion = new Motion(req.latitude, req.longitude, req.time, req.vehicleId);
    db.Motion.create(motion);
    resp.json(motion);
});

module.exports = motionsRouter;