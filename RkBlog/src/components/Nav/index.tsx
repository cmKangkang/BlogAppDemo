import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from './style.module.less';

interface Props {
  navs: {
    title: string, 
    path: string
  }[],
  width?: number,
  height?: number
}
export default function Nav(props: Props) {
  return <nav className={style.nav} style={{
    width: `${props.width ? props.width : 300}px`,
    height: `${props.height ? props.width : 50}px`,
    }}>
    {props.navs.map(nav => {
      return (
        <NavLink exact to={nav.path} className={style.nav_item} activeClassName={style.nav_item_active} key={nav.path}>{nav.title}</NavLink>
      )
    })}
  </nav>
}