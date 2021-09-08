import { Route, Switch } from 'react-router-dom'
import Article from '../Article';
import Home from '../Home';
import SignIn from '../Sign/SignIn';
import SignUp from '../Sign/SignUp';
import Space from '../Space';
import Search from '../Search';
import store from '../../store';
import 'antd/lib/message/style';
import { useEffect } from 'react';
import { useUserStateCheck } from '../../hooks';
import NotFound from '../NotFound';

export default function Page() {
  useEffect(() => {
    return () => {
      store.storeUser();
    }
  }, []);
  useUserStateCheck();
  return (
    <div className="wrapper">
      <Switch>
        {/* sign */}
        <Route path='/signin' exact component={SignIn}></Route>
        <Route path='/signup' exact component={SignUp}></Route>
        {/* space */}
        {/* id为参数用户唯一标识，可在this.props.match.params.id中获取，即match.params.id */}
        <Route path='/space/:id' exact component={Space}></Route>
        {/* 文章详情 */}
        <Route path='/article/:id' component={Article}></Route>
        <Route path='/search' exact component={Search}></Route>
        {/* home首页 */}
        <Route path={`/space/:${store.user.account}`} component={Space}></Route>
        <Route path='/' exact component={Home}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </div>
  )
}