import { Router } from "express";
import { Controller } from "../controllers/Controller";
import { UserRepository } from "../repository/UserRepository";
import { AuthMiddleware } from "../middleware/auth";
import { PasswordMiddleware } from "../middleware/passwordMiddleware";


const routerUser = Router();


const controllerUser = new Controller(new UserRepository());
routerUser.post('/register', PasswordMiddleware.hashPassword, controllerUser.postCreate);
routerUser.post('/login', controllerUser.post);
routerUser.get('/:id', AuthMiddleware.checkToken, controllerUser.getEntityById);
routerUser.delete('/delete/:id', AuthMiddleware.checkToken, controllerUser.delete);
routerUser.patch('/update', AuthMiddleware.checkToken, controllerUser.update);

export default routerUser;


