import React, { useEffect, Fragment } from 'react';
import { useAddOrNewArticle } from '../../../hooks';
import { useLocation, useHistory } from 'react-router-dom';
import { Editor } from '@bytemd/react';
import highlight from '@bytemd/plugin-highlight'
import gfm from '@bytemd/plugin-gfm';
import { uploadImages } from '../../../services/action';
import style from './style.module.less';
import TagGroup from '../../../components/Tag';
import { message } from 'antd';
import { editArticleById, uploadFile } from '../../../services/api';
import ImageUpload from '../../../components/Upload';
import { imagePreviewBaseUrl } from '../../../data';
import ToolBtn from '../../../components/ToolBtn';
import Input from '../../../components/Input';
import Footer from '../../../components/Footer';


const plugins = [
  highlight(),
  gfm()
]

export default function ArticleEidtor() {
  const location = useLocation<{id: string}>();
  const history = useHistory();
  const id = location.state.id || '';
  useEffect(() => {
    if(id.length === 0) {
      // 无id，
      message.warning('页面走丢了!');
      history.goBack();
    }
  }, []);
  const {article, setArticle} = useAddOrNewArticle(id);
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    let re = await editArticleById(id, article);
    if(re.stat === 'ok') {
      // 成功
      message.info('文章编辑成功！');
      history.goBack();
    } else {
      message.error('文章编辑失败！' + re.stat + re.msg);
    }
  }

  const handleUpload = async (files: File[]) => {
    const list = files?.map(file => {
      let formData = new FormData();
      formData.append('files', file);
      return uploadFile(formData);
    });
    const res = await Promise.all([...list]);
    let banns: string[] = [];
    res.forEach(re => {
      if(re.stat === 'ok') banns.push(re.data);
    });
    setArticle({
      banner: banns
    });
    message.success('图片上传成功！');
  }

  return (
    <Fragment>
      <h1 className={style.title}>文章编辑</h1>

      <form className={style.info} onSubmit={handleSubmit} onKeyDown={(e: React.KeyboardEvent) => {
        if(e.nativeEvent.keyCode === 13) return false;
      }}>
        <div className={style.info_item}>
          {/* <label htmlFor="title">标题</label> */}
          <Input type="text" label='标题' name='title' 
            value={article.title} 
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => {
                setArticle({title: e.target.value});
              }
            } 
            style={{width: '400px'}}
            rules={{
              required: true,
              maxLength: 128,
              minLength: 1
            }}
          />
        </div>
        <div className={style.info_item}>
          {/* <label htmlFor="subtitle">副标题</label> */}
          <Input 
            type="text" label='副标题' name='subtitle' 
            value={article.subTitle} 
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => {
                setArticle({subTitle: e.target.value});
              }
            } 
            style={{width: '400px'}}
            rules={{
              required: true,
              maxLength: 128,
              minLength: 0
            }}
          />
        </div>
        <div className={style.info_item}>
          <label>banner</label>
          <ImageUpload 
            upload={handleUpload} 
            style={{width: '400px', height: '200px'}}
            type='banner'
            initialValue={article.banner.length > 0 ? imagePreviewBaseUrl + article.banner[0] : ''}
            />
        </div>
        <div className={style.info_item}>
          <label htmlFor="tags">标签</label>
          <TagGroup tags={article?.tags || []} onChange={(tags) => setArticle({tags})} />
        </div>
        <Editor
          value={article.content || ''}
          onChange={content => {
            setArticle({
              content
            })
          }}
          plugins={plugins}
          uploadImages={uploadImages}
        />
        <ToolBtn type='submit' func='submit' />
      </form>
      <Footer></Footer>
    </Fragment>
  )
}


