import React,{useState,useEffect} from 'react';
import Form from './Components/Form'
import TodoList from './Components/TodoList'
import './App.css';

function App() {
  
  const [inputText,setInputText]=useState("")
  const [todos,setTodos]=useState([])
  const [status,setStatus]=useState('all')
  const [filterdTodos,setFilterdTodos]=useState([])
  const filteredHandler=()=>{
    switch (status) {
      case "completed":
        setFilterdTodos(todos.filter(todo=>todo.completed===true))
        break;
      case "uncompleted":
        setFilterdTodos(todos.filter(todo=>todo.completed===false))
        break;
      default:
        setFilterdTodos(todos)
        break;
    }
  }
  const saveLocalTodos=()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  }
  const getLocalTodos=()=>{
    if(localStorage.getItem('todos')==null){
      localStorage.setItem('todos',JSON.stringify([]))
    }else{
      const LocalTodos=JSON.parse(localStorage.getItem('todos'))
      setTodos(LocalTodos)
    }
  }
  useEffect(()=>{
    getLocalTodos()
  },[])
  useEffect(()=>{
    filteredHandler()
    saveLocalTodos()
  },[todos,status])
  return (
    <div className="">
      <header>
        <h1>dyako's Todo App</h1>
      </header>
      <Form setStatus={setStatus} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText}/>
      <TodoList filterdTodos={filterdTodos} setTodos={setTodos} todos={todos}/>
    </div>
  );
}

export default App;
