import { Model } from 'objection';

class Location extends Model {
    // Asignamos el nombre a la tabla
    static get tableName() {
        return 'locations';
    }
    // Asignamos llave primaria
    static get idColumn() {
        return 'id';
    }

    // Asignamos relaciones
    static relationMappings = {
        internalLocations: {
          relation: Model.HasManyRelation,
          modelClass: Location,
          join: {
            from: 'locations.id',
            to: 'locations.location_parent_id'
          }
        }
    };

    readonly id: string;
    name: string;
    area_m2: number;
    location_parent_id: string;
    internalLocations: Location[]; 
}

export default Location;