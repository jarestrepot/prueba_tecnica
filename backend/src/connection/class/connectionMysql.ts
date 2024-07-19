import { IFactoryConnectionData } from "../Factory";

export default class MYSQLConnection implements IFactoryConnectionData{

  private db:string;
  private root: string;
  private password:string;
  private host:string;

  constructor(){
    this.db = process.env.MYSQL_DB ?? '';
    this.root = process.env.MYSQL_ROOT ?? 'root';
    this.password = process.env.MYSQL_PASSWORD ?? '';
    this.host = process.env.MYSQL_HOST ?? 'localhost';
  }
  conectar(): boolean {
    console.log('Connection MySQL')
    return true;
  }
  disconnect(): boolean {
    console.log('Disconnection MySQL')
    return true;
  }
}

