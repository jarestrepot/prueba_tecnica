export interface UserData {
  msg: string;
  success: boolean;
  status: number;
  data: User;
}

export interface User {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  nick_name: string;
  name: string;
  password: string;
  surname: string;
  secondSurname: null;
  email: string;
  token: string;
  address: Address;
}

export interface Address {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  post_code: number;
  street: string;
  number_street: number;
  apartment: string;
  city: City;
}

export interface City {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  name: string;
  country: Country;
}

export interface Country {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  name: string;
}
