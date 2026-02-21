export function ErrorMessage({ message }) {
  return (
    <div className="error-box">
      <span>⚠️</span>
      <p>Что-то пошло не так: {message}</p>
      <small>Попробуйте обновить страницу</small>
    </div>
  );
}