import { useState } from 'react';
import { ArticleItem } from '../../components/Article';
import Header from '../../components/Header';
import { Pagination } from 'antd';
import 'antd/lib/pagination/style';
import style from './style.module.less';
import 'bytemd/dist/index.min.css';
// 代码高亮
import 'highlight.js/styles/atom-one-light.css';
import { useArticles, useUserStateCheck } from '../../hooks';
import Footer from '../../components/Footer';
export default function Home() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState<'ctime' | 'preview'>('ctime');
  const { arts: articles, total, setRf} = useArticles(true, pageIndex, pageSize, sort);
  const getClassName = (type: 'ctime' | 'preview') => {
    if(type === sort) return `${style.tool_item} ${style.active}`;
    else return `${style.tool_item}`;
  }
  return (
    <div className='container'>
      <Header></Header>
      <div className={style.show}>
        <div className={style.slogan}>
          <h1>We are </h1>
          <h1>talking here...</h1>
        </div>
      </div>
      <div className={style.articles}>
        <div className={style.toolbar}>
          <h2>
            {
              sort === 'ctime' ? 'Latest Posts' : 'Popular Posts'
            }
          </h2>
          <div className={style.right}>
            <div className={getClassName('preview')} onClick={() => {
              setSort('preview');
              setRf(true);
              }}>
              <span>Views</span>
              <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18918" width="16" height="16"><path d="M916.996 133.943H538.56c-20.904 0-37.84 16.858-37.84 37.664s16.937 37.67 37.84 37.67h378.435c20.898 0 37.84-16.858 37.84-37.67 0.001-20.8-16.942-37.664-37.839-37.664z m0 0M765.616 585.957h-227.05c-20.904 0-37.845 16.858-37.845 37.671 0 20.802 16.948 37.665 37.846 37.665h227.049c20.902 0 37.845-16.858 37.845-37.665-0.001-20.807-16.95-37.67-37.845-37.67z m0 0M689.93 811.969H538.56c-20.898 0-37.84 16.858-37.84 37.665 0 20.806 16.949 37.67 37.84 37.67H689.93c20.904 0 37.846-16.864 37.846-37.67 0-20.802-16.948-37.665-37.845-37.665z m0 0M841.306 359.948H538.56c-20.898 0-37.84 16.864-37.84 37.67 0 20.802 16.931 37.67 37.84 37.67h302.746c20.898 0 37.843-16.863 37.843-37.67 0.001-20.8-16.935-37.67-37.843-37.67z m0 0M386.43 770.763H273.783V100.97c0-20.802-16.942-37.66-37.84-37.66-20.908 0-37.844 16.859-37.844 37.66v669.794H85.451c-20.891 0-26.21 12.266-11.872 27.4l144.649 152.635c8.967 9.466 23.558 9.519 32.601 0.132l147.26-152.975c14.452-15.007 9.239-27.192-11.66-27.192z m0 0" p-id="18919"></path></svg>
            </div>
            <div className={getClassName('ctime')} onClick={() => {
              setSort('ctime');
              setRf(true);
              }}>
              <span>Time</span>
              <svg className="icon" viewBox="0 0 1075 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23261" width="16" height="16"><path d="M936.8576 513.6896a424.2944 424.2944 0 1 0-424.2944 424.2432c56.3712 0 56.3712 84.7872-0.4096 84.9408a510.8736 510.8736 0 1 1 509.5424-504.8832c-0.7168 55.0912-80.9984 62.1568-84.8384-4.4032v0.1024zM706.304 307.2a32.6656 32.6656 0 0 1 20.5312 58.0096l-239.1552 239.104a32.5632 32.5632 0 0 1-48.0768-0.9216l-21.4016-21.4528 0.1024-0.1024-100.5056-100.5056a32.6656 32.6656 0 1 1 45.9776-46.3872l100.7616 100.7104 216.832-216.8832A32.5632 32.5632 0 0 1 706.304 307.2z" p-id="23262"></path><path d="M930.304 584.96c16.3328 0 29.5424 13.2096 29.5424 29.5936v301.7728l61.44-61.44a29.5424 29.5424 0 1 1 41.8816 41.5744l-105.6768 105.5232a32.2048 32.2048 0 0 1-23.3472 9.7792 33.3312 33.3312 0 0 1-33.3312-31.8976v-365.312c0-16.384 13.2096-29.5936 29.5424-29.5936zM547.328 657.92h218.9824c24.32 0 36.4544 12.1856 36.4544 36.5056 0 24.3712-12.1344 36.5056-36.4544 36.5056H547.328c-24.32 0-36.4544-12.1344-36.4544-36.5056 0-24.32 12.1344-36.4544 36.4544-36.4544zM620.3392 803.9424h145.92c24.3712 0 36.5056 12.1344 36.5056 36.4544s-12.1344 36.5056-36.4544 36.5056h-145.9712c-24.32 0-36.5056-12.1856-36.5056-36.5056s12.1856-36.4544 36.5056-36.4544zM693.2992 949.8624h73.0112c24.32 0 36.4544 12.1856 36.4544 36.5056s-12.1344 36.5056-36.4544 36.5056H693.248c-24.32 0-36.4544-12.1856-36.4544-36.5056s12.1344-36.5056 36.4544-36.5056z" p-id="23263"></path></svg>
            </div>
          </div>
        </div>
        <div className={style.list}>
          {articles?.map(art => 
            <ArticleItem 
              id={art._id} 
              title={art.title} 
              preview={art.preview} 
              author={art.author.nickname} 
              banner={art.banner} 
              key={art._id}
              ctime={art.ctime}/>
            )}
        </div>
        {
          total > 0 && 
          <Pagination
            className='arts_pagination'
            total={total} 
            onChange={(page, size) => {
              setPageIndex(page);
              setPageSize(size || 10);
              setRf(true);
            }}
            showSizeChanger
            showTotal={(total, range) => `共 ${total} 条`}
            />
        }
      </div>
      <Footer></Footer>
    </div>
  )
}