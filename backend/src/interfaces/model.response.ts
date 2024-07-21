
export interface IResponseModel<T> {
  status: number;
  success: boolean;
  msg: string;
  data: T | null;
}
