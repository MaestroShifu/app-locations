import express from 'express';
import { locationController } from '../controllers/locations-controller';
export const routesLocations = (app: express.Express) => {
    app.get('/locations', locationController.get);
    app.post('/locations', locationController.post);
    app.put('/locations/:id', locationController.put);
    app.delete('/locations/:id', locationController.delete);
}