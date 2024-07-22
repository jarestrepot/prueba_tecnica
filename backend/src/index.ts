import Server from "./models/Server";
import routerCity from "./router/city";
import routerUser from "./router/user";

export const server = Server.instance;
server.start();
server.routes(routerUser, '/user');
server.routes(routerCity, '/cities')


