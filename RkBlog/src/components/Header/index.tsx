import {  useState } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import './style.less';
import logo from '../../assets/img/blog.svg'

interface Props {
  // style?: CSSProperties,
  // children: ReactChild,
  // className: string, // container style
}

export default function Header(props: Props) {
  const [collapse, setCollapse] = useState(true);
  return (
    <header className='header'>
      <div className='container header_container'>
        <div className='header_logo'>
          <img src={logo} alt="logo" />
          {/* <h2>KKBlog</h2> */}
        </div>
        <nav className='nav'>
          <NavLink exact to={'/'} className='nav_item' activeClassName='nav_item_active'>Home</NavLink>
          <NavLink exact to={'/search'} className='nav_item' activeClassName='nav_item_active'>Search</NavLink>
          <NavLink exact to={'/space/' + store.user.account} className='nav_item' activeClassName='nav_item_active'>Space</NavLink>
        </nav>
        <div className="nav_btn" onClick={e => setCollapse(!collapse)}>
          {
            collapse &&
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11326" width="32" height="32"><path d="M0 128.256h1024V256H0zM0.576 448.128h1024v127.744h-1024zM0.576 768h1024v127.744h-1024z" p-id="11327"></path></svg>
            || <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14321" width="32" height="32"><path d="M958.291462 132.215254 889.566218 63.491033 511.581468 441.475783 133.596717 63.491033 64.872496 132.215254 442.857247 510.200004 64.872496 888.185778 133.596717 956.909999 511.581468 578.925249 889.566218 956.909999 958.291462 888.185778 580.305689 510.200004Z" p-id="14322"></path></svg>
          }
          {
            <nav className={`${collapse ? 'nav_menu collapse' : 'nav_menu'}`}>
              <NavLink exact to={'/'} className='nav_item' activeClassName='nav_item_active'>Home</NavLink>
              <NavLink exact to={'/search'} className='nav_item' activeClassName='nav_item_active'>Search</NavLink>
              <NavLink exact to={'/space'} className='nav_item' activeClassName='nav_item_active'>Space</NavLink>
              <button className='nav_menu_btn' onClick={e => setCollapse(!collapse)}>
                <svg className="icon" viewBox="0 0 1780 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2909" width="32" height="32"><path d="M852.273292 19.080745L19.080745 922.236025c-19.080745 25.440994-19.080745 57.242236 0 82.68323 25.440994 25.440994 57.242236 25.440994 76.322982 0L890.434783 146.285714l795.031056 858.633541c25.440994 25.440994 57.242236 25.440994 76.322981 0 19.080745-25.440994 25.440994-57.242236 0-82.68323 0 0-826.832298-903.15528-833.192547-903.15528-6.360248-12.720497-19.080745-19.080745-38.16149-19.080745-12.720497 0-31.801242 6.360248-38.161491 19.080745z" p-id="2910"></path></svg>
              </button>
            </nav>
          }
        </div>
      </div>
    </header>
  )
}