import express, { Application, Router } from "express";

export default class Server {

  private static instaceServer:Server;
  private app: Application;
  private port: string;
  private constructor(){
    this.app = express();
    this.port = process.env.PORT ?? '3001';
    this.midlewares();
  }

  /**
   * Instance singelton
   */
  public static get instance(): Server {
    return this.instaceServer ?? (this.instaceServer = new Server());
  }

  /**
   * Midlewares for the server
   */
  midlewares() {
    this.app.use(express.json());
    this.app.disable('x-powered-by');
  }

  /**
   * Initialize the server
   */
  start() {
    this.app.listen(this.port, () => {
      console.log(`Listening server on port http://localhost:${this.port}`);
    });
  }

  routes(router:Router, path:string){
    this.app.use(path, router);
  }
}

