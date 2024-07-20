import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";


const routerUser = Router();

routerUser.get('/login', (_req: Request, res: Response) => {
  return res.status(200).json({ msg: 'Hello word' });
});

routerUser.post('/register', async ({ body }: Request, res: Response) => {
  try{
    if(body.address){
      // Creamos la instacia del adress
      
    }
    const createUser = await UserController.createUser(body);
    if(!createUser){
      return res.status(400).json({ msg: 'User cannot be created correctly', data: [] });
    }
    return res.status(createUser.status).json({ msg: createUser.msg, data: createUser.data });
  }catch(err){
    return res.status(500).json({ msg: 'Server internal error!' })
  }
})

export default routerUser;


