import axios from 'axios';

const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_API;

if (!serverBaseUrl) {
  console.log('Check backend base url');
  process.exit(1);
}

const ins = axios.create({
  baseURL: serverBaseUrl,
});
export { serverBaseUrl };
export { ins as axios };
