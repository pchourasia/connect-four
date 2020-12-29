import React, { Component } from 'react';
import "./MainPage.css";
import "../../App.css";
import gameImg from "../../assets/4inarow.png";
import userImg from "../../assets/one.png";
import twoPlayerImg from "../../assets/two.png";
import onlineImg from "../../assets/online.png";
import trainingImg from "../../assets/training.png";
import Button from "../Button/Button"

class MainPage extends Component {
	onTwoPlayerSelection = () => {
		this.props.history.push('/game/players');
	}
	render() {
		return (
			<div className="main-content">
				<div className="title-container">
					<span className="title">CONNECT FOUR!</span>
					<div className="subtitle">Play with other players around the world.</div>
				</div>
				<div className="main-container">
					<div className="d-flex" style={{ marginBottom: "-280px" }}>
						<div className="playBtn">
							<div className="playIcon"></div>
							<div className="playText">PLAY</div>
						</div>
						<img src={gameImg} className="game-img" alt="4 in a row" />
					</div>
					<hr />
					<div className="btn-margin">
						<div className="btn-row">
							
							<Button color="blue1" text="Custom Game" logo={userImg} width="48%"/>
							<Button color="blue2" text="Two Players" logo={twoPlayerImg} width="48%" clickHandler={this.onTwoPlayerSelection.bind(this)} />
						</div>
						<div className="btn-row">
							<Button color="blue3" text="Game Online" logo={onlineImg} width="48%" />
							<Button color="blue4" text="Traning Game" logo={trainingImg} width="48%"/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default MainPage;