import React from "react";

function Input({ onChange, placeholder, name, value, type = "text" }) {
  return (
    <input
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      className="form-control"
    />
  );
}

export default Input;
