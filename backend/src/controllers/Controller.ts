import { CONSTANTES } from "../global/constantes";
import { Repository } from "../interfaces/declarations";
import { NextFunction, Request, Response } from "express";

export class Controller {
  constructor(private repository: Repository){}
  postCreate = async (req:Request, res:Response, next: NextFunction) => {
    try {
      const body = req.body;
      let { status, success, msg, data } = await this.repository.create(body);
      return res.status(status).json(
        {
          msg,
          success,
          status,
          data: data ?? []
        }
      );
    } catch (error) {
      next(error);
      if (error instanceof Error) {
        const { message } = this.handleError(error.message);
        return this.handleErrorServer(message, res);
      }
      let message = CONSTANTES.NULL_QUERY(`postCreate ${req.url}`)
      return this.handleErrorServer(message, res);
    }
  }

  getEntityById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { id } = req.params;
      let { status, success, msg, data } = await this.repository.getById(id);
      return res.status(status).json(
        {
          msg,
          success,
          status,
          data: data ?? []
        }
      ); 
    } catch (error) {
      next(error);
      if (error instanceof Error) {
        const { message } = this.handleError(error.message);
        return this.handleErrorServer(message, res);
      }
      const message = CONSTANTES.NULL_QUERY(`getEntityById ${req.url}`);
      return this.handleErrorServer(message, res);
    }
  }

  post = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      let { status, success, msg, data } = await this.repository.post(body);
      return res.status(status).json(
        {
          msg,
          success,
          status,
          data: data ?? []
        }
      );
    } catch (error) {
      next(error);
      if (error instanceof Error) {
        const { message } = this.handleError(error.message);
        return this.handleErrorServer(message, res);
      }
      let message = CONSTANTES.NULL_QUERY(`POST (${req.url})`);
      return this.handleErrorServer(message, res);
    }
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try{
      let { id } = req.params;
      let { status, success, msg, data } = await this.repository.get(id);
      return res.status(status).json(
        {
          msg,
          success,
          status,
          data: data ?? []
        }
      );
    }catch(error){
      next(error);
      if( error instanceof Error ) {
        const { message } = this.handleError(error.message);
        return this.handleErrorServer(message, res);
      }
      let message = CONSTANTES.NULL_QUERY(`Get (${req.url})`);
      return this.handleErrorServer(message, res);
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { id } = req.params;
      let { status, success, msg, data } = await this.repository.delete(id);
      return res.status(status).json(
        {
          msg,
          success,
          status,
          data: data ?? []
        }
      );
    } catch (error) {
      next(error);
      if (error instanceof Error) {
        const { message } = this.handleError(error.message);
        return this.handleErrorServer(message, res);
      }
      const message = CONSTANTES.NULL_QUERY(`delete ${req.url}`);
      return this.handleErrorServer(message, res);
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      let { status, success, msg, data } = await this.repository.update(body);
      return res.status(status).json(
        {
          msg,
          success,
          status,
          data: data ?? []
        }
      );
    } catch (error) {
      next(error);
      if (error instanceof Error) {
        const { message } = this.handleError(error.message);
        return this.handleErrorServer(message, res);
      }
      const message = CONSTANTES.NULL_QUERY(`delete ${req.url}`);
      return this.handleErrorServer(message, res);
    }
  }

  handleError(msg:string): Error{
    return this.repository.handleError(msg);
  }

  handleErrorServer(msg:string, res:Response){
    return res.status(500).json({
      msg,
      success: false,
      status: 500,
      data: null
    });
  }
}