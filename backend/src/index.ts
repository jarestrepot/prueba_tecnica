import { CorsOptions } from "cors";
import Server from "./models/Server";
import routerCity from "./router/city";
import routerUser from "./router/user";

export const server = Server.instance;
server.start();
const corsGeneral: CorsOptions = {
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
server.routes(routerUser, '/user', corsGeneral);
server.routes(routerCity, '/cities', corsGeneral);


