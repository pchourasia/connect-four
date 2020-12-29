import React from "react";
import "./Button.css";

function Button(props) {
  return (
    <div style={{ width: props.width }} className="btn-height">
      <button className={"btn btn-" + (props.color)} onClick={props.clickHandler}>
        {props.logo ?
          <img src={props.logo} className="logo" alt="" /> : null
        }
        <span style={{fontWeight: props.fontWeight}}>{props.text}</span></button>
    </div>
  )
}

export default Button;