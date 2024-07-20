import { DataSource } from "typeorm";
import { IFactoryConnectionData } from "../Factory";

export default class MYSQLConnection implements IFactoryConnectionData {

  public type: "mysql" | "mariadb";
  private host:string;
  private port:number;
  private username: string;
  private password:string;
  private database:string;
  private logging: boolean = true;
  private synchronize: boolean = true;

  constructor(){
    const typeFromEnv = process.env.TYPE ?? "mysql";
    if (typeFromEnv !== "mysql" && typeFromEnv !== "mariadb") {
      throw new Error(`Invalid type: ${typeFromEnv}`);
    }
    this.type = typeFromEnv ?? "mysql";
    this.host = process.env.MYSQL_HOST ?? 'localhost';
    this.port = Number(process.env.MYSQL_PORT) ?? 3306;
    this.username = process.env.MYSQL_ROOT ?? 'root';
    this.password = process.env.MYSQL_PASSWORD ?? 'password';
    this.database = process.env.MYSQL_DB ?? 'prueba_tecnica';
  }

  conectar(): DataSource {
    console.log('Connection MySQL')
    return new DataSource({
      type: this.type,
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      entities: ["src/models/entities/*.js", "src/models/entities/*.ts"],
      logging: this.logging,
      synchronize: this.synchronize,
    });
  }
  disconnect(): boolean {
    console.log('Disconnection MySQL')
    return true;
  }
}

