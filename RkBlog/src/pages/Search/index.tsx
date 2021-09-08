import { Pagination } from 'antd';
import React, { Fragment, useState } from 'react';
import { ArticleItem } from '../../components/Article';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { useArticles } from '../../hooks';
import style from './style.module.less';

export default function Search() {
  // const [val, setVal] = useState('');
  const [keyword, setKeyword] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState<'ctime' | 'preview'>('ctime');
  const {arts: articles, total, setRf} = useArticles(false, pageIndex, pageSize, sort, keyword);

  const getClassName = (type: 'ctime' | 'preview') => {
    if(type === sort) return `${style.tool_item} ${style.active}`;
    else return `${style.tool_item}`;
  }
  return (
    <div className={'container'}>
      <Header></Header>
      <div className={style.search}>
        <div className={style.search_btn}>
          <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10723" width="32" height="32"><path d="M400.704 801.408A400.64 400.64 0 1 1 400.704 0a400.64 400.64 0 0 1 0 801.408z m0-89.024a311.68 311.68 0 1 0 0-623.36 311.68 311.68 0 0 0 0 623.36z m267.264-110.4l314.752 314.88-62.912 62.912-314.816-314.816 62.976-62.976z" p-id="10724"></path></svg>
        </div>
        <input type="text" name="" id="" 
          placeholder='type to search...'
          value={keyword} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)} 
          onKeyUp={(e: React.KeyboardEvent) => {
            if(e.nativeEvent.keyCode === 13) {
              console.log('search');
              setRf(true);
            }
          }}
        />
        <div 
          className={style.del_btn} 
          style={{visibility: `${keyword.length > 0 ? 'visible' : 'hidden'}`}}
          onClick={() => setKeyword('')}
          >
          <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9790" width="32" height="32"><path d="M512 425.984l344.32-344.32a60.416 60.416 0 0 1 85.76 0.32 60.992 60.992 0 0 1 0.32 85.632L598.016 512l344.32 344.32a60.416 60.416 0 0 1-0.32 85.76 60.992 60.992 0 0 1-85.632 0.32L512 598.016l-344.32 344.32a60.416 60.416 0 0 1-85.76-0.32 60.992 60.992 0 0 1-0.32-85.632L425.984 512l-344.32-344.32a60.416 60.416 0 0 1 0.32-85.76 60.992 60.992 0 0 1 85.632-0.32L512 425.984z" p-id="9791"></path></svg>
        </div>
      </div>
      <div className={style.articles}>
        {!articles || articles.length === 0 ? 
          <div className="null">
            <span>
              <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2779" width="200" height="200"><path d="M581.2 272.7c0-18.9-15.3-34.1-34.1-34.1-108.1 0-205.2 61-252.3 155.4-8.4 16.9-1.6 37.4 15.3 45.8 16.9 8.4 37.4 1.6 45.8-15.3C391.4 353 465 306.8 547 306.8c18.9 0 34.2-15.3 34.2-34.1z" p-id="2780" ></path><path d="M239.9 511.6a34.1 34.1 0 1 0 68.2 0 34.1 34.1 0 1 0-68.2 0Z" p-id="2781"></path><path d="M1015.4 194.3c-32.9-57.4-129.5-51.8-269-4.1-2 0.7-3.9 1.6-5.7 2.6-61.5-40-134.8-63.2-213.6-63.2-216.7 0-392.4 175.7-392.4 392.5 0 8.3 0.3 16.5 0.8 24.7C28.7 642-21.8 721.7 10.4 777.7c28.5 49.6 115.3 51 233.4 16 71.4 74.5 172 121 283.3 121 216.7 0 392.4-175.7 392.4-392.5 0-37.8-5.4-74.4-15.3-109 94.7-88.5 140.5-167.9 111.2-218.9zM69.6 743.7c-7.1-12.4 20.3-57.5 79.5-116 10.8 38.6 27.3 74.9 48.6 107.7-74.8 19.7-122.1 18.8-128.1 8.3z m133.3-221.6c0-179.1 145.1-324.3 324.2-324.3 132.9 0 247 80 297.1 194.4-69.9 59.5-160.7 122.8-261.3 181.2-104.6 60.8-208.5 109.7-297 140.7-39.5-53.6-63-120.1-63-192z m324.2 324.3c-80.2 0-153.6-29.2-210.2-77.5 84.8-32 180.8-78.6 280.3-136.4 95.4-55.4 180.4-113.2 248.8-168.9 3.5 19 5.3 38.5 5.3 58.5 0 179.1-145.1 324.3-324.2 324.3zM877 344.2c-19-37.4-43.9-71.3-73.4-100.6 87.6-26.1 145.4-27.9 152.6-15.3 6.4 11.1-19.1 56.6-79.2 115.9z" p-id="2782"></path></svg>
            </span>
          </div> :
          <Fragment>
            <div className={style.toolbar}>
              <h2>
                Search results
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
            {total > 0 && 
              <Pagination 
                className='arts_pagination'
                total={total} 
                onChange={(page, size) => {
                  setPageIndex(page);
                  setPageSize(size || 10);
                }}
                showSizeChanger
                showTotal={(total, range) => `共 ${total} 条`}
              />}
          </Fragment>}
      </div>
      <Footer></Footer>
    </div>
  )
}