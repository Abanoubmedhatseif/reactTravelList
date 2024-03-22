export default function Item({ item, handleDelete, handleToggle }) {
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
