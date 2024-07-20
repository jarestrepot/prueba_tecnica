import { DataSource } from "typeorm";
import { IFactoryConnectionData } from "../Factory";

export default class MONGOConnection implements IFactoryConnectionData {
  public type: "mongodb";
  private host: string;
  private port: number;
  private database: string;
  constructor(){
    const typeFromEnv = process.env.TYPE ?? "mysql";
    if( typeFromEnv !== "mongodb" ){
      throw new Error(`Invalid type: ${typeFromEnv}`);
    }
    this.type = typeFromEnv ?? 'mongodb';
    this.host = process.env.MONGO_HOST ?? 'localhost';
    this.port = Number(process.env.MONGO_PORT) ?? 27017;
    this.database = process.env.MONGO_DB ?? 'test';
  }
  conectar(): DataSource {
    console.log('Connection Mongo db')
    return new DataSource({
      type: this.type,
      host: this.host,
      port: this.port,
      database: this.database,
    });
  }
  disconnect(): boolean {
    console.log('Disconnect mongo db')
    return true;
  }
}

