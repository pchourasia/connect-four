import React, { Component } from "react";
import "./GameInputs.css";
import PlayerCard from "../PlayerCard/PlayerCard";
import Button from "../Button/Button";
import avatar01 from "../../assets/avatar01.png";
import avatar02 from "../../assets/avatar02.png";
import runImg from "../../assets/run.png";
import winnerImg from "../../assets/winner.png";
import { connect } from "react-redux";
import Modal from "./Modal/Modal";

class GameInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalInputs: [],
      modalHeading: "",
      modalName: ""
    }
  }
  startGame() {
    let details = { ...this.props.gameDetails };
    details.player1 = details.player1 == "" ? "Player 01" : details.player1;
    details.player2 = details.player2 == "" ? "Player 02" : details.player2;
    this.props.updateGameDetail(details)
    this.props.history.push('/game/play');
  }

  showNoOfGameModal() {
    this.setState({
      showModal: true,
      modalInputs: ["2 Games", "3 Games", "5 Games", "10 Games"],
      modalHeading: "Number of game",
      modalName: "noOfGame"
    })
  }

  showWhoStartsModal() {
    this.setState({
      showModal: true,
      modalInputs: ["Alternate turn", "Looser first", "Winner first", "Always player 01", "Always player 02"],
      modalHeading: "Who starts",
      modalName: "whoStarts"
    })
  }

  hideModal() {
    this.setState({
      showModal: false
    })
  }

  onInputChnage(event) {
    let val=event.target.value.trim();
    if(val.length > 10){
      val = val.substr(0, 10)
    }
    let details = {...this.props.gameDetails, [event.target.name]: val };
    this.props.updateGameDetail(details)
  }

  render() {
    return (
      <div className="game-input-container">
        <PlayerCard theme="green" logo={avatar01} label="Player 01" value={this.props.gameDetails.player1} isInput={true}
          nameProp="player1"
          onInputChnage={this.onInputChnage.bind(this)}/>
        <PlayerCard theme="yellow" logo={avatar02} label="Player 02" value={this.props.gameDetails.player2} isInput={true}
          nameProp="player2"
          onInputChnage={this.onInputChnage.bind(this)}/>
        <PlayerCard theme="blue" logo={winnerImg} label="Number of game" value={this.props.gameDetails.noOfGame} 
          clickHandler={this.showNoOfGameModal.bind(this)} />
        <PlayerCard theme="blue" logo={runImg} label="Who starts" value={this.props.gameDetails.whoStarts}
          clickHandler={this.showWhoStartsModal.bind(this)} />
        <div className="game-input-container-footer">
          <Button color="blue2" text="Start Game" width="100%" clickHandler={this.startGame.bind(this)} />
        </div>
        {this.state.showModal ? 
          <Modal 
            inputs={this.state.modalInputs}
            heading={this.state.modalHeading}
            nameProp={this.state.modalName}
            hide={this.hideModal.bind(this)} /> 
          : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(GameInputs);