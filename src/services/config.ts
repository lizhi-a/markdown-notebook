// const devBaseURL = 'http://123.207.32.32:9001';
const devBaseURL = 'http://localhost:5000';
// const proBaseURL = 'https://production.org';
const proBaseURL = 'http://localhost:5000';


export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;

export const TIMEOUT = 5000;


