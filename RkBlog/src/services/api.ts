import { del, get, post, put, upload } from "./request"; 
import { IAccount, IArticleRequest, IArticleSearchRequest, IResponse } from '../interface'
// 1 用户
// 1.1 注册
export function signUp(data: IAccount) {
  return post<IResponse>('/auth/signup', data);
}

// 1.2 登录
export function signIn(data: IAccount) {
  return post<IResponse>('/auth/signin', data);
}

// 1.3 登出
export function signOut() {
  return post<IResponse>('/auth/signOut');
}

// 1.4 更新用户信息
export function updateUserInfo(data: {avatar: string, nickname: string}) {
  return put<IResponse>('/user/updateUserInfo', data);
}

// 1.5 修改密码
export function updateUserPwd(data: {oldPwd: string, newPwd: string}) {
  return put<IResponse>('/user/updatePwd', data);
}

// 1.6 获取用户信息
export function getUserInfo() {
  return get<IResponse>('/user/userInfo');
}

// 2. 文章
// 2.1 按token、关键词搜素
export function searchUserArticles(data: IArticleSearchRequest) {
  return post<IResponse>('/article/searchOwner', data);
}

// 2.2 按关键词搜素,全部用户
export function searchAllArticles(data: IArticleSearchRequest) {
  return post<IResponse>('/article/searchAll', data)
}

// 2.3 添加文章
export function addArticle(data: IArticleRequest) {
  return post<IResponse>('/article/add', data);
}

// 2.4 删除文章
export function deleteArticleById(id: string) {
  return del<IResponse>('/article/' + id);
}

// 2.5 编辑文章
export function editArticleById(id: string, data: IArticleRequest) {
  return put<IResponse>('/article/' + id, data);
}

// 2.6 获取文章信息
export function getArticleInfoById(id: string) {
  return get<IResponse>('/article/' + id);
}

// 3. 文件
// 3.1 上传文件
export function uploadFile(data: FormData) {
  return upload<IResponse>('/file/upload', data);
}

// 3.2 根据key下载文件
export function downloadFile(key: string) {
  return get<File>('file/download/' + key);
}

// 3.3 根据key访问(预览)文件
export function getFile(key: string) {
  return get<Buffer>('/file/preview' + key);
}
