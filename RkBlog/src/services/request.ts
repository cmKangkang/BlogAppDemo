import axios from 'axios';
import { message } from 'antd';
// import { useHistory } from 'react-router';
// const BS_URL = 'http://127.0.0.1:10086';
// const history = useHistory();
const BS_URL = '/api';

const instance = axios.create({
  baseURL: BS_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials: true,
});

const formdata = axios.create({
  baseURL: BS_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true
});

// request拦截器
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response拦截器
instance.interceptors.response.use(
  response => {
    const data = response.data;
    // if(window.location.pathname !== '/sigin' && window.location.pathname !== '/signup')
    //   if(data.stat === 'User_Not_Signed' || data.stat === 'User_Login_Expired') {
    //     message.error('用户未登录或登录过期，请重新登录！');
    //     console.log(data.stat);
    //     // history.push('/signin');
    //     window.location.href = '/signin';
    //   }
    return data;
  },
  error => {
    return Promise.reject(error);
  }
);

formdata.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error);
  }
);

formdata.interceptors.response.use(
  response => {
    // return response.data;
    const data = response.data;
    // if(data.stat === 'User_Not_Signed' || data.stat === 'User_Login_Expired') {
    //   message.error('用户未登录或登录过期，请重新登录！');
    //   // history.push('/signin');
    //   window.location.href = '/signin'
    // }
    return data;
  },
  error => {
    return Promise.reject(error);
  }
);

export const post = async <T>(url: string, params?: object) => {
  console.log(params);
  let res: T = await instance.post(url, params);
  console.log(res);
  return res;
}

export const del = async <T>(url: string) => {
  let res: T = await instance.delete(url);
  console.log(res);
  return res;
}

export const put = async <T>(url: string, data?: any) => {
  let res: T = await instance.put(url, data);
  console.log(res);
  return res;
}

export const get = async <T>(url: string) => {
  let res: T = await instance.get(url);
  console.log(res);
  return res;
}

export const upload = async <T>(url: string, data: FormData) => {
  let res: T = await formdata.post(url, data);
  console.log(res);
  return res;
}