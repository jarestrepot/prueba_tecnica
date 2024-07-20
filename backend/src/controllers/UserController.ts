import { IResponseModelUser } from "../interfaces/user.model";
import UserModel from "../models/entities/User";

export class UserController {
  constructor(){}
  public static async createUser(body: UserModel): Promise<IResponseModelUser<UserModel | null>>{
    try{
      let user = await UserModel.findOneBy({ email: body.email });
      if( !user ){
        const userSave = await UserModel.save(body);
        return this.responseAction(true, 'User create sucefull', userSave, 201);
      }
      return this.responseAction(false, 'User already exists', null, 400);
    }catch(e){
      return this.responseAction(false, 'Server internal error!', null, 500);
    }
  }

  private static responseAction<T>(success: boolean, msg: string, data: T, status:number): IResponseModelUser<T> {
    return {
      status,
      success,
      msg,
      data
    };
  }
}


