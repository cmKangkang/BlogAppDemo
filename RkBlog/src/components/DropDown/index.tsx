import { CSSProperties, useState } from "react";
import './style.less';
interface Props {
  menu: {
    onClick: () => void,
    label: string,
  }[],
  style?: CSSProperties
}
export default function DropDown(props: Props) {
  const [collapse, setCollapse] = useState(true);
  return (
    <div 
      className='drop_down' 
      style={props.style}
      onClick={e =>  {
        e.stopPropagation();
        setCollapse(!collapse);
    }}>
      <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26194" width="32" height="32"><path d="M512 128m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" p-id="26195"></path><path d="M512 512m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" p-id="26196"></path><path d="M512 896m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" p-id="26197"></path></svg>
      <nav className={!collapse ? 'drop_down_menu' : 'drop_down_menu collapse'}>
        {
          props.menu.map(el => <li className='menu_item' onClick={el.onClick} key={el.label}>{el.label}</li>)
        }
      </nav>
    </div>
  )
}