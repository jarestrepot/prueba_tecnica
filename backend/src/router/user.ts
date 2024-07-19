import { Router, Request, Response } from "express";

const routerUser = Router();

routerUser.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({ msg: 'Hello word' });
});

export default routerUser;


