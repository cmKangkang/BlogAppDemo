import { useHistory } from 'react-router-dom';
import { imagePreviewBaseUrl } from '../../../data'
import moment from "moment";
import './style.less';
import React from "react";
import defaultBanner from '../../../assets/img/md_2.svg';

interface Props {
  id: string,
  title: string,
  ctime: number,
  mtime: number, // 编辑时间
  preview: number,
  banner: string[],
  subTitle?: string,
  tags?: string[],
  children?: any
}
export default function UserArticleItem(props: Props) {
  const history = useHistory();
  return (
    <div 
      className='user_art'
      >
      <div 
        className='user_art_banner'
        onClick={(e: React.MouseEvent) => {
          // 点击，进入文章详情页
          let url = '/article/' + props.id;
          history.push(url);
        }}
        >
        {/* 绝对定位，置于底层 */}
        {
          props.banner[0] && <img src={imagePreviewBaseUrl + props.banner[0]} alt={props.title} /> 
            || <img src={defaultBanner} alt="Banner" />
        }
      </div>
      <div 
        className='user_art_info'
        onClick={(e: React.MouseEvent) => {
          // 点击，进入文章详情页
          let url = '/article/' + props.id;
          history.push(url);
        }}
        >
        <h2 className='user_art_title' title={props.title}>
          {props.title}
        </h2>
        <h3 title={props.subTitle}>
          {props.subTitle}
        </h3>
        <span title='标签'>
          <svg className="icon" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5272" width="200" height="200"><path d="M1251.882 587.646L843.646 995.882c-37.492 37.492-98.276 37.49-135.764 0l-0.72-0.72L1184 519.764 662.794 0h97.442a96 96 0 0 1 67.882 28.118l423.764 423.764c37.49 37.49 37.49 98.274 0 135.764z m-256 0L587.646 995.882C568.902 1014.628 544.332 1024 519.764 1024c-24.568 0-49.138-9.372-67.882-28.118L28.118 572.118A96 96 0 0 1 0 504.236V96C0 42.98 42.98 0 96 0h408.236a95.996 95.996 0 0 1 67.882 28.118l423.764 423.764c37.49 37.49 37.49 98.274 0 135.764zM928 519.764L504.236 96H96v408.236l423.772 423.756L928 519.764zM288 192c-53.02 0-96 42.98-96 96s42.98 96 96 96 96-42.98 96-96-42.98-96-96-96z" p-id="5273"></path></svg>
          {props.tags?.join(', ')}
        </span>
        <span title='创建时间'>
          <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4055" width="32" height="32"><path d="M512 895.6c-211.5 0-383.6-172.1-383.6-383.6S300.5 128.4 512 128.4 895.6 300.5 895.6 512c0 17.7 14.3 32 32 32s32-14.3 32-32c0-246.7-200.8-447.5-447.5-447.5S64.5 265.3 64.5 512 265.3 959.5 512 959.5c17.7 0 32-14.3 32-32 0-17.6-14.3-31.9-32-31.9z" p-id="4056"></path><path d="M512 191.3c-17.7 0-32 14.3-32 32v275.5L361.5 617.3c-12.5 12.5-12.5 32.7 0 45.2 6.2 6.2 14.4 9.4 22.6 9.4 8.2 0 16.4-3.1 22.6-9.4L534.2 535c2-2 3.8-4.2 5.2-6.7 0 0 0-0.1 0.1-0.1 0.2-0.4 0.5-0.8 0.7-1.2 0-0.1 0.1-0.1 0.1-0.2l0.6-1.2c0-0.1 0.1-0.1 0.1-0.2 0.2-0.4 0.4-0.8 0.5-1.2 0-0.1 0.1-0.1 0.1-0.2 0.2-0.4 0.3-0.8 0.5-1.3 0-0.1 0-0.1 0.1-0.2 0.1-0.4 0.3-0.8 0.4-1.3 0-0.1 0-0.1 0.1-0.2 0.1-0.4 0.2-0.9 0.3-1.3 0-0.1 0-0.2 0.1-0.2 0.1-0.4 0.2-0.8 0.3-1.3 0-0.1 0-0.2 0.1-0.3 0.1-0.4 0.1-0.8 0.2-1.2 0-0.2 0-0.3 0.1-0.5 0-0.4 0.1-0.7 0.1-1.1 0-0.2 0-0.5 0.1-0.7 0-0.3 0-0.5 0.1-0.8V223.3c-0.1-17.7-14.4-32-32.1-32zM927.2 735.7H799.4V607.8c0-17.7-14.3-32-32-32s-32 14.3-32 32v127.9H607.6c-17.7 0-32 14.3-32 32s14.3 32 32 32h127.9v127.9c0 17.7 14.3 32 32 32s32-14.3 32-32v-128h127.9c17.7 0 32-14.3 32-32-0.2-17.6-14.5-31.9-32.2-31.9z" p-id="4057"></path></svg>
          {moment(props.ctime).format('YYYY-MM-DD HH:MM:SS')}
        </span>
        <span title='最近编辑时间'>
          <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6854" width="32" height="32"><path d="M512.170667 57.059556c251.349333 0 455.111111 203.761778 455.111111 455.111111a42.666667 42.666667 0 1 1-85.333334 0c0-204.231111-165.546667-369.777778-369.777777-369.777778s-369.777778 165.546667-369.777778 369.777778 165.546667 369.777778 369.777778 369.777777a42.666667 42.666667 0 1 1 0 85.333334c-251.349333 0-455.111111-203.761778-455.111111-455.111111 0-251.349333 203.761778-455.111111 455.111111-455.111111zM753.777778 568.888889c109.966222 0 199.111111 89.144889 199.111111 199.111111s-89.144889 199.111111-199.111111 199.111111-199.111111-89.144889-199.111111-199.111111 89.144889-199.111111 199.111111-199.111111z m0 56.888889c-78.549333 0-142.222222 63.672889-142.222222 142.222222s63.672889 142.222222 142.222222 142.222222 142.222222-63.672889 142.222222-142.222222-63.672889-142.222222-142.222222-142.222222z m80.455111 41.656889l20.110222 20.110222a28.444444 28.444444 0 0 1 0 40.234667l-122.410667 122.396444a28.444444 28.444444 0 0 1-20.110222 8.334222h-34.332444a14.222222 14.222222 0 0 1-14.222222-14.222222V809.955556a28.444444 28.444444 0 0 1 8.334222-20.110223l122.396444-122.410666a28.444444 28.444444 0 0 1 40.234667 0zM526.222222 227.555556a28.444444 28.444444 0 0 1 28.444445 28.444444v248.391111a85.333333 85.333333 0 0 1-33.038223 67.427556l-120.632888 93.539555a28.444444 28.444444 0 0 1-39.793778-4.878222l-16.355556-20.807111a28.444444 28.444444 0 0 1 4.906667-40.064l110.151111-85.418667a28.444444 28.444444 0 0 0 11.008-22.471111V256a28.444444 28.444444 0 0 1 28.444444-28.444444z" p-id="6855"></path></svg>
          {moment(props.mtime).format('YYYY-MM-DD HH:MM:SS')}
        </span>
        <span title='浏览量'>
          <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2061" width="16" height="16"><path d="M610.944 461.968C648.384 536.608 593.6 624 510.88 624c-61.76 0-111.44-50.24-111.44-112S448 400 512 400v-80c-112 0-192.56 86.128-192.56 192s85.568 192 191.44 192 192-86.128 192-192c0-30.848-7.472-59.92-20.464-85.76l-71.472 35.728zM510.88 176c-240.64 0-448 225.376-448 336 0 110.64 207.36 336 448 336s448.016-225.36 448.016-336c0-110.624-207.376-336-448-336z m0 592c-207.104 0-368-204.192-368-256 0-51.808 160.896-256 368-256s368 204.192 368 256c0 51.808-160.896 256-368 256z" p-id="2062"></path></svg>
          {props.preview}
        </span>
      </div>
      {/* <div className='user_func_btn' onClick={e =>  {
        e.stopPropagation();
        setCollapse(!collapse);
      }}>
        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26194" width="32" height="32"><path d="M512 128m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" p-id="26195"></path><path d="M512 512m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" p-id="26196"></path><path d="M512 896m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" p-id="26197"></path></svg>
        <nav className={!collapse ? 'user_func_menu' : 'user_func_menu collapse'}>
          <li className='func_menu_item' onClick={e => {
            e.stopPropagation();
            let url = '/article/' + props.id + '/edit';
            history.push(url, {
              id: props.id
            });
          }}>编辑</li>
          <li className='func_menu_item' onClick={e => {
            e.stopPropagation();
            handleDelete(props.id);
          }}>删除</li>
        </nav>
      </div> */}
      {
        props.children
      }
    </div>
  )
}

function FuncMenu() {
  return (
    <div className='user_func_btn'>
      <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26194" width="32" height="32"><path d="M512 128m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" p-id="26195"></path><path d="M512 512m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" p-id="26196"></path><path d="M512 896m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" p-id="26197"></path></svg>
      <nav className='user_func_menu'>
        <li className='func_menu_item'>编辑</li>
        <li className='func_menu_item'>删除</li>
      </nav>
    </div>
  )
}