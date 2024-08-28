export default function Button({ children, onClick, className, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded font-bold text-white bg-blue-500 hover:bg-blue-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
