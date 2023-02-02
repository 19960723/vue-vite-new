import { BASE_RUL } from '@/constant';
import HttpRequest from './axios';

// const baseUrl = process.env.NODE_ENV === "development" ? dev_url : pro_url;
const axios = new HttpRequest(BASE_RUL);

export default axios;
