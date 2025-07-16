export default function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
    >
      {children}
    </button>
  );
}
