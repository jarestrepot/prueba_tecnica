import { DataSource } from "typeorm";

export interface IFactoryConnectionData {
  conectar(): DataSource;
  disconnect():boolean;
}

