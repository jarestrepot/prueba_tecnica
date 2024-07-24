import { CONSTANTES } from "../global/constantes";
import { Id, Query, Repository } from "../interfaces/declarations";
import { IResponseModel, IResponseModelArray } from "../interfaces/model.response";
import { AuthMiddleware } from "../middleware/auth";
import Address from "../models/entities/Direction";
import UserModel from "../models/entities/User";
import bcrypt from 'bcrypt';


export class UserRepository implements Repository<UserModel> {
  async create(data: UserModel): Promise<IResponseModel<UserModel>> {
    try {
      let user = await UserModel.findOneBy({ email: data.email });
      if(!user){
        if (data.address && Object.keys(data.address).length > 0){
          let { post_code, street, apartment, number_street, city } = data.address;
          let address = await Address.findOne({
            where: { 
              post_code,
              street,
              apartment,
              number_street,
              city
            },
            relations: ['city', 'city.country']
          });
          if (!address) {
            address = await Address.save(data.address);
          }
          data.address = address;
        }
        const token = await AuthMiddleware.tokenSing(data);
        data.token = token;
        let userCreated = await UserModel.save(data);
        return this.getById(userCreated.id);
      }
      return this.responseAction(false, CONSTANTES.USER.EXISTS_USER(user.name), null, 404);
    } catch (error) {
      if (error instanceof Error) {
        throw this.handleError(error.message);
      }
      throw this.handleError(CONSTANTES.USER.UNKNOWN_ERROR('create'));
    }
  }

  async get(id: Id, query: Query = {}): Promise<IResponseModel<UserModel>> {
    try {
      const optionsQuery = {
        where: { id: String(id) },
        relations: ['address', 'address.city', 'address.city.country'],
        ...query,
      }
      let userFind = await UserModel.findOne(optionsQuery);
      if(!userFind) return this.responseAction(false, CONSTANTES.USER.NOT_FOUND, null, 404);
      return this.responseAction(true, CONSTANTES.USER.FOUND(this.toString(userFind)), userFind, 200);
    } catch (error) {
      if (error instanceof Error) {
        throw this.handleError(error.message);
      }
      throw this.handleError(CONSTANTES.USER.UNKNOWN_ERROR('get'));
    }
  }

  async post(data: Partial<UserModel>): Promise<IResponseModel<UserModel>> {
    try{
      if (!data.password || (!data.email && !data.nick_name)) {
        let dataRequired:string[] = ['email or nick_name', 'password'];
        return this.responseAction(false, CONSTANTES.USER.DATA_REQUIRED(dataRequired), null, 400);
      }

      const userFind = await UserModel.findOne(
        { 
          where: [
            { email: data.email },
            { nick_name: data.nick_name }
          ],
          relations: ['address', 'address.city', 'address.city.country']
        }
      );

      if (!userFind) return this.responseAction(false, CONSTANTES.USER.NOT_FOUND, null, 404);
      if (!await bcrypt.compare(data.password, userFind.password)){
        return this.responseAction(false, CONSTANTES.USER.CREDENCIALS_ERROR, null, 400);
      }
      return this.responseAction(true, CONSTANTES.USER.FOUND(this.toString(userFind)), userFind, 200);
    }catch(error) {
      if (error instanceof Error) {
        throw this.handleError(error.message);
      }
      throw this.handleError(CONSTANTES.USER.UNKNOWN_ERROR('getById'));
    }
  }

  async getById(id: Id): Promise<IResponseModel<UserModel>>{
    try {
      let userById = await UserModel.findOne(
        { 
          where: { id: id as string },
          relations: ['address', 'address.city', 'address.city.country']
        },
      );
      if (!userById ){
        return this.responseAction(false, CONSTANTES.USER.NOT_FOUND, null, 404);
      }
      
      return this.responseAction(true, CONSTANTES.USER.FOUND(this.toString(userById)), userById, 200);
    } catch (error) {
      if (error instanceof Error) {
        throw this.handleError(error.message);
      }
      throw this.handleError(CONSTANTES.USER.UNKNOWN_ERROR('getById'));
    }
  }

  async getAll(): Promise<IResponseModelArray<UserModel[]>> {
    try {
      let allUsers = await UserModel.find({
        relations: ['address', 'address.city', 'address.city.country']
      });
      return this.responseActionArray(true, CONSTANTES.USER.ALL, allUsers, 200 );
    } catch (error) {
      if (error instanceof Error) {
        throw this.handleError(error.message);
      }
      throw this.handleError(CONSTANTES.USER.UNKNOWN_ERROR('getAll'));
    }
  }


  async delete(id: Id, query: Query = {}): Promise<IResponseModel<UserModel>> {
    try {
      const { data } = await this.get(id, query);
      if(!data) {
        return this.responseAction(false, CONSTANTES.USER.NOT_FOUND, null, 404);
      }
      let deleteResult = await UserModel.delete({ id: id as string });
      if (deleteResult.affected != null && deleteResult.affected > 0){
        return this.responseAction(true, CONSTANTES.USER.DELETE_SUCCESSFUL(this.toString(data)), null, 200);
      }
      return this.responseAction(true, CONSTANTES.USER.DELETE_ERROR(this.toString(data)), null, 304);
    } catch (error) {
      if (error instanceof Error) {
        throw this.handleError(error.message);
      }
      throw this.handleError(CONSTANTES.USER.UNKNOWN_ERROR('delete'));
    }
  }

  async update(data: UserModel): Promise<IResponseModel<UserModel>> {
    try {
      const user = await UserModel.findOneBy({ id: String(data.id) });
      if (!user) {
        return this.responseAction(false, CONSTANTES.USER.NOT_FOUND, null, 404);
      }
      await UserModel.update({ id: String(data.id) }, data);
      let userUpdated = await UserModel.findOne(
        {
          where: { id: data.id as string },
          relations: ['address', 'address.city', 'address.city.country']
        },
      );
      if (!userUpdated) return this.responseAction(false, CONSTANTES.USER.NOT_FOUND, null, 404);
      return this.responseAction(true, CONSTANTES.USER.UPDATED_SUCCESSFUL(this.toString(userUpdated)), userUpdated, 200)
    } catch (error) {
      if (error instanceof Error ){
        throw this.handleError(error.message);
      }
      throw this.handleError(CONSTANTES.USER.UNKNOWN_ERROR('update'));
    }
  }



  responseAction(success: boolean, msg: string, data: UserModel | null , status: number): IResponseModel<UserModel> {
    return {
      status,
      success,
      msg,
      data
    }
  }

  responseActionArray(success: boolean, msg: string, data: UserModel[] | null, status: number): IResponseModel<UserModel[]> {
    return {
      status,
      success,
      msg,
      data
    }
  }

  handleError(msg:string): Error {
    return new Error(msg);
  }

  toString({ name, nick_name, surname, secondSurname }: UserModel): string {
    let fullName = `${name} ${nick_name} ${surname}`;
    if (secondSurname)
      fullName += ` ${secondSurname}`;
    return fullName;
  }
}

