import { useState, useEffect } from "react";
import {
  AiOutlineDelete,
  AiOutlineEllipsis,
  AiOutlineCheck,
  AiOutlineEdit,
} from "react-icons/ai";
import { Menu, Dropdown } from "antd";

function App() {
  const [isCompleteScreen, setCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditItem, setCurrentEditItem] = useState("");

  const handleAddTo = () => {
    if (newTitle && newDesc) {
      const newTodoItem = {
        title: newTitle,
        description: newDesc,
      };
      const updatedTodoArr = [...allTodos, newTodoItem];
      setTodos(updatedTodoArr);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
      setNewTitle("");
      setNewDesc("");
    }
  };

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem("todolist"));
    const savedCompletedTodos = JSON.parse(
      localStorage.getItem("completedTodos"),
    );

    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodos) {
      setCompletedTodos(savedCompletedTodos);
    }
  }, []);

  const handleDeleteTodo = (index, isCompleted = false) => {
    if (isCompleted) {
      const reducedCompletedTodos = [...completedTodos];
      reducedCompletedTodos.splice(index, 1);
      setCompletedTodos(reducedCompletedTodos);
      localStorage.setItem(
        "completedTodos",
        JSON.stringify(reducedCompletedTodos),
      );
    } else {
      const reducedTodo = [...allTodos];
      reducedTodo.splice(index, 1);
      setTodos(reducedTodo);
      localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    }
  };

  const handleCompleteTodo = (index) => {
    const now = new Date();
    const completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const completedItem = {
      ...allTodos[index],
      completedOn,
    };

    const updatedCompletedArr = [...completedTodos, completedItem];
    setCompletedTodos(updatedCompletedArr);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));

    const remainingTodos = [...allTodos];
    remainingTodos.splice(index, 1);
    setTodos(remainingTodos);
    localStorage.setItem("todolist", JSON.stringify(remainingTodos));
  };

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditItem({ title: item.title, description: item.description });
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditItem((prev) => {
      return { ...prev, title: value };
    });
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditItem((prev) => {
      return { ...prev, description: value };
    });
  };

  const handleUpdateTodo = () => {
    let prevToDo = [...allTodos];
    prevToDo[currentEdit] = currentEditItem;
    setTodos(prevToDo);
    localStorage.setItem("todolist", JSON.stringify(prevToDo));
    setCurrentEdit("");
    setCurrentEditItem("");
  };

  const menu = (index, item, isCompleted = false) => (
    <Menu className="w-[120px]">
      {!isCompleted && (
        <>
          <Menu.Item
            className="flex"
            key="1"
            onClick={() => handleEdit(index, item)}
          >
            <div className="flex items-center gap-1 bg-orange-500 rounded p-1 text-white">
              <div>
                <AiOutlineEdit
                  title="Edit?"
                  style={{ color: "white" }}
                  size={20}
                />
              </div>
              <div>
                <span>Edit</span>
              </div>
            </div>
          </Menu.Item>
          <Menu.Item key="3" onClick={() => handleCompleteTodo(index)}>
            <div className="flex items-center gap-1 bg-green-500 p-1 rounded text-white">
              <div>
                <AiOutlineCheck
                  title="Complete?"
                  style={{ color: "white" }}
                  size={20}
                />
              </div>
              <div>
                <span>Complete</span>
              </div>
            </div>
          </Menu.Item>
        </>
      )}
      <Menu.Item key="2" onClick={() => handleDeleteTodo(index, isCompleted)}>
        <div className="flex items-center gap-1 bg-red-500 p-1 rounded text-white">
          <div>
            <AiOutlineDelete
              title="Delete?"
              style={{ color: "white" }}
              size={20}
            />
          </div>
          <div>
            <span>Delete</span>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <h1 className="text-4xl font-bold text-white text-center mt-[100px] mb-5">
        To Do App
      </h1>
      <div className="container w-fit mx-auto my-auto bg-[#2d2c2c] min-h-[32vh] shadow shadow-[#000000]">
        <div className="todo-wrapper p-8">
          <div className="todo-input flex items-center justify-center pb-8 border-b border-gray-700 mb-25">
            <div className="todo-input-item flex flex-col items-start mr-4">
              <label className="font-bold mb-3">Title</label>
              <input
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="p-3 w-[300px]"
                type="text"
                placeholder="What needs to be done?"
              />
            </div>
            <div className="todo-input-item flex flex-col items-start mr-4">
              <label className="font-bold mb-3">Description</label>
              <input
                required
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="p-3 w-[300px]"
                type="text"
                placeholder="What needs to be done description?"
              />
            </div>
            <div className="todo-input-item">
              <button
                onClick={handleAddTo}
                className="mt-[37px] cursor-pointer bg-[rgb(0,230,122)] text-white w-[100px] p-3 rounded-md hover:bg-[rgb(0,196,106)] transition-all duration-300"
                type="button"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <div>
              <button
                className={`mt-[37px] mb-[20px] rounded-l-md cursor-pointer text-white max-w-[100px] p-[11px] transition-all duration-300 ${!isCompleteScreen ? "bg-[rgb(0,230,122)]" : "bg-[rgb(71,71,71)]"}`}
                type="button"
                onClick={() => setCompleteScreen(false)}
              >
                To Do
              </button>
              <button
                className={`mt-[37px] mb-[20px] rounded-r-md cursor-pointer text-white max-w-[100px] p-[11px] transition-all duration-300 ${isCompleteScreen ? "bg-[rgb(0,230,122)]" : "bg-[rgb(71,71,71)]"}`}
                type="button"
                onClick={() => setCompleteScreen(true)}
              >
                Completed
              </button>
            </div>

            {allTodos.map((item, index) =>
              currentEdit === index ? (
                <div key={index} className="flex w-full justify-between gap-3">
                  <input
                    className="w-[300px] p-2 px-4"
                    placeholder="Updated Title"
                    onChange={(e) => handleUpdateTitle(e.target.value)}
                    value={currentEditItem.title}
                  />
                  <input
                    className="w-[300px] p-2 px-4"
                    placeholder="Updated Description"
                    onChange={(e) => handleUpdateDescription(e.target.value)}
                    value={currentEditItem.description}
                  />
                  <button
                    className="cursor-pointer bg-[rgb(0,230,122)] text-white w-[100px] p-3 rounded-md hover:bg-[rgb(0,196,106)] transition-all duration-300"
                    type="button"
                    onClick={handleUpdateTodo}
                  >
                    Update
                  </button>
                </div>
              ) : (
                <div
                  key={index}
                  className="flex w-full p-2 mt-2 px-4 items-center bg-[rgb(70,69,69)]"
                >
                  <div className="flex-grow overflow-hidden max-h-[150px] ">
                    <h2 className="text-2xl font-bold text-[rgb(0,230,122)]">
                      {item.title}
                    </h2>
                    <p className="text-lg text-[rgb(161,161,161)] break-words">
                      {item.description}
                    </p>
                  </div>
                  <div>
                    <Dropdown overlay={menu(index, item)} trigger={["click"]}>
                      <AiOutlineEllipsis className="cursor-pointer" size={40} />
                    </Dropdown>
                  </div>
                </div>
              ),
            )}

            {isCompleteScreen &&
              completedTodos.map((item, index) => (
                <div
                  key={index}
                  className="flex w-full p-2 mt-2 px-4 items-center bg-[rgb(70,69,69)]"
                >
                  <div className="flex-grow overflow-hidden max-h-[150px]">
                    <h2 className="text-2xl font-bold text-[rgb(0,230,122)]">
                      {item.title}
                    </h2>
                    <p className="text-lg text-[rgb(161,161,161)] break-words">
                      {item.description}
                    </p>
                    <p className="text-sm text-[rgb(161,161,161)] break-words">
                      Completed on: {item.completedOn}
                    </p>
                  </div>
                  <Dropdown
                    overlay={menu(index, item, true)}
                    trigger={["click"]}
                  >
                    <AiOutlineEllipsis className="cursor-pointer" size={40} />
                  </Dropdown>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
