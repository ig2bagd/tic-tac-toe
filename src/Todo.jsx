import React, { useState, useCallback} from "react";

// https://www.telerik.com/blogs/react-basics-how-use-react-usecallback-effectively
const TodoItem = React.memo(({ todo, onChange }) => {
 console.log(`Rendering ${todo.name} :(`);
 return (
   <div>
     <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
       {todo.name}
     </span>
     <button onClick={() => onChange(todo.id)}>
       {todo.done ? "Undone" : "Done"}
     </button>
   </div>
 );
});

const demoTodos = [
 { id: 0, name: "Todo 1", done: false },
 { id: 1, name: "Todo 2", done: false },
 { id: 2, name: "Todo 3", done: false },
 { id: 3, name: "Todo 4", done: false },
];

const TodoList = () => {
 const [todos, setTodos] = useState(demoTodos);

 const toggleTodo = useCallback((id) => {
   setTodos((prevTodos) =>
     prevTodos.map((todo) =>
       todo.id === id ? { ...todo, done: !todo.done } : todo
     )
   );
 }, []);

 return (
   <div>
     <h2>Today Todo</h2>
     <ul>
       {todos.map((todo) => (
         <li key={todo.id}>
           <TodoItem todo={todo} onChange={toggleTodo} />
         </li>
       ))}
     </ul>
   </div>
 );
};

export default TodoList;