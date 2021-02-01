import { LocationRepository, ICreateOrUpdate } from '../../infrastructure/repositories/location-repository';

interface ICreateLocation {
    locationRepository: LocationRepository;
    body: ICreateOrUpdate;
}

export const createLocation = (args: ICreateLocation) => {
    const { locationRepository, body } = args;
    
    const validateFields = () => {
        if(!body.area_m2 || !body.name) {
            throw new Error('Faltan argumentos');
        }
    }

    const validateExistLocation = async () => {
        const locations = await locationRepository.show();
        const exist = locations.find(location => location.name.toLowerCase() === body.name.toLowerCase()); 
        if(exist) {
            throw new Error('Ya existe la locación');
        }
    }

    const execute = async () => {
        validateFields();
        await validateExistLocation();
        return locationRepository.create(body);
    }
    return {
        execute
    };
}