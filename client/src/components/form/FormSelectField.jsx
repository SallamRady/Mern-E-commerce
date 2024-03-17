export default function FormSelectField({
  id,
  multiple,
  name,
  label,
  value,
  handleOnChange,
  options,
  errorMsg,
  disabled,
}) {
  let inputClass =
    "mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300";
  if (errorMsg) inputClass += " bg-red-200 focus-within:outline-red-400";

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        className={inputClass}
        id={id}
        name={name}
        multiple={multiple}
        onChange={handleOnChange}
        value={value}
        disabled={disabled}
      >
        {options.map((option) => {
          return (
            <option
              key={`op_${Math.random()}_${option.value}`}
              value={option.value}
            >
              {option.name}
            </option>
          );
        })}
      </select>
      {errorMsg &&
        errorMsg.split("<br/>").map((msg, idx) => {
          return (
            <p key={`e_m_${idx}_${msg}`} className="text-xs text-red-600">
              {msg}
            </p>
          );
        })}
    </>
  );
}
