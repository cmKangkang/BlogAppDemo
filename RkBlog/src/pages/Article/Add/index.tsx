import { useEffect, Fragment } from 'react';
import { useAddOrNewArticle } from '../../../hooks';
import { useHistory } from 'react-router-dom';
import { Editor } from '@bytemd/react';
import highlight from '@bytemd/plugin-highlight'
import gfm from '@bytemd/plugin-gfm';
import { uploadImages } from '../../../services/action';
import style from './style.module.less';
import TagGroup from '../../../components/Tag';
import { addArticle, uploadFile } from '../../../services/api';
import ImageUpload from '../../../components/Upload';
import ToolBtn from '../../../components/ToolBtn';
import { message } from 'antd';
import Input from '../../../components/Input';
import Footer from '../../../components/Footer';

const plugins = [
  highlight(),
  gfm()
]

export default function ArticleAdder() {
  const history = useHistory();
  useEffect(() => {
    
  }, []);
  const {article, setArticle} = useAddOrNewArticle();
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    let re = await addArticle(article);
    if(re.stat === 'ok') {
      message.success('文章创建成功！');
      history.goBack();
    } else {
      message.error('文章创建失败！' + re.stat + re.msg);
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
      <h1 className={style.title}>文章添加</h1>

      <form className={style.info} onSubmit={handleSubmit} onKeyDown={(e: React.KeyboardEvent) => {
        if(e.nativeEvent.keyCode === 13) return false;
      }}>
        <div className={style.info_item}>
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
          <label htmlFor="banner">banner</label>
          <ImageUpload 
            upload={handleUpload} 
            style={{width: '400px', height: '200px'}}
            type='banner'
            />
        </div>
        <div className={style.info_item}>
          <label htmlFor="tags">标签</label>
          <TagGroup tags={article?.tags || []} onChange={(tags) => setArticle({tags})} />
        </div>
        <div className={style.info_item}>
          <label htmlFor="content">文章内容</label>
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
        </div>
        <ToolBtn type='submit' func='submit' />
      </form>
      <Footer></Footer>
    </Fragment>
  )
}