import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(newItem) {
    setItems([...items, newItem]);
  }

  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleToggle(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <Packinglist
        items={items}
        setItems={setItems}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
      />
      <Stats items={items} />
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

function Packinglist({ items, handleDelete, handleToggle, setItems }) {
  const [sortBy, setSortBy] = useState("input");

  function handleClearList() {
    setItems([]);
  }

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  }

  if (sortBy === "description") {
    sortedItems = items.slice().sort((a, b) => a.item.localeCompare(b.item));
  }

  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.checked) - Number(b.checked));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
          />
        ))}
      </ul>
      <div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value={"input"}>Sort by input order</option>
          <option value={"description"}>Sort by description</option>
          <option value={"packed"}>Sort by packed status</option>
        </select>
        <button onClick={handleClearList}>Clear List 🧹</button>
      </div>
    </div>
  );
}

function Item({ item, handleDelete, handleToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.checked}
        onChange={() => handleToggle(item.id)}
      ></input>
      <span style={item.checked ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.item}
      </span>
      <button onClick={() => handleDelete(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <div className="stats">
        <em>Start Adding to your List ✈️</em>
      </div>
    );
  }

  const numberOfItems = items.length;
  const packedItems = items.filter((item) => item.checked).length;
  const precentagePacked = Math.round((packedItems / numberOfItems) * 100);

  return (
    <footer className="stats">
      <em>
        {precentagePacked === 100
          ? "You've got everything, we are good to go （￣︶￣）↗　"
          : `You have ${numberOfItems} elements in your list, and you already packed
        ${packedItems} items (${precentagePacked}%)`}
      </em>
    </footer>
  );
}
