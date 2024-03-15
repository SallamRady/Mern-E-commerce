import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";

export default function FormPasswordField({
  id,
  name,
  label,
  value,
  handleOnChange,
  errorMsg,
}) {
  // declare component state
  const [showPassword, setShowPassword] = useState(false);
  let inputClass =
    "flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300";
  if (errorMsg) inputClass += " bg-red-200 focus-within:outline-red-400";
  // return component ui
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className={inputClass}>
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          className={` w-full bg-slate-200 border-none outline-none ${
            errorMsg ? "bg-red-200" : ""
          }`}
          value={value}
          onChange={handleOnChange}
        />
        <span
          className="flex text-xl cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <BiHide /> : <BiShow />}
        </span>
      </div>
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
