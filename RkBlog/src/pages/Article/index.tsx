import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Header from '../../components/Header';
import ArticleViewer from "./View";
import ArticleEditor from './Edit';
import ArticleAdder from "./Add/";
import 'bytemd/dist/index.min.css';
import 'highlight.js/styles/atom-one-light.css';

export default function Article() {
  const match = useRouteMatch();
  console.log(match)
  return (
    <div className='container'>
      <Header />
      <Switch>
        <Route path={`${match.url}/edit`} component={ArticleEditor}></Route>
        <Route path='/article/new' component={ArticleAdder}></Route>
        <Route component={ArticleViewer}></Route>
      </Switch>
    </div>
  )
}