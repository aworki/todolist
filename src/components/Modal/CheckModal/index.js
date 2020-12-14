import React from 'react'
import Modal from '../index';
import './index.scss'
import {formatDateTime} from '../../../libs/utils'

export default function CheckModal(props) {
  const {isShowCheckModal,data,closeModal} = props;

  return (
    <Modal isShowModal={isShowCheckModal} modalTitle="查看事件">
      {/* <div className="topic">哈哈哈哈</div> */}
      <p className="topic">时间：{ formatDateTime(data.id)}</p>
      <p className="topic">内容：{ data.content }</p>
      <p className="topic">状态：{ data.completed ? '已完成' : '未完成' }</p>
      <button 
        className="btn btn-primary comfirm-btn"
        onClick={ closeModal }
      >确定</button>
    </Modal>
  )
}