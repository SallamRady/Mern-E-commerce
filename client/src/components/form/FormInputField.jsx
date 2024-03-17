export default function FormInputField({
  id,
  type,
  name,
  label,
  value,
  handleOnChange,
  errorMsg,
  disabled
}) {
  let inputClass =
    "mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300";
  if (errorMsg) inputClass += " bg-red-200 focus-within:outline-red-400";

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        disabled={disabled}
        className={inputClass}
        value={value}
        onChange={handleOnChange}
      />
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
