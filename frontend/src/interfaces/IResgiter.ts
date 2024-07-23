

export interface IRegister {
  nick_name: string;
  name: string;
  surname: string;
  secondSurname?: string;
  email: string;
  token?: string
  password: string;
  passwordConfirmation: string;
  post_code?: number;
  street?: string;
  number_street?: number;
  apartment?: string;
  city?: number; 
}

export interface formFieldRegister {
  label: string,
  name: string
  typeInput: string,
  placeholder: string
}

export interface ILogin {
  nick_name: string;
  password: string;
}