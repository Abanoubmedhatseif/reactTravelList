import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 2, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <Todolist />
      <Stats />
      {/* <TestForm /> */}
    </div>
  );
}

function Logo() {
  return <h1> 😍 To-do List 🖊️ </h1>;
}

function Form() {
  const [task, setTask] = useState("");
  const [number, setNumber] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!task) return;
    const newTask = { task, number, done: false, id: Date.now() };
    console.log(newTask);
    setTask("");
    setNumber(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to do ? 🤔</h3>
      <select
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="New Task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}
function Todolist() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item task={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ task }) {
  return (
    <li>
      <span style={task.done ? { textDecoration: "line-through" } : {}}>
        {/* {task.quantity} */}
        {task.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X elements in your list (X%)</em>
    </footer>
  );
}

// function TestForm() {
//   const [testValue, setValue] = useState("");
//   const [testNumber, setNumber] = useState(1);

//   function handleTestSubmit(e) {
//     e.preventDefault();
//     console.log(testNumber + " " + testValue);
//     setValue("");
//     setNumber(1);
//   }

//   return (
//     <form onSubmit={handleTestSubmit}>
//       <input
//         type="text"
//         placeholder="new Task..."
//         onChange={(e) => setValue(e.target.value)}
//       ></input>
//       <select onChange={(e) => setNumber(e.target.value)}>
//         <option value={1}>1</option>
//         <option value={2}>2</option>
//         <option value={3}>3</option>
//       </select>
//       <button>Submit</button>
//     </form>
//   );
// }
