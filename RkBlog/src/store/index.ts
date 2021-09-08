import { makeAutoObservable } from 'mobx';
import { IUser } from '../interface';

const initObj = {
  nickname: '',
  avatar: '',
  ctime: 0,
  status: 0,
  _id: '',
  account: ''
}

class UserStore {
  // @observable
  user: IUser = JSON.parse(localStorage.getItem('__user__') || JSON.stringify(initObj)) as IUser;

  // @action
  setUser = (user: IUser) => {
    this.user = user;
  }

  // @action
  storeUser = () => {
    console.log('store user:', this.user);
    if(this.user.account.length === 0) {
      return;
    }
    localStorage.setItem('__user__', JSON.stringify(this.user));
  }

  // @action
  setNull = () => {
    this.user = {
      nickname: '',
      avatar: '',
      ctime: 0,
      status: 0,
      _id: '',
      account: ''
    };
  }

  constructor() {
    makeAutoObservable(this);
  }

}

const store = new UserStore();

export default store;