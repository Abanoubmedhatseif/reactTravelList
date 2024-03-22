import { useState } from "react";
import Logo from "./Logo.js";
import Form from "./Form.js";
import Packinglist from "./Packinglist.js";
import Stats from "./Stats.js";

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
