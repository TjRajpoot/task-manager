import { useState,useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    if(localStorage.getItem("todos")){
      let todos=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  },[])
  
  const saveToLS=()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const toggleFinished=(e) => {
    setshowFinished(!showFinished);
  }
  
  const handleEdit = (e,id) => {
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodo=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodo);
    saveToLS();
  };
  const handleDelete = (e,id) => {
    let newTodo=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodo);
    saveToLS();
  };
  const handleAdd = () => {
    if (todo.trim() === "") {
      return;
    }
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
    saveToLS(); 
  };
  const handleCheckBox=(e)=>{
    let id = e.target.name
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodo=[...todos];
    newTodo[index].isCompleted=!newTodo[index].isCompleted;
    setTodos(newTodo);
    saveToLS();
  }
  return (
    <>
      <Navbar />
      <div className="md:container mx-auto my-9 bg-purple-100 p-3.5 rounded-2xl min-h-[80vh] md:w-1/2">
        <div className="add-todo my-5 flex flex-col">
          <h1 className="text-lg font-bold">Add a Task</h1>
          <form
            className=""
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            <input
              onChange={handleChange}
              value={todo}
              className="w-full h-8 bg-white shodow-lg rounded-3xl p-3"
              type="text"
            />
            <button
              className="bg-violet-500 hover:bg-white rounded-lg py-1 px-2  active:bg-blue-800 text-amber-50 font-bold w-full"
              onClick={handleAdd}
            >
              Save
            </button>
          </form>
        </div>

        <input className="mx-3 px-4" type="checkbox" checked={showFinished} onChange={toggleFinished} />Show Completed
        <h1 className="text-xl font-bold">Your Tasks</h1>
        <div className="todos">
          {todos.length===0 && <div className="m-5">No Task to Do!</div>}
          {todos.map((item) => {
            return (showFinished|| !item.isCompleted)&&(
              <div key={item.id} className="todo flex w-full justify-between my-3">
              <div className="flex gap-5">
                <input name={item.id} onChange={handleCheckBox} type="checkbox" value={todo.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo.length > 30 ? item.todo.slice(0, 30) + "..." : item.todo}
                </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    className="bg-violet-500 hover:bg-white rounded-lg py-1 px-2 mx-1 active:bg-blue-800 text-amber-50 font-bold"
                    onClick={(e)=>handleEdit(e,item.id)}
                  >
                    EDIT
                  </button>
                  <button
                    className="bg-violet-500 hover:bg-white rounded-lg py-1 px-2 active:bg-blue-800 text-amber-50 font-bold"
                    onClick={(e)=>{handleDelete(e,item.id)}}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
