import React,{useRef} from 'react'
import './index.scss'
export default function AddInput(props) {
  const {isInputShow,addItem} = props;
  //先执行后取得结果对象
  const inputRef = useRef();
  const submitValue = ()=>{
    const inputValue = inputRef.current.value.trim();
    if(inputValue.length===0){
      return;
    }else{
      // console.log( inputRef.current.value);
      inputRef.current.value = '';
      addItem(inputValue);

    }
  }
  return (
    <>
      {
        isInputShow?(
          <div className="input-wrapper">
            <input type="text" placeholder="请输入待办事件" ref={inputRef} />
            <button className="btn btn-primary" onClick={submitValue}>增加</button>
          </div>
        ):''
      }
    </>
  )
}
