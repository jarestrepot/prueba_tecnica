import { IFactoryConnectionData } from "../Factory";

export default class MONGOConnection implements IFactoryConnectionData {
  constructor(){}
  conectar(): boolean {
    console.log('Connection Mongo db')
    return true;
  }
  disconnect(): boolean {
    console.log('Disconnect mongo db')
    return true;
  }
}

