export function ColumnSelector({ columns, selected, onChange }) {
  const toggle = (col) => {
    if (selected.includes(col)) {
      if (selected.length > 1) onChange(selected.filter(c => c !== col));
    } else {
      onChange([...selected, col]);
    }
  };

  return (
    <div className="column-selector">
      <span>Колонки в PDF:</span>
      {columns.map(col => (
        <label key={col}>
          <input
            type="checkbox"
            checked={selected.includes(col)}
            onChange={() => toggle(col)}
          />
          {col} {/* просто показываем ключ как есть: "address.city" */}
        </label>
      ))}
    </div>
  );
}