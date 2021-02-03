// export const API_DOMAIN = 'http://localhost:8001';
export const API_DOMAIN = process.env.REACT_APP_API_URL || 'https://api.reserly.mx';
export const URL_API = `${API_DOMAIN}/api/manager_v1`;
export const APP_NAME = 'Reserly';
export const TOKEN_MAPBOX = process.env.REACT_APP_TOKEN_MAPBOX || '';
