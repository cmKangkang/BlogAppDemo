import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { accReg, pwdReg } from '../../../data';
import { getUserInfo, signUp } from '../../../services/api';
import style from './style.module.less';
import store from '../../../store';
import Button from '../../../components/Button';
import TipBtn from '../../../components/TipBtn';
import Input from '../../../components/Input';

export default function SignUp() {
  const history = useHistory();
  const [acc, setAcc] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const userInfo = async () => {
    const re = await getUserInfo();
    if(re.stat !== 'ok') {
      message.error('用户信息获取失败！');
    }
    store.setUser(re.data);
    setTimeout(() => store.storeUser(), 0);
  }
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(pwd !== confirm) {
      // 密码输入错误
      message.error('确认密码不匹配！')
      return;
    }
    let re = await signUp({account: acc, pwd: pwd});
    if(re.stat === 'ok') {
      // 注册成功，直接登录，跳转至首页
      message.loading('注册成功！跳转中...');
      userInfo();
      history.push('/');
      return;
    } else if(re.stat === 'Err_User_Exist') {
      // 用户已存在
      message.warn('该用户已存在！');
      return;
    } else {
      message.error(re.msg);
    }
  }
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.right}>
          {/* 右方登录框 */}
          <form className={style.form} onSubmit={handleSubmit}>
            <h2 className={style.form_title}>
              Sign Up Your Account
            </h2>
            <div className={style.form_item}>
              <Input 
                type="text" 
                name="account" 
                placeHolder='Your account'
                value={acc} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAcc(e.target.value)} 
                rules={{
                  required: true,
                  pattren: accReg
                }}
                style={{height: '38px'}}
              />
              <div className={style.tip}>
                <TipBtn title='账号规则' tips={[
                  '账号长度不得低于2个字符，不得多于18个字符.',
                  '账号可由数字与英文字母组成.'
                ]} />
              </div>
            </div>
            <div className={style.form_item}>
              <Input 
                type="password"  
                name="password" 
                placeHolder='Your password'
                value={pwd} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)} 
                rules={{
                  required: true,
                  pattren: pwdReg
                }}
                style={{height: '38px'}}
              />
              <div className={style.tip}>
                <TipBtn tips={[
                  '密码长度不得低于6个字符，不得多于20个字符.', 
                  '密码由数字与英文字母组成，且必须包含一个英文或数字，不得包含其他特殊字符.'
                  ]} title='密码规则'/>
              </div>
            </div>
            <div className={style.form_item}>
              <Input 
                type="password"  
                name="password" 
                placeHolder='Confirm password'
                value={confirm} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value)} 
                rules={{
                  required: true,
                  pattren: pwdReg
                }}
                style={{height: '38px'}}
              />
              <div className={style.tip}>
                <TipBtn tips={[
                  '请再次输入新密码，确保您的密码正确', 
                  ]} title='确认密码规则'/>
              </div>
            </div>
            <div className={style.form_item}>
            <Button func='submit' type='primary' size='max' style={{height: '40px'}}>Sign up</Button>
            </div>
            <span className={style.form_footer}>Already have an account? Go to <a onClick={(e) => {
              e.preventDefault();
              history.push('/signin');
            }}>Sign in</a>. </span>
          </form>
        </div>
        <div className={style.left}>
          {/* 左边图片框 */}
          <div className={style.show}>
            <h1 className={style.show_title}>
              KKBlog, 
            </h1>
            <h2 className={style.show_sub}>
              record every moment.
            </h2>
            <span>
              hduewihduew dheuwhue dhawauidi fhur dbheyw bfyegf beuhfuer
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}