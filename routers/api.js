const express = require('express');
const APIRouter = express.Router();
const fleetsRouter = require('./fleets');
const vehiclesRouter = require('./vehicles');
const motionsRouter = require('./motions');

APIRouter.use('/fleets', fleetsRouter);
APIRouter.use('/vehicles', vehiclesRouter);
APIRouter.use('/motions', motionsRouter);

module.exports = APIRouter;