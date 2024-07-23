const CONSTANTES = {
  PAGE_NOT_FOUND: (name:string) => `Page ${name} not found`,
  URL_ENDPOINT_LOCAL: `http://localhost:3001`,
  MESSAGE: (message: string, status: 'success' | 'error' | 'warning' | 'info') => ({ status, message}),
  ERROR_UNKNOWN: (name:string) => `Unknown error: ${name}`
}

Object.freeze(CONSTANTES)

export default CONSTANTES;