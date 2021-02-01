import { LocationRepository } from '../../infrastructure/repositories/location-repository';

interface IDeleteLocation {
    locationRepository: LocationRepository;
    id: string;
}

export const deleteLocation = (args: IDeleteLocation) => {
    const { locationRepository, id } = args;
    
    const validateParam = () => {
        if(!id) {
            throw new Error('Faltan parametros');
        }
    }

    const execute = () => {
        validateParam();
        return locationRepository.delete(id);
    }
    
    return {
        execute
    };
}