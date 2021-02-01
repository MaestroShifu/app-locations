import express from 'express';
import { locationRepository } from '../../infrastructure/repositories/location-repository';

import { getParentLocations } from '../../application/use-cases/getParentLocations';
import { createLocation } from '../../application/use-cases/createLocation';
import { updateLocation } from '../../application/use-cases/updateLocation';
import { deleteLocation } from '../../application/use-cases/deleteLocation';

export const locationController = {
    get: async (_req: express.Request, res: express.Response) => {
        try {
            const useCase = getParentLocations({locationRepository});
            const locations = await useCase.execute(); 
            return res.status(201).send(locations);
        } catch (error) {
            console.error(error);
            return res.status(404).send(error.message);            
        }
    },
    post: async(req: express.Request, res: express.Response) => {
        const { body } = req;
        try {
            const useCase = createLocation({
                locationRepository,
                body
            });
            const location = await useCase.execute();
            return res.status(201).send(location);
        } catch (error) {
            console.error(error);
            return res.status(400).send(error.message);
        }
    },
    put: async(req: express.Request, res: express.Response) => {
        const { body, params } = req;
        const { id } = params;
        try {
            const useCase = updateLocation({
                locationRepository,
                body: {
                    ...body,
                    id
                }
            });
            const location = await useCase.execute();
            return res.status(200).send(location);
        } catch (error) {
            console.error(error);
            return res.status(400).send(error.message); 
        }
    },
    delete: async(req: express.Request, res: express.Response) => {
        const { id } = req.params;
        try {
            const useCase = deleteLocation({
                locationRepository,
                id
            });
            const isDelete = await useCase.execute();
            return res.status(200).send(isDelete);
        } catch (error) {
            console.error(error);
            return res.status(400).send(error.message); 
        }        
    }
}