import { useHistory } from 'react-router-dom';
import { imagePreviewBaseUrl } from '../../../data'
import moment from "moment";
import './style.less';
import React from "react";
import defaultBanner from '../../../assets/img/md_1.svg';

interface Props {
  // data: IArticle
  id: string,
  title: string,
  ctime: number,
  preview: number,
  author: string,
  banner: string[]
}
export default function ArticleItem(props: Props) {
  const history = useHistory();
  return (
    <div 
      className={'art'}
      onClick={(e: React.MouseEvent) => {
        // 点击，进入文章详情页
        console.log('点击了文章' + props.title);
        let url = '/article/' + props.id;
        history.push(url);
      }}
      >
      <div className='art_banner'>
        {
          props.banner[0] && <img src={imagePreviewBaseUrl + props.banner[0]} alt={props.title} />
            || <img src={defaultBanner} alt="Banner" />
        }
        
      </div>
      <div className='art_info'>
        <div className='art_title' title={props.title}>
          {props.title}
        </div>
        <div className='art_info_main'>
          <div className=''>
            {moment(props.ctime).format('LL')}
          </div>
          <div>
            <div className='art_auth'>
              <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4876" width="16" height="16"><path d="M296.107 598.87c-9.942 26.623-18.347 51.2-25.856 76.074 40.96-29.739 89.642-48.597 145.834-55.637 107.222-13.398 202.496-84.182 250.71-173.142l-62.123-62.08 60.288-60.373 42.667-42.71c18.346-18.346 39.04-52.223 60.928-101.034C529.92 216.96 383.787 363.093 296.064 598.869z m429.226-214.827L768 426.667c-42.667 128-170.667 256-341.333 277.333-113.878 14.25-185.003 92.459-213.419 234.667H128c42.667-256 128-853.334 768-853.334-42.667 127.872-85.248 213.163-127.872 255.872l-42.795 42.838z" fill="#8a8a8a" p-id="4877"></path></svg>
              {props.author}
            </div>
            <div className='art_view'>
              <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2061" width="16" height="16"><path d="M610.944 461.968C648.384 536.608 593.6 624 510.88 624c-61.76 0-111.44-50.24-111.44-112S448 400 512 400v-80c-112 0-192.56 86.128-192.56 192s85.568 192 191.44 192 192-86.128 192-192c0-30.848-7.472-59.92-20.464-85.76l-71.472 35.728zM510.88 176c-240.64 0-448 225.376-448 336 0 110.64 207.36 336 448 336s448.016-225.36 448.016-336c0-110.624-207.376-336-448-336z m0 592c-207.104 0-368-204.192-368-256 0-51.808 160.896-256 368-256s368 204.192 368 256c0 51.808-160.896 256-368 256z" fill="#bfbfbf" p-id="2062"></path></svg>
              {props.preview}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}