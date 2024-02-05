const production = "https://parkingi.azurewebsites.net"

const development = "http://localhost:8080"


export const api_address = process.env.NODE_ENV === 'production'? production: development;