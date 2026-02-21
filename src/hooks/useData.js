import { useState, useEffect } from 'react';

function isPrimitive(val) {
  return val === null || val === undefined || typeof val !== 'object';
}

function flattenObject(obj, prefix = '', depth = 0) {
  if (depth > 2) return {};

  return Object.entries(obj).reduce((acc, [key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (isPrimitive(value)) {
      acc[fullKey] = value ?? '—';
    } else if (Array.isArray(value)) {
      if (isPrimitive(value[0])) {
        acc[fullKey] = value[0] ?? '—';
      }
    } else if (typeof value === 'object') {
      Object.assign(acc, flattenObject(value, fullKey, depth + 1));
    }

    return acc;
  }, {});
}

function normalizeData(raw) {
  if (Array.isArray(raw)) return raw;
  const arrayKey = Object.keys(raw).find(k => Array.isArray(raw[k]));
  if (arrayKey) return raw[arrayKey];
  return [];
}

export function useData(apiUrl) {
  const [data_, setData_]     = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then(raw => {
        const list = normalizeData(raw);

        if (list.length === 0) throw new Error('API вернул пустой список');

        const flat = list.map(item =>
          typeof item === 'object' && !Array.isArray(item)
            ? flattenObject(item)
            : { value: item }
        );

        const allKeys = Object.keys(flat[0]);
        const validCols = allKeys.filter(col =>
          flat.some(row => row[col] !== '—' && row[col] !== null && row[col] !== '')
        );

        setColumns(validCols);
        setData_(flat);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return { data_, columns, loading, error };
}