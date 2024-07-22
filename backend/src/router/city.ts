import { Router } from "express";
import { Controller } from "../controllers/Controller";
import { CityRepository } from "../repository/CityRepository";

const routerCity = Router();
const controllerCity = new Controller(new CityRepository());
routerCity.get('/', controllerCity.getAll);


export default routerCity;