export default function Input({ label, id, type = "text", ...props }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2 font-bold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full px-3 py-2 border rounded"
        {...props}
      />
    </div>
  );
}
