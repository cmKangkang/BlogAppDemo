import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IArticle, IUser } from '../interface';
import { getArticleInfoById, getUserInfo, searchAllArticles, searchUserArticles } from '../services/api';

export function useUserStateCheck() {
  const history = useHistory();
  const location = useLocation();
  const userStateCheck = async () => {
    const re = await getUserInfo();
    if(re.stat !== 'ok') {
      if(location.pathname === '/signup' || location.pathname === '/signin') {
        return;
      } else {
        message.info('登录过期，请重新登录！');
        history.push('/signin');
      }
    }   
  }
  useEffect(() => {
    userStateCheck();
  }, []);
}

/**
 * 文章列表hook
 * @param mark 初始是否请求, true: 初始请求， false: 初始不请求
 * @param pageIndex 
 * @param pageSize 
 * @param sort 
 * @param keyword 
 * @returns 
 */
export function useArticles(mark: boolean, pageIndex: number, pageSize: number, sort: 'ctime' | 'preview',  keyword='') {

  const [rf, setRf] = useState(mark);
  const [arts, setArts] = useState<IArticle[]>();
  const [total, setTotal] = useState(0);
  const getAllArticles = async () => {
    const hide = message.loading('文章加载中...');
    const data = {pageIndex, pageSize, keyword, sort};
    const re = await searchAllArticles(data);
    if(re.stat === 'ok') {
      // 请求成功
      setTimeout(hide, 300);
      const arts = Array.from(re.data.items) as IArticle[];
      setArts(arts);
      setTotal(re.data.total || 0);
    }
    setRf(false);
  }
  useEffect(() => {
    rf && getAllArticles();
  }, [pageIndex, pageSize, keyword, sort, rf]);

  return {arts, total, setRf};
}

/**
 * 
 * @param pageIndex 
 * @param pageSize 
 * @param sort 
 * @param keyword 
 * @returns {
 *   articles: 文章数据
 *   total: 总条数
 *   setRf: 设置刷新标志
 * }
 */
export function useUserArticles(pageIndex: number, pageSize: number, sort: 'ctime' | 'preview',  keyword='') {
  const [articles, setArticles] = useState<IArticle[]>();
  const [total, setTotal] = useState(0);
  const [rf, setRf] = useState(true);
  const getUserArticles = async () => {
    const data = {pageIndex, pageSize, keyword, sort};
    const re = await searchUserArticles(data);
    if(re.stat === 'ok') {
      // 请求成功
      const arts = Array.from(re.data.items) as IArticle[];
      setArticles(arts);
      setTotal(re.data.total || 0);
    }
    setRf(false);
  }
  useEffect(() => {
    rf && getUserArticles();
  }, [pageIndex, pageSize, keyword, sort, rf]);
  return {articles, total, setRf};
}

/**
 * 根据文章id请求文章
 * @param id 
 * @returns 
 */
export function useArticle(id: string): IArticle {
  const [art, setArt] = useState<IArticle>();
  const getArticle = async (id: string) => {
    const hide = message.loading('文章加载中...');
    let re = await getArticleInfoById(id);
    if(re.stat === 'ok') {
      setTimeout(hide, 300);
      setArt(re.data.info);
    }
  }
  useEffect(()  => {
    getArticle(id);
  }, [id]);
  return art as IArticle;
}

/**
 * 添加或修改文章hook
 * @param id 
 * @returns 
 */
export function useAddOrNewArticle(id?: string) {
  const [tit, setTit] = useState<string>('');
  const [sub, setSub] = useState<string>('');
  const [tag, setTag] = useState<string[]>([]);
  const [ban, setBan] = useState<string[]>([]);
  const [cnt, setCnt] = useState<string>('');
  
  const getArticle = async (id: string) => {
    let re = await getArticleInfoById(id);
    if(re.stat === 'ok') {
      setArticle(re.data.info);
    }
  }

  const setArticle = (item: {
    title?: string,
    subTitle?: string,
    tags?: string[],
    banner?: string[],
    content?: string
  }) => {
    const entries = Object.entries(item);
    for(const [key, val] of entries) {
      switch(key) {
        case 'title': setTit(val as string); break;
        case 'subTitle': setSub(val as string); break;
        case 'tags': setTag(val as string[]); break;
        case 'banner': setBan(val as string[]); break;
        case 'content': setCnt(val as string); break;
      }
    }
  }

  useEffect(() => {
    if(id) getArticle(id);
  }, []);

  return {
    article: {
      title: tit,
      subTitle: sub,
      tags: tag,
      banner: ban,
      content: cnt
    },
    setArticle: setArticle
  }
}

export function useRefresh() {
  const [rf, setRf] = useState(false);
  useEffect(() => {
    rf && setRf(false);
  }, [rf]);
  return {rf, setRf};
}

