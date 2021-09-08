import { CSSProperties, useState } from 'react';
import'./style.less';

interface Props {
  style?: CSSProperties,
  tips: string[],
  title?: string,
  width?: string
}

export default function TipBtn(props: Props) {
  const [show, setShow] = useState(false);
  return (
    <span 
      className='tip_btn' onMouseOver={() => setShow(true)} 
      onMouseLeave={() => setShow(false)}
      title={(props.title || '规则') + ': \n' + props.tips.join('. \n')}
    >
      <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6700" width="200" height="200"><path d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512z m0-938.666667a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 512 85.333333z m0 682.666667a42.666667 42.666667 0 0 1-42.368-42.666667v-255.573333a42.368 42.368 0 1 1 84.693333 0V725.333333A42.410667 42.410667 0 0 1 512 768z m0-426.666667a42.325333 42.325333 0 1 1 42.282667-42.325333A42.410667 42.410667 0 0 1 512 341.333333z m-42.368-42.666666a1.834667 1.834667 0 0 1 0 0.213333V298.666667z m84.693333 0v0.426666a1.834667 1.834667 0 0 1 0-0.213333V298.666667z" p-id="6701"></path></svg>
      <ul className="tip_list" style={{display: `${show ? 'block' : 'none'}`, width: props.width || '250px'}}>
        <span className='tip_list_title'>{props.title}</span>
        {
          props.tips.map(tip => <li className='tip_item' key={tip}>{tip}</li>)
        }
      </ul>
    </span>
  )
}