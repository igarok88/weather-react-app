import React from "react";
import "./Input.css";

const Input = (props) => {
  return (
    <input
      className="Input"
      type="text"
      onChange={props.getInput}
      onKeyUp={props.getInput}
    />
  );
};

export default Input;
