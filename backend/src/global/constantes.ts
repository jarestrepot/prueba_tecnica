export enum ConectionData {
  MYSQL="MYSQL",
  MONGO="MONGO",
  SQLITE="SQLITE",
  POSTGRADED="POSTGRADE"
}

export const CONSTANTES = {
  conections: ConectionData
}

Object.freeze(CONSTANTES);