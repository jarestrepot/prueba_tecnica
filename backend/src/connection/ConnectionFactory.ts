import { ConnectionData } from "../global/constantes";
import MONGOConnection from "./class/connectionMongoDb";
import MYSQLConnection from "./class/connectionMysql";
import { IFactoryConnectionData } from "./Factory";

export default class ConectionFactory {
  public static getConection(connection: ConnectionData): IFactoryConnectionData | null{
    if (!connection) return null;
    if (connection === ConnectionData.MYSQL) return new MYSQLConnection();
    if (connection === ConnectionData.MONGO) return new MONGOConnection();
    // if (connection === ConectionData.POSTGRADED) return new POSTGREConnection();
    // if (connection === ConectionData.SQLITE) return new SQLiteConnection();
    return null;
  }
}