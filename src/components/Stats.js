export default function Stats({ items }) {
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
