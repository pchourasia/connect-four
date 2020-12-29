import React, { Component } from "react";
import "./Modal.css";
import RadioButton from "./RadioButton";
import Button from "../../Button/Button";
import { connect } from "react-redux";

class Modal extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedRadio: this.props.gameDetails[this.props.nameProp]
    }
  }
  onRadioChange(event){
    this.setState({
      selectedRadio: event.currentTarget.innerText
    })
  }

  okClick(){
    let detail = this.props.gameDetails;
    detail[this.props.nameProp] = this.state.selectedRadio;
    this.props.updateGameDetail(detail);
    this.props.hide();
  }

  render() {
    let radio = [];
    for (let i = 0; i < this.props.inputs.length; i++) {
      radio.push(<RadioButton key1={this.props.inputs[i]} 
          label={this.props.inputs[i]} 
          nameProp={this.props.nameProp} 
          selectedRadio={this.state.selectedRadio}
          onRadioChange={this.onRadioChange.bind(this)} />);
    }
    return (
      <div className="modal-container">
        <div className="modal">
          <div className="heading">{this.props.heading}</div>
          <div className="body">
            {radio}
          </div>
          <div className="footer">
            <Button color="secondary" text="CANCEL" width="48%" clickHandler={this.props.hide} />
            <Button color="blue2" text="OK" width="48%" clickHandler={this.okClick.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    gameDetails: state.gameDetails
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateGameDetail: (payload) => dispatch({ type: "GAME_DETAIL", data: payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);