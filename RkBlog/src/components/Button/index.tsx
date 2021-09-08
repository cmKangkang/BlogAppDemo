import { CSSProperties } from 'react';
import'./style.less';

interface Props {
  size?: 'mid' | 'min' | 'max', // full 代表宽占满一行
  func?: 'submit' | 'button' | 'reset',
  type?: 'primary' | 'danger', 
  children: any,
  style?: CSSProperties,
  onClick?: () => void
}

export default function Button(props: Props) {
  const getClassName = (type: 'primary' | 'danger' | '', size: 'mid' | 'min' | 'max') => {
    let className = 'btn';
    switch(type) {
      case 'primary': className += ' primary'; break;
      case 'danger': className += ' danger'; break;
      default: break;
    }
    switch(size) {
      case 'max': className += ' max'; break;
      case 'min': className += ' min'; break;
      default: className += ' mid'; break;
    }
    return className;
  }
  return (
    <button 
      className={getClassName(props.type || '', props.size || 'mid')}
      type={props.func || 'button'}
      style={props.style}
      onClick={props.onClick}
      >
      {props.children}
    </button>
  )
}