import { ConectionData } from "../global/constantes";
import MONGOConnection from "./class/connectionMongoDb";
import MYSQLConnection from "./class/connectionMysql";
import POSTGREConnection from "./class/connectionPostgreSQL";
import SQLiteConnection from "./class/connectionSqlite";
import { IFactoryConnectionData } from "./Factory";

export class ConectionFactory {
  public static getConection(connection: ConectionData):IFactoryConnectionData | null {
    if (!connection) return null;
    if (connection === ConectionData.MYSQL) return new MYSQLConnection();
    if (connection === ConectionData.MONGO) return new MONGOConnection();
    if (connection === ConectionData.POSTGRADED) return new POSTGREConnection();
    if (connection === ConectionData.SQLITE) return new SQLiteConnection();
    return null;
  }
}