import { CSSProperties, ChangeEventHandler, Fragment } from 'react';
import './style.less';

interface Props {
  // onChange函数，将参数传出
  value: string,
  onChange?: ChangeEventHandler,
  onBlur?: () => void
  onMouseOver?: () => void
  onKeyPress?: () => void
  onKeyDown?: () => void
  
  // 校验规则
  // rules?: Rule[],
  name?: string,
  label?: string,
  type: 'text' | 'password',
  style?: CSSProperties,
  placeHolder?: string,
  disabled?: boolean
  rules?: {
    required?: true
    maxLength?: number,
    minLength?: number,
    pattren?: string,
  }
}

export default function Input(props: Props) {
  return (
    <Fragment>
      {
        props.label && <label className='label' htmlFor={props.name}>{props.label}</label>
      }
      <input
        className='input'
        name={props.name} 
        placeholder={props.placeHolder} 
        type={props.type} 
        style={props.style} 
        value={props.value} 
        onChange={props.onChange}  
        onBlur={props.onBlur}
        onMouseOver={props.onMouseOver}
        onKeyPress={props.onKeyPress}
        onKeyDown={props.onKeyDown}
        pattern={props.rules?.pattren}
        maxLength={props.rules?.maxLength}
        minLength={props.rules?.minLength}
        disabled={props.disabled || false}
        required={props.rules?.required}
      />
    </Fragment>
  )
}