import { LocationRepository } from '../../infrastructure/repositories/location-repository';

interface IGetParentLocations {
    locationRepository: LocationRepository
}

export const getParentLocations = ({ locationRepository }: IGetParentLocations) => {
    const execute = async () => {
        return locationRepository.getParentLocations();
    }
    return {
        execute
    };
}