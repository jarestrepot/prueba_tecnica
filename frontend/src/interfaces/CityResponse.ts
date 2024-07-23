export interface ICityResponseArray {
  msg: string;
  success: boolean;
  status: number;
  data: ICityResponse[];
}

export interface ICityResponse {
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