import axios from '@/utils/request';
// import qs from 'qs';

// 收件箱列表
export const getReceiveEmailListApi = (data: any) =>
  axios.post('/mailbox/mailContent/list?', { ...data });
// 已发送列表
export const getSendEmailListApi = (data: any) =>
  axios.post('/mailbox/mailContent/send/list?', { ...data });
