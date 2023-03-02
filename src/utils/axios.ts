import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  // AxiosPromise,
  Canceler,
} from 'axios';
import { useUserStore } from '@/store/modules/user';
import qs from 'qs';

const CancelToken = axios.CancelToken;
//

export interface HttpResponse {
  code: number;
  data?: any;
  result?: any;
  message?: string | Record<string, any>;
  success?: Boolean;
  timestamp?: number | String;
  total?: number;
  count?: number;
  favs?: number;
  lastSign?: string;
  isCollect?: boolean;
  token?: string;
  notify?: any;
  userInfo?: any;
}

class HttpRequest {
  private baseUrl: string;
  pendingMap: Map<string, Canceler>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.pendingMap = new Map<string, Canceler>();
  }
  // 基础配置
  // baseConfig() {
  //   return {
  //     baseURL: this.baseUrl ? this.baseUrl : process.env.API_ROOT,
  //     withCredentials: true,
  //     headers: {
  //       'Content-Type': 'application/json;charset=UTF-8',
  //     },
  //     timeout: 10000,
  //   };
  // }

  // 获取axios配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      timeout: 10000,
    };
    return config;
  }
  // 取消重复请求
  removePending(key: string, isRequest = false) {
    if (this.pendingMap.has(key) && isRequest) {
      const cancel = this.pendingMap.get(key);
      cancel && cancel(key);
      this.pendingMap.delete(key);
      // this.pending[key]('取消重复请求');
    }
  }

  // 拦截器
  interceptors(service: AxiosInstance) {
    service.interceptors.request.use(
      (config) => {
        const userStore = useUserStore();
        const token = userStore.token;
        if (token) {
          config.headers['X-Access-Token'] = token;
          // config.headers && config.headers.common['X-Access-Token'] = token;
          // config.headers && config.headers.common.setAuthorization(`Bearer ${token}`);
        }
        // 生成唯一的key   判断请求
        const key = [
          config.url,
          config.method,
          qs.stringify(config.params),
          qs.stringify(config.data),
        ].join('&');
        this.removePending(key, true);
        config.cancelToken = new CancelToken((c: any) => {
          this.pendingMap.set(key, c);
        });
        return config;
      },
      (err) => {
        return Promise.reject(err);
      },
    );
    service.interceptors.response.use(
      (res: AxiosResponse) => {
        const key = res.config.url + '&' + res.config.method;
        this.removePending(key);
        if (res.status === 200) {
          return Promise.resolve(res.data);
        } else {
          return Promise.reject(res);
        }
      },
      (err) => {
        // let { message } = err;
        // if (message == '取消重复请求') {
        // } else {
        //   Message.error('服务器错误');
        // }
        return Promise.reject(err);
      },
    );
  }
  // 创建实例
  request(options: AxiosRequestConfig) {
    const instance = axios.create();
    const newOptions = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance);
    return instance(newOptions);
  }

  // 请求方法
  post(url: string, data?: unknown): Promise<AxiosResponse> | HttpResponse {
    return this.request({
      method: 'post',
      url: url,
      data: data,
    });
  }
  get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> | Promise<HttpResponse> {
    const options = Object.assign(
      {
        method: 'get',
        url: url,
      },
      config,
    );
    return this.request(options);
  }
  put(url: string, data?: unknown) {
    return this.request({
      method: 'put',
      url: url,
      data: data,
    });
  }
  update() {}
  download() {}
  delete(url: string, data?: unknown) {
    const options = Object.assign(
      {
        method: 'delete',
        url: url,
      },
      data,
    );
    return this.request(options);
  }
}

export default HttpRequest;
