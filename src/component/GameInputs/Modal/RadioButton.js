import React from "react";
import "./Modal.css";

function RadioButton(props){
  return(
    <div className="radio" key={props.key1} onClick={props.onRadioChange}>
      <input type="radio" value={props.label} name={props.nameProp} checked={props.selectedRadio == props.label}/>
      <label style={{marginLeft: "20px"}}>{props.label}</label>
    </div>
  )
}

export default RadioButton;