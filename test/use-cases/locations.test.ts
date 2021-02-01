import { ICreateOrUpdate } from '../../src/infrastructure/repositories/location-repository';
import { createLocation } from '../../src/application/use-cases/createLocation';
import { deleteLocation } from '../../src/application/use-cases/deleteLocation';
import { getParentLocations } from '../../src/application/use-cases/getParentLocations';
import { updateLocation } from '../../src/application/use-cases/updateLocation';

describe('Locations', () => {
    describe('create locations', () => {
        test('Succesfull', async () => {
            const body: ICreateOrUpdate = {
                name: 'locationTest',
                area_m2: 20
            };
            const locationRepository: any = {
                show: jest.fn().mockReturnValue([
                    {
                        id: 4,
                        name: 'location1',
                        area_m2: 20
                    }
                ]),
                create: jest.fn().mockReturnValue({
                    id: 7,
                    ...body
                })
            };
            const useCase = createLocation({
                body,
                locationRepository
            });
            const data = await useCase.execute();
            expect(data.name).toEqual(body.name);
            expect(data.area_m2).toEqual(body.area_m2);
            const { show, create } = locationRepository;
            expect((show as jest.Mock).mock.calls.length).toEqual(1);
            expect((create as jest.Mock).mock.calls.length).toEqual(1);
            expect((create as jest.Mock).mock.calls[0][0].name).toEqual(body.name);
            expect((create as jest.Mock).mock.calls[0][0].area_m2).toEqual(body.area_m2);
        });
        test('Ya existe la locacion', async () => {
            const body: ICreateOrUpdate = {
                name: 'locationTest',
                area_m2: 20
            };
            const locationRepository: any = {
                show: jest.fn().mockReturnValue([
                    {
                        id: 4,
                        ...body
                    }
                ])
            };
            const useCase = createLocation({
                body,
                locationRepository
            });
            try {
                await useCase.execute();
            } catch (error) {
                expect(error.message).toEqual('Ya existe la locación');                
            }
            const { show } = locationRepository;
            expect((show as jest.Mock).mock.calls.length).toEqual(1);
        });
        test('Faltan argumentos', async () => {
            const body: ICreateOrUpdate = {
                name: '',
                area_m2: 20
            };
            const locationRepository: any = {
                show: jest.fn().mockReturnValue([
                    {
                        id: 4,
                        name: 'location1',
                        area_m2: 20
                    }
                ]),
                create: jest.fn().mockReturnValue({
                    id: 7,
                    ...body
                })
            };
            const useCase = createLocation({
                body,
                locationRepository
            });
            try {
                await useCase.execute();
            } catch (error) {
                expect(error.message).toEqual('Faltan argumentos');                
            }
            const { show, create } = locationRepository;
            expect((create as jest.Mock).mock.calls.length).toEqual(0);
            expect((show as jest.Mock).mock.calls.length).toEqual(0);
        });
    });

    describe('delete locations', () => {
        test('Succesfull', async () => {
            const locationRepository: any = {
                delete: jest.fn().mockReturnValue(true)
            };
            const useCase = deleteLocation({
                id: '5',
                locationRepository
            });
            const data = await useCase.execute();
            expect(data).toEqual(true);
            expect(((locationRepository.delete as jest.Mock)).mock.calls[0][0]).toEqual('5');
            expect(((locationRepository.delete as jest.Mock)).mock.calls.length).toEqual(1);
        })
        test('Faltan parametros', async () => {
            const locationRepository: any = {
                delete: jest.fn().mockReturnValue(true)
            };
            const useCase = deleteLocation({
                id: '',
                locationRepository
            });
            try {
                await useCase.execute();
            } catch (error) {
                expect(error.message).toEqual('Faltan parametros');
            }
            expect(((locationRepository.delete as jest.Mock)).mock.calls.length).toEqual(0);
        })
    });
    describe('get parents locations', () => {
        test('Succesfull', async () => {
            const locationRepository: any = {
                getParentLocations: jest.fn().mockReturnValue([{
                    id: 4,
                    name: 'location1',
                    area_m2: 20
                }])
            };
            const useCase = getParentLocations({locationRepository});
            const data = await useCase.execute();
            expect(data.length).toEqual(1);
            expect(((locationRepository.getParentLocations as jest.Mock)).mock.calls.length).toEqual(1);
        });

    });


    describe('update locations', () => {
        test('Succesfull', async () => {
            const body: ICreateOrUpdate = {
                id: '7',
                name: 'locationTest',
                area_m2: 20
            };
            const locationRepository: any = {
                show: jest.fn().mockReturnValue([
                    {
                        id: 4,
                        name: 'location1',
                        area_m2: 20
                    }
                ]),
                update: jest.fn().mockReturnValue(body)
            };
            const useCase = updateLocation({
                body,
                locationRepository
            });
            const data = await useCase.execute();
            expect(data.name).toEqual(body.name);
            expect(data.area_m2).toEqual(body.area_m2);
            const { show, update } = locationRepository;
            expect((show as jest.Mock).mock.calls.length).toEqual(1);
            expect((update as jest.Mock).mock.calls.length).toEqual(1);
            expect((update as jest.Mock).mock.calls[0][0].name).toEqual(body.name);
            expect((update as jest.Mock).mock.calls[0][0].area_m2).toEqual(body.area_m2);
        });
        test('Ya existe la locacion', async () => {
            const body: ICreateOrUpdate = {
                id: '7',
                name: 'locationTest',
                area_m2: 20
            };
            const locationRepository: any = {
                show: jest.fn().mockReturnValue([
                    {
                        ...body,
                        id: 4
                    }
                ])
            };
            const useCase = updateLocation({
                body,
                locationRepository
            });
            try {
                await useCase.execute();
            } catch (error) {
                expect(error.message).toEqual('Ya existe la locación');                
            }
            const { show } = locationRepository;
            expect((show as jest.Mock).mock.calls.length).toEqual(1);
        });

        test('Faltan argumentos', async () => {
            const body: ICreateOrUpdate = {
                id: '',
                name: 'locationTest',
                area_m2: 20
            };
            const locationRepository: any = {
                show: jest.fn().mockReturnValue([
                    {
                        id: 4,
                        name: 'location1',
                        area_m2: 20
                    }
                ]),
                update: jest.fn().mockReturnValue(body)
            };
            const useCase = updateLocation({
                body,
                locationRepository
            });
            try {
                await useCase.execute();
            } catch (error) {
                expect(error.message).toEqual('Faltan argumentos');                
            }
            const { show, update } = locationRepository;
            expect((update as jest.Mock).mock.calls.length).toEqual(0);
            expect((show as jest.Mock).mock.calls.length).toEqual(0);
        });
    });
});