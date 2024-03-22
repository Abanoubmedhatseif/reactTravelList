import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(newItem) {
    setItems([...items, newItem]);
  }

  function handleDelete(itemToDelete) {
    setItems(items.filter((item) => item !== itemToDelete));
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <Todolist items={items} handleDelete={handleDelete} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1> ❤️😍 Travel List 🏖️ </h1>;
}

function Form({ handleAddItems }) {
  const [item, setitem] = useState("");
  const [quantity, setquantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!item) return;
    const newitem = { item, quantity, packed: false, id: Date.now() };
    console.log(newitem);
    handleAddItems(newitem);
    setitem("");
    setquantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What to pack ? 🤔</h3>
      <select
        value={quantity}
        onChange={(e) => setquantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="New item..."
        value={item}
        onChange={(e) => setitem(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}
function Todolist({ items, handleDelete }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} handleDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, handleDelete }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.item}
      </span>
      <button onClick={() => handleDelete(item)}>❌</button>
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
