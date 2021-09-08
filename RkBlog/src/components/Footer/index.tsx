import { CSSProperties, ReactChild, useEffect } from 'react';
import './style.less';

interface Props {
}

export default function Footer(props: Props) {
  return (
    <footer className='footer' >
      <span> 
      <a href="https://github.com/cmKangkang" target='_blank'>© 2021 cmKangkang</a>
      <span>|</span>
      <a href="http://cmkangkang.top/" target='_blank'>know more about me.</a>.
      </span>
    </footer>
  )
}