

import express, { Application, Router } from "express";
import ConectionFactory from "../connection/ConnectionFactory";
import { ConnectionData } from "../global/constantes";

export default class Server {

  private static instaceServer: Server;
  public app: Application;
  public port: string;
  private constructor() {
    this.app = express();
    this.port = process.env.PORT ?? '3001';
    this.midlewares();
    this.initDatabase();
  }

  /**
   * Instance singelton
   */
  public static get instance(): Server {
    return this.instaceServer ?? (this.instaceServer = new Server());
  }

  /**
   * Connection by database
   */
  async initDatabase() {
    try {
      const connectionFactory = ConectionFactory.getConection(ConnectionData.MYSQL);
      if (!connectionFactory) {
        throw new Error(`Connection ${ConnectionData.MYSQL} is not configured`);
      }
      await connectionFactory.conectar().initialize()
      console.log('Connection to the database has been established successfully. 🚀');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
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

  routes(router: Router, path: string) {
    this.app.use(path, router);
  }
}

