import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i, id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container m-auto my-3 rounded-xl p-5 bg-slate-800 min-h-[70vh] w-10/12">
        <h2 className="font-bold text-center text-lg text-white pb-4">TaskFlow: Simplify your workflow and track tasks effortlessly.</h2>
        <div className="addTodo flex flex-col">
          <h2 className="text-lg font-bold text-white">Add a Task</h2>
          <input
            onChange={handleChange}
            value={todo}
            className="rounded-full w-full p-2 my-2"
            type="text"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="w-full font-bold text-sm disabled:bg-blue-500 bg-blue-600 hover:bg-violet-950 p-2 py-1 text-white rounded-md"
          >
            Save
          </button>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />{" "}
        <span className="text-white">Show Finished</span>
        <h2 className="text-lg font-bold text-white">Your Tasks</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5 text-white">No Tasks are pending.</div>
          )}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && (
              <div key={item} className="todo flex justify-between my-3 ">
                <input
                  name={item.id}
                  onChange={handleCheckBox}
                  type="checkbox"
                  checked={item.isCompleted}
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  <span className="text-white">{item.todo}</span>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="font-bold text-sm bg-gray-700 hover:bg-gray-600 p-2 py-1 text-white rounded-md mx-6"
                  >
                    <MdEditSquare/>
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="font-bold text-sm  bg-gray-700 hover:bg-gray-600 p-2 py-1 text-white rounded-md mx-6"
                  >
                    <AiFillDelete/>
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
