import { HTTP_HOST } from '@/constant';
import HttpRequest from './axios';

// const baseUrl = process.env.NODE_ENV === "development" ? dev_url : pro_url;
const baseUrl = HTTP_HOST + 'jeecg-boot';
const axios = new HttpRequest(baseUrl);

export default axios;
