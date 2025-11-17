export default function Search({ value, onChange }) {
  return (
    <input value={value} onChange={onChange} placeholder="search country..." />
  );
}
