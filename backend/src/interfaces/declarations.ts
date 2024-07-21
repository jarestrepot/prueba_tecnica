import { IResponseModel } from "./model.response"

export type Query = Record<string, unknown>

export type Id = string | number

export interface Repository<T = unknown> {
  create(data: T): Promise<IResponseModel<T>>
  get(id: Id, query?: Query): Promise<IResponseModel<T>>
  getById(id: Id): Promise<IResponseModel<T>>
  post(data:Partial<T>): Promise<IResponseModel<T>>
  delete(id: Id, query?: Query): Promise<IResponseModel<T>>
  update(data: T): Promise<IResponseModel<T>>
  responseAction(success: boolean, msg: string, data: T | null, status: number): IResponseModel<T>
  handleError(msg:string): Error
  toString(data: T): string
}