export enum ConnectionData {
  MYSQL="MYSQL",
  MONGO="MONGO",
  SQLITE="SQLITE",
  POSTGRADED="POSTGRADE"
}

export const CONSTANTES = {
  conections: ConnectionData,
  ACCESS_DENIED: 'Access denied ❌',
  USER: {
    CREATE_SUCCESSFUL: (name: string) => `User ${name} create successful`,
    EXISTS_USER: (name: string) => `User ${name} already exits`,
    DELETE_SUCCESSFUL: (name: string) => `User ${name} deleted successful`,
    DELETE_ERROR: (name: string) => `User ${name}: No data was deleted`,
    UPDATED_SUCCESSFUL: (name: string) => `User ${name}: uptadet successful`,
    NOT_FOUND: `User not found`,
    FOUND: (name: string) => `User ${name} found`,
    UNKNOWN_ERROR: (implementation:string) => `Error User ${implementation}`,
    DATA_REQUIRED: (itemsRequired: string[]) => {
      let data = '';
      for (let item of itemsRequired) {
        data += ` ${item}`;
      }
      return `The following user fields are required: ${data}`
    },
    CREDENCIALS_ERROR: `Invalid credentials`,
  },
  ERROR_SERVER: 'Server internal error!',
  ADDRESS: {
    CREATE_SUCCESSFUL: (name: string) => `Address ${name} create successful`,
    EXISTS_USER: (name: string) => `Address ${name} already exits`,
    DELETE_SUCCESSFUL: (name: string) => `Address ${name} deleted successful`,
  },
  NULL_QUERY: (name: string) => `Query error: ${name}`,
  ERROR_CREATE: (name: string) => `Error creating entity: ${name}`,
  ERROR_AUTH: (name: string) => `The token was not generated for the user ${name} for unknown reasons`
}

Object.freeze(CONSTANTES);