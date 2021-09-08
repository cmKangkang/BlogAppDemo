import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import style from './style.module.less';
import store from '../../store';
import { useUserArticles } from '../../hooks';
import { imagePreviewBaseUrl } from '../../data';
import ImageUpload from '../../components/Upload';
import { Pagination } from 'antd';
import { uploadFile, updateUserInfo, updateUserPwd, deleteArticleById, signOut } from '../../services/api';
import { message } from 'antd';
import Button from '../../components/Button';
import ToolBtn from '../../components/ToolBtn';
import UserArticleItem from '../../components/Article/UserArticleItem';
import DropDown from '../../components/DropDown';
import { useObserver, useLocalStore } from 'mobx-react';
import { pwdReg } from '../../data';
import TipBtn from '../../components/TipBtn';
import Input from '../../components/Input';
import Footer from '../../components/Footer';


export default function Space() {
  const history = useHistory();
  
  // const localStore = useLocalStore(() => store);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState<'ctime' | 'preview'>('ctime');
  const {articles, total, setRf} = useUserArticles(pageIndex, pageSize, sort);
  
  const [avatar, setAvatar] = useState(store.user.avatar);
  const [nickname, setNickname] = useState(store.user.nickname);
  const [opwd, setOPwd] = useState('');
  const [npwd, setNPwd] = useState('');

  const [editInfoVisiable, setEditInfoVisiable] = useState(false);
  const [changePwdVisiable, setChangePwdVisiable] = useState(false);
  const getClassName = (type: 'ctime' | 'preview') => {
    if(type === sort) return `${style.tool_item} ${style.active}`;
    else return `${style.tool_item}`;
  }

  const handleEdit = (id: string) => {
    if(id.length === 0) return;
    let url = '/article/' + id + '/edit';
    history.push(url, {
      id: id
    });
  }

  const handleDelete = async (id: string) => {
    if(id.length === 0) return;
    if(!window.confirm('此操作将会永久删除该文章，您确定要删除么？')) {
      return;
    }
    let re = await deleteArticleById(id);
    if(re.stat === 'ok') {
      // 删除成功
      message.success('删除成功！');
      setRf(true);
    } else {
      message.error('删除失败！' + re?.msg)
    }
  }

  const handleUpload = async (files: File[]) => {
    const file = files[0];
    let formData = new FormData();
    formData.append('files', file);
    let re = await uploadFile(formData);
    if(re.stat === 'ok') {
      // 图片上传成功
      console.log(re.data)
      setAvatar(re.data as string);
    } else {
      message.error('图片上传失败！');
    }
  }

  const handleInfoSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(nickname.length === 0 || avatar.length === 0) {
      return;
    }
    let data = {avatar, nickname};
    let re = await updateUserInfo(data);
    if(re.stat === 'ok') {
      message.success('用户信息修改成功！');
      setEditInfoVisiable(false);
      const user = JSON.parse(JSON.stringify(store.user));
      user.nickname = nickname;
      user.avatar = avatar;
      store.setUser(user);
    } else {
      message.error('用户信息修改失败！' + re.stat + re.msg);
    }
  }

  const handlePwdSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(opwd.length === 0 || npwd.length === 0) {
      return;
    }
    let data = {
      oldPwd: opwd,
      newPwd: npwd 
    }
    let re = await updateUserPwd(data);
    if(re.stat === 'ok') {
      // 要求重新登陆
      message.success('密码修改成功！');
      setNPwd('');
      setOPwd('');
      message.info('您已修改密码，请重新登录', 3);
      history.push('/signin');
    } else {
      message.error('密码修改失败！' + re.stat + re.msg);
    }
  }

  const handleSignOut = async () => {
    if(!window.confirm('即将退出登录，您确定要退出么？')) {
      return;
    }
    let re = await signOut();
    if(re.stat === 'ok') {
      message.info('您已退出登录，请重新登录.');
      store.setNull();
      history.push('/signin');
    }
  }

  useEffect(() => {
    setRf(true);
    return () => {
      store.storeUser();
    }
  }, []);

  return useObserver(() =>
    <div className='container'>
      <Header></Header>
      <div className={style.container}>
        {/* 项目得container， 在不同情况下调整布局 */}
        <section className={style.user}>
          <div className={style.info}>
            {/* 头像展示与更换头像 */}
            {
              !editInfoVisiable ? 
              <Fragment>
                <div className={style.avatar}>
                  <img src={imagePreviewBaseUrl + store.user.avatar} alt="Avatar" />
                </div>
                <div className={style.nickname}>
                  <h1>{store.user.nickname}</h1>
                  <h3>{store.user.account}</h3>
                </div>
                <Button size='max' func='button' type='primary' onClick={() => {
                  setEditInfoVisiable(true);
                  setChangePwdVisiable(false);
                }}>Edit Profile</Button>
              </Fragment>
              : 
              <Fragment>
                {/* 编辑信息 */}
                <form className={style.info_form} onSubmit={handleInfoSubmit}>
                  <div className={style.form_item}>
                    <ImageUpload
                      upload={handleUpload}
                      style={{height: 'auto', width: '100%'}}
                      type='avatar'
                      initialValue={imagePreviewBaseUrl + store.user.avatar}
                    />
                  </div>
                  <div className={style.form_item}>
                    <h1 className={style.form_title}>
                      Edit profile
                      <TipBtn tips={['点击图片框即可上传头像.', '昵称长度不得低于1个字符，不得多于32个字符.']}></TipBtn>
                    </h1>
                    {/* <label htmlFor="nickname">Nick name</label> */}
                    <Input type="text" name="nickname" label='Nick name'
                      value={nickname}
                      rules={{
                        required: true,
                        maxLength: 32,
                        minLength: 1
                      }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)} />
                    <Button  func='submit' type='primary' size='max'>Save</Button> 
                    <Button func='button' size='max' onClick={() => {
                      setAvatar(store.user.avatar);
                      setNickname(store.user.nickname);
                      setEditInfoVisiable(false);
                    }}>Cancel</Button>
                  </div>
                </form>
              </Fragment> 
            }
          </div>
          <div className={style.pwd}>
            {
              !changePwdVisiable ? 
              <Button size='max' onClick={() => {
                setChangePwdVisiable(true);
                setEditInfoVisiable(false);
              }}>
                Change Passwd
              </Button>
              : 
              <Fragment>
                <form onSubmit={handlePwdSubmit}>
                  <h1 className={style.form_title}>
                    Change passwd
                    <TipBtn tips={['密码长度在6~20个字符之间.', '密码必须包含数字与字母，不得包含其他特殊字符.']}></TipBtn>
                  </h1>
                  <div className={style.form_item}>
                    {/* <label htmlFor="opwd">Old password</label> */}
                    <Input type="text" label='Old password' name='opwd'
                      value={opwd} 
                      rules={{
                        required: true,
                        maxLength: 20,
                        minLength: 6,
                        pattren: pwdReg
                      }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOPwd(e.target.value)} />
                  </div>
                  <div className={style.form_item}>
                    {/* <label htmlFor="npwd">New password</label> */}
                    <Input type="text" label='New password' name='npwd'
                      value={npwd} 
                      rules={{
                        required: true,
                        maxLength: 20,
                        minLength: 6,
                        pattren: pwdReg
                      }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNPwd(e.target.value)} />
                  </div>
                  <Button func='submit' type='primary' size='max'>Save</Button> 
                  <Button func='button' size='max' onClick={() => {
                    setNPwd('');
                    setOPwd('');
                    setChangePwdVisiable(false);
                  }}>Cancel</Button>
                </form>
              </Fragment>
            }
          </div>
          <div className={style.signout}>
            <Button func='button' size='max' type='danger' onClick={handleSignOut}>Sign out</Button>
          </div>
        </section>
        <section className={style.works}>
          <div className={style.toolbar}>
            <h2>
              Your posts
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
          {!articles || articles.length === 0 ? 
            <div className="null">
              <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5799" width="200" height="200"><path d="M0 1006.933333V614.4h0.1536l203.537067-273.066667h616.618666l203.537067 273.066667H1024v392.533333H0z m785.066667-614.4H238.933333L68.266667 614.4l887.2448 0.2048zM392.533333 648.533333a119.466667 119.466667 0 1 0 238.933334 0 117.879467 117.879467 0 0 0-5.495467-33.928533H398.0288A117.879467 117.879467 0 0 0 392.533333 648.533333z m580.266667 17.066667H681.813333a170.666667 170.666667 0 0 1-339.626666 0H51.2v290.133333h921.6V665.6zM699.528533 214.698667l146.6368-146.6368 24.439467 24.439466-146.6368 146.6368zM494.933333 34.133333h34.133334v204.8h-34.133334V34.133333zM153.3952 92.501333l24.439467-24.439466 146.653866 146.653866-24.456533 24.4224z" p-id="5800"></path></svg>
            </div> :
            <Fragment>
            <div className={style.list}>
              {articles && articles?.length > 0 &&
              articles?.map(art => 
                <UserArticleItem 
                  id={art._id} 
                  title={art.title}
                  subTitle={art.subTitle}
                  preview={art.preview} 
                  banner={art.banner} 
                  key={art._id}
                  ctime={art.ctime}
                  mtime={art.mtime}
                  tags={art.tags}
                >
                  <DropDown menu={[
                    {label: '编辑', onClick: () => handleEdit(art._id)},
                    {label: '删除', onClick: () => handleDelete(art._id)}
                  ]}></DropDown>
                </UserArticleItem>
                || <h3 className={style.null}>There's nothing here...</h3>
                )
              }
            </div>
            {total > 0 && 
              <Pagination
                className={'arts_pagination'}
                total={total} 
                onChange={(page, size) => {
                  setPageIndex(page);
                  setPageSize(size || 10);
                }}
                showSizeChanger
                showTotal={(total, range) => `共 ${total} 条`}
              />}
          </Fragment>}
          <ToolBtn type='new' onClick={() => history.push('/article/new')} />
        </section>
      </div>
      <Footer></Footer>
    </div>
  )
}