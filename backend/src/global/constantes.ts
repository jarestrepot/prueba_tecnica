export enum ConnectionData {
  MYSQL="MYSQL",
  MONGO="MONGO",
  SQLITE="SQLITE",
  POSTGRADED="POSTGRADE"
}

export const CONSTANTES = {
  conections: ConnectionData
}

Object.freeze(CONSTANTES);