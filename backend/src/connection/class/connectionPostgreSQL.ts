import { IFactoryConnectionData } from "../Factory";

export default class POSTGREConnection implements IFactoryConnectionData {

  constructor(){

  }
  conectar(): boolean {
    console.log("Connection PostgreSQL");
    return true;
  }
  disconnect(): boolean {
    console.log("Disconnection PostgreSQL");
    return true;
  }
}