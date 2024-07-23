export interface BodyPostCreate extends BodyPost {
  name: string;
  surname: string;
  secondSurname?: string;
  email: string;
  token?: string;
  address?: Address;
}

export interface Address {
  post_code?: number;
  street?: string;
  number_street?: number;
  apartment?: string;
  city?: number;
}


export interface BodyPost {
  nick_name: string;
  password: string;
}

