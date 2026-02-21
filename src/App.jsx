import { useState, useEffect, useMemo } from 'react';
import { useData } from './hooks/useData';
import { exportToPDF } from './utils/exportPDF';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { SearchBar } from './components/SearchBar';
import { DataTable } from './components/DataTable';
import { ColumnSelector } from './components/ColumnSelector';
import './App.css';

export default function App() {
  const { data_, columns, loading, error } = useData(
    'https://jsonplaceholder.typicode.com/users' // url апиши который вам нужен 
  );

  const [search, setSearch] = useState('');
  const [selectedColumns, setSelectedColumns] = useState([]);

  // Когда колонки загрузились с API — выбираем все по умолчанию
  useEffect(() => {
    if (columns.length > 0) setSelectedColumns(columns);
  }, [columns]);

  const filteredData = useMemo(
    () =>
      data_.filter((u) =>
        // ищем по всем строковым полям, не только по имени
        Object.values(u).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      ),
    [data_, search]
  );

  return (
    <div className="app">

      <main className="app-main">
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <>
            <div className="controls">
              <SearchBar value={search} onChange={setSearch} columns={columns} />
              <button
                className="btn-pdf"
                onClick={() => exportToPDF(filteredData, selectedColumns)}
              >
                 Скачать PDF
              </button>
            </div>

            {/* передаём columns из API */}
            <ColumnSelector
              columns={columns}
              selected={selectedColumns}
              onChange={setSelectedColumns}
            />

            <p className="results-count">
              Найдено: {filteredData.length} из {data_.length}
            </p>

            {/* передаём selectedColumns чтобы таблица тоже была динамической */}
            <DataTable data_={filteredData} columns={selectedColumns} />
          </>
        )}
      </main>
    </div>
  );
}