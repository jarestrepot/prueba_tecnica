import Server from "./models/Server";
import routerUser from "./router/user";

const server = Server.instance;
server.start();
server.routes(routerUser, '/user');

