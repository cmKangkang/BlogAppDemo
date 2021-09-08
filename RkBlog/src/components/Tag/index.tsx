import { message } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import React, { useState, useEffect, MouseEvent, useRef, CSSProperties, forwardRef, Ref } from 'react';
import './style.less';
import 'antd/lib/tag/style';

interface TagProps {
  closable?: true,
  onClose?: (e: MouseEvent) => void,
  onClick?: () => void,
  children: any;
  style?: CSSProperties
}

const Tag = forwardRef((props: TagProps, ref: Ref<HTMLElement>) => {
  return (
    <span ref={ref} className='tag' onClick={props.onClick} style={props.style}>
      {
        props.children
      }
      {
        props.closable && 
        <span className='tag_btn' onClick={props.onClose}>
          <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
        </span>
      }
    </span>
  )
});

export default function EditableTagGroup(props: {tags: string[], onChange: (tags: string[]) => void, max?:16, min?: 1}) {
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [val, setVal] = useState('');
  const handleDelete = (rmTag: string) => {
    const ts = tags.filter(t => t !== rmTag);
    setTags(ts);
  }
  const handleAdd = () => {
    const nTag = val;
    if(nTag.length < (props?.min || 1)) {
      message.info(`标签不得少于${props.min || 1}个字符!`);
      setInputVisible(false);
      return;
    }
    if(nTag.length > (props?.max || 16)) {
      message.info(`标签不得多于${props.max || 16}个字符!`);
      setInputVisible(false);
      return;
    }
    if(tags.includes(nTag)) {
      message.info('该标签已存在！');
      return;
    }
    const ts = tags.concat(nTag);
    setTags(ts);
    props.onChange(ts);
    setInputVisible(false);
    setVal('');
  }

  useEffect(() => {
    setTags(props.tags)
  }, [props.tags]);

  return (
    <TweenOneGroup
      className='tag_group'
      enter={{
        scale: 0.8,
        opacity: 0,
        type: 'from',
        duration: 100,
        onComplete: (e: any) => {
          e.target.style = '';
        },
      }}
      leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
      appear={false}
    >
      {
        tags.map(tag => 
          <Tag 
            key={tag}
            closable
            onClose={(e: MouseEvent) => {
              e.preventDefault();
              handleDelete(tag);
            }}
            >
            {tag}
          </Tag>
        )
      }
      {
        inputVisible &&
        <input
          style={{width: '80px', padding: '0 6px'}}
          autoFocus
          id='tag_input' type='text' value={val} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVal(e.target.value)}
          onBlur={handleAdd}
          onKeyPress={(e: React.KeyboardEvent) => {
            if(e.nativeEvent.keyCode === 13) {
              handleAdd();
            } else if(e.nativeEvent.keyCode === 27) {
              setInputVisible(false);
            }
          }}
          /> || 
        <Tag 
          onClick={() => {
            setInputVisible(true)
          }} 
          style={{cursor: 'pointer', width: '80px'}}>
          <svg className="icon add_btn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8048" width="16" height="16"><path d="M959.155673 466.955299H557.05207V64.844327H466.952842v402.110972H64.844327v90.094315h402.108515V959.155673h90.094316V557.049614h402.103602v-90.094315h0.004913z m0 0" p-id="8049"></path></svg>
          添加
        </Tag>
      }
    </TweenOneGroup>
  )
}
