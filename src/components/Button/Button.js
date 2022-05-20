import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button className="Button" onClick={(props.getInput, props.getWeather)}>
      {props.nameBTN}
    </button>
  );
};

export default Button;
