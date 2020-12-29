import React from "react";
import "./PlayerCard.css"

function PlayerCard(props) {
  return (
    <div className={"card card-theme-" + props.theme} onClick={props.clickHandler}>
      <div className={props.selectedPlayer ? "selected-player" : "non-selected-player"}>
        <div className="img-container">
          <img src={props.logo} className="logoImg" />
        </div>
      </div>
      {
        props.isInput ?
          <div className={"container bottom-border"}>
            <span className="label">{props.label}</span>
            <input type="text" className="customize-input value" name={props.nameProp} value={props.value}
              onChange={props.onInputChnage}/>
          </div>
          :
          <div className={"container " + (props.score == undefined ? "bottom-border" : "")}>
            <span className="label">{props.label}</span>
            <div className="value">{props.value}</div>
          </div>
      }

      {
        props.score != undefined ?
          <div className="container score">
            <span className="label">Score</span>
            <span className="value">{props.score}</span>
          </div>
          : null
      }
    </div>
  )
}

export default PlayerCard;