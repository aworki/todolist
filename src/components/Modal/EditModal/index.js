import React ,{useRef}from 'react'
import Modal from '..';
import './index.scss'
import {formatDateTime} from '../../../libs/utils'


export default function EditModal(props) {
  const {isShowEditModal,data,submitEdit} = props;
  const inputRef = useRef();
  const checkRef = useRef();
  const formatNewData = ()=>{
    const val = inputRef.current.value.trim();
    const valuelen = val.length;

    if(valuelen === 0) {
      inputRef.current.value = data.content;
      return 
    }

    const newData = {
      id:new Date().getTime(),
      content:val,
      completed:checkRef.current.checked

    };

    submitEdit(newData,data.id);


  }
  return (
    <Modal
      isShowModal={isShowEditModal}
      modalTitle="编辑事件"
    >
      <p className="topic">时间：{ formatDateTime(data.id)}</p>
      <p className="topic">
        <textarea className="text-area" ref={inputRef} defaultValue={data.content}>
        </textarea>
      </p>
      
      <p className="topic">状态：
        <input type="checkbox" name="" id=""
          defaultChecked={ data.completed ? true: false }
          ref={checkRef}
        />
      </p>
      <button className="btn btn-primary comfirm-btn"
        onClick={formatNewData}
      >提交</button>
    </Modal>
  )
}
