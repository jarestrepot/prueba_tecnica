import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/entities/User';
import { IResponseModel } from '../interfaces/model.response';
import { CONSTANTES } from '../global/constantes';

export class PasswordMiddleware {
  /**
   * Hash the password before saving to the database
   * @param req Request
   * @param res Response
   * @param next Next function
   * @returns Nothing in case the password is hashed successfully or error response from the server
   */
  static hashPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { password, name } = req.body;
    if (password) {
      try {
        req.body.password = await bcrypt.hash(password, Number(process.env.SALTROUND) ?? 12);
        next();
        return;
      } catch (error) {
        if (error instanceof Error) {
          let message = `${error.message}: ${CONSTANTES.ERROR_AUTH(name)}`
          throw new Error(message)
        }
        throw new Error(CONSTANTES.ERROR_AUTH(name))
      }
    } else {
      let { status, success, msg, data } = this.responseAction(false, CONSTANTES.USER.DATA_REQUIRED(['password']), null, 401);
      return res.status(status).json(
        {
          msg,
          success,
          status,
          data: data ?? []
        }
      );
    }
  };

  private static responseAction(success: boolean, msg: string, data: UserModel | null, status: number): IResponseModel<UserModel | null> {
    return {
      status,
      success,
      msg,
      data
    }
  }
}