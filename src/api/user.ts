import axios from '@/utils/request';
// import qs from 'qs';

export const loginApi = (data: any) => axios.post('/sys/imLogin', { ...data });
