import CONSTANTES from "../global/constantes";
import IResponseModel from "../interfaces/IresponseAction";

type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions<B> {
  method: FetchMethod;
  url: string;
  body?: B;
  headers?: Record<string, string>;
}

const fetchData = async <B, R>({ method, url, body, headers = {} }: FetchOptions<B>): Promise<IResponseModel<R>> => {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${CONSTANTES.URL_ENDPOINT_LOCAL}${url}`, config);
    const data: IResponseModel<R> = await response.json();
    return data as IResponseModel<R>;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export default fetchData;