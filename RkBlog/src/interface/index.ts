export enum Status {
  delete = -1,
  normal
}

export interface IAccount {
  account: string,
  pwd: string
}

export interface IUser {
  nickname: string,
  avatar: string, // 头像
  ctime: number,
  status: number,
  _id: string,
  account: string
}

export interface IArticle {
  _id: string,
  content: string,
  title: string,
  subTitle: string,
  tags: string[],
  ctime: number, // 创建时间
  mtime: number, // 修改时间
  status?: number,
  banner: string[],
  preview: number,
  author: IUser
}

export interface ITag {
  title: string,
  ctime: number,
  status?: Status,
}


// response
export interface IResponse {
  stat: string,
  data?: any,
  msg?: string
}

// request
export interface IArticleSearchRequest {
  pageIndex: number,
  pageSize: number,
  keyword: string,
  sort: 'ctime' | 'preview'
}

export interface IArticleRequest {
  content: string,
  title: string,
  subTitle: string,
  tags: string[],
  banner?: string[]
}