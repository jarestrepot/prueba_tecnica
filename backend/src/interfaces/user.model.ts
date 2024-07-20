export default interface IUserModel {
  nickName:      string;
  name:          string;
  password:      string;
  surname:       string;
  secondSurname: string;
  address?:       number;
  email:         string;
}


export interface IResponseModelUser<T> {
  status: number;
  success: boolean;
  msg: string;
  data: T;
}
