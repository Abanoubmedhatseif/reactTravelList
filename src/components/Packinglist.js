import { useState } from "react";
import Item from "./Item.js";

export default function Packinglist({
  items,
  handleDelete,
  handleToggle,
  setItems,
}) {
  const [sortBy, setSortBy] = useState();

  function handleClearList() {
    setItems([]);
  }

  let sortedItems = items;

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
