import { LocationRepository, ICreateOrUpdate } from '../../infrastructure/repositories/location-repository';

interface IUpdateLocation {
    locationRepository: LocationRepository;
    body: ICreateOrUpdate;
}

export const updateLocation = (args: IUpdateLocation) => {
    const { locationRepository, body } = args;
    
    const validateFields = () => {
        if(!body.area_m2 || !body.name || !body.id) {
            throw new Error('Faltan argumentos');
        }
    }

    const validateExistLocation = async () => {
        const locations = await locationRepository.show();
        const exist = locations.find(location => location.name.toLowerCase() === body.name.toLowerCase()); 
        if(exist && (+exist.id !== +body.id)) {
            throw new Error('Ya existe la locación');
        }
    }

    const execute = async () => {
        validateFields();
        await validateExistLocation();
        return locationRepository.update(body);
    }
    
    return {
        execute
    };
}