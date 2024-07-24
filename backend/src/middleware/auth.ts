import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from '../models/entities/User';
import { IResponseModel } from '../interfaces/model.response';
import { CONSTANTES } from '../global/constantes';




export class AuthMiddleware {
  /**
   * Verify that the user has the signing token
   * @param header Header with token
   * @param res Response
   * @param next Next function
   * @returns Nothing in case the token is correct or error response from the server
   */
  static checkToken = async({ headers, params }: Request, res: Response, next: NextFunction) => {
    try {
      let idVerify:string | undefined = undefined;
      if( params.id ){
        idVerify = params.id
      }
      const { authorization } = headers;
      if (authorization && authorization.startsWith('Bearer ')) {
        await this.verifyToken(authorization.slice(7), idVerify);
        next();
        return;
      }
      let { status, success, msg , data } = this.responseAction(false, CONSTANTES.ACCESS_DENIED, null, 401);
      return res.status(status).json(
        {
          msg,
          success,
          status,
          data: data ?? []
        }
      );
    } catch (error) {
      let errorMsg = CONSTANTES.ACCESS_DENIED;

      if( error instanceof Error ){
        errorMsg = error.message;
      }
      let { status, success, msg, data } = this.responseAction(false, errorMsg, null, 401);
      return res.status(status).json(
        {
          msg,
          success,
          status,
          data: data ?? []
        }
      );
    }
  }

  static verifyToken = async ( token: string, id?: string ) => {
    try {
      let payload = jwt.verify(token, process.env.SECRET_KEY_JWT ?? '$w+D56d99Gcv-VbFQy5Gs%<aT5Hm9k-') as JwtPayload;
      if (typeof payload !== 'object' || !payload.id || !payload.email) {
        throw new Error(CONSTANTES.ACCESS_DENIED);
      }

      let user = await UserModel.findOne({
        where: { id: payload.id, email: payload.email }
      });

      if (!user || user.token !== token) {
        throw new Error(CONSTANTES.ACCESS_DENIED);
      }
      if (id){
        // Final validation of both cases
        let userById = await UserModel.findOneBy({ id: id });
        if (!userById || user.token !== userById.token) {
          throw new Error(CONSTANTES.ACCESS_DENIED);
        }
      }
      return payload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return await this.refreshToken(token);
      }
      throw new Error(CONSTANTES.ACCESS_DENIED);
    }
  }

  static refreshToken = async (token: string) => {
    let user = await UserModel.findOne({ where: { token } });
    if (!user) throw new Error(CONSTANTES.ACCESS_DENIED);
    user.token = await this.tokenSing(user);
    await UserModel.update({ id: user.id }, user);
    return jwt.verify(user.token, process.env.SECRET_KEY_JWT ?? '$w+D56d99Gcv-VbFQy5Gs%<aT5Hm9k-') as JwtPayload;
  }

  static tokenSing = async ({ id, email, name }: UserModel) => {
    try {
      return jwt.sign(
        { id, email, name },
        process.env.SECRET_KEY_JWT ?? '$w+D56d99Gcv-',
        {
          expiresIn: "24h"
        }
      )
    } catch (error) {
      if(error instanceof Error) {
        let message = `${error.message}: ${CONSTANTES.ERROR_AUTH(name)}`
        throw new Error(message)
      }
      throw new Error(CONSTANTES.ERROR_AUTH(name))
    }
  }

  private static responseAction(success: boolean, msg: string, data: UserModel | null, status: number): IResponseModel<UserModel |null> {
    return {
      status,
      success,
      msg,
      data
    }
  }
}