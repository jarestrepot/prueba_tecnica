import { CONSTANTES } from "../global/constantes";
import { Id, Query, Repository } from "../interfaces/declarations";
import { IResponseModel, IResponseModelArray } from "../interfaces/model.response";
import City from "../models/entities/City";


export class CityRepository implements Repository<City> {
  async create(data: City): Promise<IResponseModel<City>> {
    try {
      let city = City.findOneBy({ name: data.name });
      if (!city) {
        let newCity = await City.save(data);
        return this.responseAction(true, CONSTANTES.CITY.CREATE_SUCCESSFUL(this.toString(newCity)), newCity, 201)
      }
      return this.responseAction(false, CONSTANTES.CITY.EXISTS_CITY(data.name), null, 404);
    } catch (error) {
      if (error instanceof Error) {
        throw this.handleError(error.message);
      }
      throw this.handleError(CONSTANTES.CITY.UNKNOWN_ERROR('create'));
    }
  }

  async get(id: Id, query: Query = {}): Promise<IResponseModel<City>> {
    try {
      const optionsQuery = {
        where: { id: String(id) },
        relations: ['country'],
        ...query,
      }
      let cityFind = await City.findOne(optionsQuery);
      if (!cityFind) return this.responseAction(false, CONSTANTES.CITY.NOT_FOUND, null, 404);
      return this.responseAction(true, CONSTANTES.CITY.FOUND(this.toString(cityFind)), cityFind, 200);
    } catch (error) {
      if (error instanceof Error) {
        throw this.handleError(error.message);
      }
      throw this.handleError(CONSTANTES.CITY.UNKNOWN_ERROR('get'));
    }
  }

  async post(data: Partial<City>): Promise<IResponseModel<City>> {
    try {
      if (!data.name) {
        let dataRequired: string[] = ['name'];
        return this.responseAction(false, CONSTANTES.CITY.DATA_REQUIRED(dataRequired), null, 400);
      }

      const cityFind = await City.findOne(
        {
          where: [
            { name: data.name },
          ],
          relations: ['address', 'address.city', 'address.city.country']
        }
      );

      if (!cityFind) return this.responseAction(false, CONSTANTES.CITY.NOT_FOUND, null, 404);

      return this.responseAction(true, CONSTANTES.CITY.FOUND(this.toString(cityFind)), cityFind, 200);
    } catch (error) {
      if (error instanceof Error) {
        throw this.handleError(error.message);
      }
      throw this.handleError(CONSTANTES.CITY.UNKNOWN_ERROR('getById'));
    }
  }

  async getById(id: Id): Promise<IResponseModel<City>> {
    try {
      let cityById = await City.findOne(
        {
          where: { id: id as string },
          relations: ['country']
        },
      );
      if (!cityById) {
        return this.responseAction(false, CONSTANTES.CITY.NOT_FOUND, null, 404);
      }
      return this.responseAction(true, CONSTANTES.CITY.FOUND(this.toString(cityById)), cityById, 200);
    } catch (error) {
      if (error instanceof Error) {
        throw this.handleError(error.message);
      }
      throw this.handleError(CONSTANTES.CITY.UNKNOWN_ERROR('getById'));
    }
  }

  async getAll(): Promise<IResponseModelArray<City[]>> {
    try {
      let allCities = await City.find({
        relations: ['country']
      });
      return this.responseActionArray(true, CONSTANTES.CITY.ALL, allCities, 200);
    } catch (error) {
      if (error instanceof Error) {
        throw this.handleError(error.message);
      }
      throw this.handleError(CONSTANTES.CITY.UNKNOWN_ERROR('getAll'));
    }
  }


  async delete(id: Id, query: Query = {}): Promise<IResponseModel<City>> {
    try {
      const { data } = await this.get(id, query);
      if (!data) {
        return this.responseAction(false, CONSTANTES.CITY.NOT_FOUND, null, 404);
      }
      let deleteResult = await City.delete({ id: id as string });
      if (deleteResult.affected != null && deleteResult.affected > 0) {
        return this.responseAction(true, CONSTANTES.CITY.DELETE_SUCCESSFUL(this.toString(data)), null, 200);
      }
      return this.responseAction(true, CONSTANTES.CITY.DELETE_ERROR(this.toString(data)), null, 304);
    } catch (error) {
      if (error instanceof Error) {
        throw this.handleError(error.message);
      }
      throw this.handleError(CONSTANTES.CITY.UNKNOWN_ERROR('delete'));
    }
  }

  async update(data: City): Promise<IResponseModel<City>> {
    try {
      const city = await City.findOneBy({ id: String(data.id) });
      if (!city) {
        return this.responseAction(false, CONSTANTES.CITY.NOT_FOUND, null, 404);
      }
      await City.update({ id: String(data.id) }, data);
      let cityUpdated = await City.findOne(
        {
          where: { id: data.id as string },
          relations: ['address', 'address.city', 'address.city.country']
        },
      );
      if (!cityUpdated) return this.responseAction(false, CONSTANTES.CITY.NOT_FOUND, null, 404);
  
      return this.responseAction(true, CONSTANTES.CITY.UPDATED_SUCCESSFUL(this.toString(cityUpdated)), cityUpdated, 200)
    } catch (error) {
      if (error instanceof Error) {
        throw this.handleError(error.message);
      }
      throw this.handleError(CONSTANTES.CITY.UNKNOWN_ERROR('update'));
    }
  }


  responseAction(success: boolean, msg: string, data: City | null, status: number): IResponseModel<City> {
    return {
      status,
      success,
      msg,
      data
    }
  }

  responseActionArray(success: boolean, msg: string, data: City[] | null, status: number): IResponseModel<City[]> {
    return {
      status,
      success,
      msg,
      data
    }
  }

  handleError(msg: string): Error {
    return new Error(msg);
  }

  toString({ name }: City): string {
    return name;
  }
}

