import CONSTANTES from "../global/constantes";
import { ICityResponseArray } from "../interfaces/CityResponse";
import IResponseModel from "../interfaces/IresponseAction";

const fetchCities = async () => {
  try {
    const response = await fetch(`${CONSTANTES.URL_ENDPOINT_LOCAL}/cities`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: IResponseModel<ICityResponseArray> = await response.json();
    return data;
  } catch (error) {
    if( error instanceof Error ){
      throw new Error(error.message);
    }
  }
}

export default fetchCities