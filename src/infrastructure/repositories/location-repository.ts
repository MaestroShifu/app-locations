import Location from "../orm/models/location";

export type LocationRepository = typeof locationRepository;

export interface ICreateOrUpdate {
    id?: string;
    name: string; 
    area_m2: number; 
    location_parent_id?: string;
}

export const locationRepository = {
    getParentLocations: async (): Promise<Location[]> => {
        const locations = await Location.query().whereNull('location_parent_id').withGraphFetched('internalLocations');
        return locations;
    },
    show: async (): Promise<Location[]> => {
        const locations = await Location.query();
        return locations;
    },
    create: async(args: ICreateOrUpdate): Promise<Location> => {
        const data: ICreateOrUpdate = nameTolowerCase(args);
        const location = await Location.query().insertAndFetch(data);
        return location;
    },
    update: async(args: ICreateOrUpdate): Promise<Location> => {
        const data: ICreateOrUpdate = nameTolowerCase(args);
        const location = await Location.query().updateAndFetchById(data.id, data);
        return location;
    },
    delete: async(id: string): Promise<boolean> => {
        await Location.query().deleteById(id);
        return true;
    }
};

const nameTolowerCase = (args: ICreateOrUpdate): ICreateOrUpdate => {
    return {
        ...args,
        name: args.name.toLowerCase()
    };
}