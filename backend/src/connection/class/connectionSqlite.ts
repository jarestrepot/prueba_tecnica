import { IFactoryConnectionData } from "../Factory";

export default class SQLiteConnection implements IFactoryConnectionData {
  constructor(){}
  conectar(): boolean {
    console.log('Connection SqLite')
    return true;
  }
  disconnect(): boolean {
    console.log('Disconnection SqLite')
    return true;
  }

}