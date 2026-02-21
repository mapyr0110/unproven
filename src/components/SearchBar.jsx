export function SearchBar({ value, onChange, columns }) {
  // берём первые 3 колонки для подсказки
  const hint = columns.slice(0, 3).join(', ');

  return (
    <input
      className="search-input"
      type="text"
      placeholder={`Поиск по: ${hint}...`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}