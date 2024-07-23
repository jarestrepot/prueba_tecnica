interface IResponseModel<T> {
  status: number;
  success: boolean;
  msg: string;
  data: T | null;
}

export default IResponseModel