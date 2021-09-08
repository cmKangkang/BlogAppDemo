import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd'
import { getUserInfo, signIn } from '../../../services/api';
import { IAccount } from '../../../interface';
import { accReg, pwdReg } from '../../../data';
import style from './style.module.less';
import store from '../../../store';
import Button from '../../../components/Button';
import TipBtn from '../../../components/TipBtn';
import Input from '../../../components/Input';
import { PresetStatusColorTypes } from 'antd/lib/_util/colors';

export default function SignIn() {
  const history = useHistory();
  const [acc, setAcc] = useState('');
  const [pwd, setPwd] = useState('');
  const userInfo = async () => {
    const re = await getUserInfo();
    if(re.stat !== 'ok') {
      message.error('用户信息获取失败！');
    }
    store.setUser(re.data);
    setTimeout(() => store.storeUser(), 0);
  }
  const handleClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let data: IAccount = {
      account: acc,
      pwd: pwd
    };
    let re = await signIn(data);
    if(re.stat === 'ok') {
      // 成功， 跳转至主页
      message.success('登录成功！');
      userInfo();
      history.push('/');
    } else {
      // 失败
      message.error('登录失败！'+ re.stat + re.msg);
    }
  }
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.left}>
          {/* 左边图片框 */}
          <div className={style.show}>
            <h1 className={style.show_title}>
              RK Blog, 
            </h1>
            <h2 className={style.show_sub}>
              record every moment.
            </h2>
            <span>
              hduewihduew dheuwhue dhawauidi fhur dbheyw bfyegf beuhfuer
            </span>
          </div>
        </div>
        <div className={style.right}>
          <form className={style.form} onSubmit={handleClick}>
            <h2 className={style.form_title}>
              Sign into your Account
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
              <Button func='submit' type='primary' size='max' style={{height: '40px'}}>Sign in</Button>
            </div>
            <span className={style.form_footer}>Don't have an account? Go to <a onClick={(e) => {
              e.preventDefault();
              history.push('/signup');
            }}>Sign up</a>. </span>
          </form>
        </div>
      </div>
    </div>
  )
}