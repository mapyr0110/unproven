export function DataTable({ data_, columns }) {  
  if (data_.length === 0) {
    return <p className="no-results">Ничего не найдено</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data_.map((row, i) => ( 
            <tr key={i}>
              {columns.map((col) => (
                <td key={col}>{String(row[col] ?? '—')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}