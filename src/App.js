import React,{ useState,useCallback,useEffect } from "react";
import './App.css';
import AddInput from './components/AddInput';
import Header from './components/Header';
import TodoItem from "./components/TodoItem";
import CheckModal from "./components/Modal/CheckModal";
import EditModal from "./components/Modal/EditModal";
import NoDataTip from './components/NoDataTip'

function App() {
  //添加栏显示否得标识符
  const [isInputShow, setisInputShow] = useState(false);
  const [todoList, settodoList] = useState([]);
  const [isShowCheckModal, setisShowCheckModal] = useState(false);
  const [isShowEditModal, setisShowEditModal] = useState(false);
  const [currentData, setcurrentData] = useState({});
  //usecallBack的钩子
  const addItem =useCallback((value)=>{
    const dataItem = {
      id:new Date().getTime(),
      content:value,
      completed:false
    };
    console.log(dataItem)
    //数组添加元素
    settodoList((todoList)=>[...todoList,dataItem])
    setisInputShow(false);
  },[])

  const completedItem = useCallback(
    (id) =>{
      settodoList((todoList)=>todoList.map((item)=>{
        if(item.id === id){
          item.completed = !item.completed;
        }
        return item
      }))
    }
    ,
    []
  )
  const removeItem = useCallback(
    (id)=>{
      settodoList((todoList)=>todoList.filter(item=>item.id !== id));

    },[]
  ) 
  //打开查看页面的函数
  const openCheckModal = useCallback(
    (id) => {
      setcurrentData(() => todoList.filter((item) => item.id === id)[0]);
      setisShowEditModal(true);
    },
    [todoList]
  );

  const openEditModal = useCallback(
    (id) => {
      setcurrentData(() => todoList.filter((item) => item.id === id)[0]);
      setisShowEditModal(true);
    },
    [todoList]
  );
  
  const submitEdit = useCallback(
    (newData,id) => {
    settodoList((todoList)=>
      todoList.map((item)=>{
        if(item.id === id){
          item = newData
        }

        return item;
      })
    );
    setisShowEditModal(false)
    },[]
  )

  //副作用程序，其实这里和componentdidmount效果差不多
  useEffect(() => {
    //在localStorage中取出之前的数据，并且如果没有的话，不会报错
    const todoData = JSON.parse(localStorage.getItem('todoData')||'[]')
    settodoList(todoData)
  }, []);

  useEffect(()=>{
    localStorage.setItem('todoData',JSON.stringify(todoList))
  },[todoList])

  return (
    <div className="App">
      你好
      <CheckModal
        isShowCheckModal={isShowCheckModal}
        closeModal={()=>setisShowCheckModal(false)}
        data={currentData}
      ></CheckModal>
      <EditModal isShowEditModal={isShowEditModal} data={currentData} submitEdit={submitEdit}></EditModal>
      <Header openInput={()=>setisInputShow(!isInputShow)}></Header>
      <AddInput isInputShow={isInputShow} addItem={addItem}></AddInput>
      {
        !todoList || todoList.length === 0?
        <NoDataTip></NoDataTip>
        :
        <ul className="todo-list">
          {
            todoList.map((item,idx)=> (
                <TodoItem completedItem={completedItem} data={item} key={idx} openCheckModal={openCheckModal} openEditModal={openEditModal} removeItem={removeItem}></TodoItem>
              
            ))
          }
        </ul>
      }
      

    </div>
  );
}

export default App;
