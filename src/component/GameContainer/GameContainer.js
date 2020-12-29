import React, { Component } from "react";
import { connect } from "react-redux";
import "./GameContainer.css";
import PlayerCard from "../PlayerCard/PlayerCard";
import avatar01 from "../../assets/avatar01.png";
import avatar02 from "../../assets/avatar02.png";
import Button from "../Button/Button";
import { noOfGame } from "../../types";

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.circles = []

    this.circlesDiv = [];
    this.rowsDiv = [];

    this.initializeCircle();
    this.totalGame = noOfGame;
    this.whoStarts = 2; //for alternate
    this.updateTurn();

    this.state = {
      gameCount: 1,
      circles: this.circles,
      currentPlayer: this.whoStarts,
      winData: { player1: 0, player2: 0 },
      winCircles: [],
      gameComplete: false,
      tournamentComplete: false,
      winner: ""
    }
  }

  initializeCircle() {
    for (let i = 0; i < 8; i++) {
      this.circles.push([]);
      for (let j = 0; j < 8; j++) {
        this.circles[i][j] = "";
      }
    }
  }

  updateTurn() {
    let currentPlayer = this.state ? this.state.currentPlayer : 2;
    switch (this.props.gameMeta.whoStarts) {
      case "Alternate turn":
        this.whoStarts = this.whoStarts == 1 ? 2 : 1
        break;
      case "Looser first":
          this.whoStarts= currentPlayer == 1 ? 2 : 1 //current player is also the current winner
        break;
      case "Winner first":
          this.whoStarts= currentPlayer //current player is also the current winner
        break;
      case "Always player 01":
          this.whoStarts= 1
        break;
      case "Always player 02":
          this.whoStarts= 2
        break;
    }
  }

  gameReset() {
    this.initializeCircle();
    this.updateTurn();
    this.setState({
      gameCount: this.state.gameCount + 1,
      circles: this.circles,
      currentPlayer: this.whoStarts,
      winCircles: [],
      gameComplete: false,
      winner: ""
    })
  }

  tournamentReset() {
    this.initializeCircle();
    this.updateTurn();
    this.setState({
      gameCount: 1,
      circles: this.circles,
      currentPlayer: this.whoStarts,
      winData: { player1: 0, player2: 0 },
      winCircles: [],
      gameComplete: false,
      tournamentComplete: false,
      winner: ""
    })
  }

  onColumnClick(event) {
    let circles = this.state.circles
    let col = +event.target.dataset.col;
    let currentPlayer = this.state.currentPlayer;
    let index = -1;
    let winCircles, isGameComplete = false;
    let winDetails = this.state.winData;
    let winner = ""
    for (let i = 7; i >= 0; i--) {
      if (circles[i][col] == "") {
        circles[i][col] = this.state.currentPlayer;
        index = i;
        winCircles = this.checkWin(circles, col, index);
        if (winCircles) {
          winDetails["player" + this.state.currentPlayer] += 1;
          isGameComplete = true;
          winner = this.props.gameMeta["player" + this.state.currentPlayer];
          break;
        }
        if (this.state.currentPlayer == 1) {
          currentPlayer = 2
        } else {
          currentPlayer = 1
        }
        break;
      }
    }

    console.log(circles, winCircles)
    this.setState({
      circles: circles,
      currentPlayer: currentPlayer,
      winData: winDetails,
      winCircles: winCircles,
      gameComplete: isGameComplete,
      winner: winner,
      tournamentComplete: this.state.gameCount == this.totalGame[this.props.gameMeta.noOfGame]
    })
  }

  checkWin(circles, col, row) {
    let currentPlayer = this.state.currentPlayer;
    let rowCount = [], colCount = [], leftDiagCount = [], rightDiagCount = [];

    //row
    for (let i = 0; i < 8; i++) {
      if (circles[row][i] == currentPlayer) {
        rowCount.push(row + "" + i);
        if (rowCount.length == 4) {
          return rowCount;
        }
      } else {
        rowCount = [];
      }

      //col
      if (circles[i][col] == currentPlayer) {
        colCount.push(i + "" + col);
        if (colCount.length == 4) {
          return colCount;
        }
      } else {
        colCount = [];
      }
    }

    //left Diag
    let x, y;
    if (row > col) {
      x = row - col; y = 0;
    } else if (row < col) {
      x = 0; y = col - row;
    } else {
      x = 0; y = 0;
    }
    for (let i = x, j = y; i < 8 && j < 8; i++, j++) {
      if (circles[i][j] == currentPlayer) {
        leftDiagCount.push(i + "" + j);
        if (leftDiagCount.length == 4) {
          return leftDiagCount;
        }
      } else {
        leftDiagCount = []
      }
    }

    //right Diag
    let xend, yend;
    if (row + col < 7) {
      x = 0; y = row + col;
      xend = row + col; yend = 0;
    } else {
      x = row + col - 7; y = 7;
      xend = 7; yend = row + col - 7;
    }
    for (let i = x, j = y; i <= xend && j >= yend; i++, j--) {
      if (circles[i][j] == currentPlayer) {
        rightDiagCount.push(i + "" + j);
        if (rightDiagCount.length == 4) {
          return rightDiagCount;
        }
      } else {
        rightDiagCount = []
      }
    }
  }

  endTournament() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="full-container">
        <div className="game-container">
          <div className="game-bg" onClick={this.state.gameComplete ? null : this.onColumnClick.bind(this)}>
            {this.circles.map((items, rowIndex) => {
              return (
                <div className='rows' key={rowIndex}>
                  {items.map((subItems, colIndex) => {
                    return (
                      <div className={"circle" + (this.state.winCircles && this.state.winCircles.includes(rowIndex + "" + colIndex) ? " win-mark" : "")} key={rowIndex + "" + colIndex} data-col={colIndex}>
                        {
                          subItems == 1 ? <div className="p1-img"><img src={avatar01} className="imgSize" /></div> : null
                        }
                        {
                          subItems == 2 ? <div className="p2-img"><img src={avatar02} className="imgSize" /></div> : null
                        }

                      </div>
                    )
                  })}
                </div>
              )
            })
            }
          </div>
        </div>
        <div className="dashboard">
          <div className="title">{this.props.gameMeta.noOfGame} Tournament</div>

          {this.state.gameComplete ?
            <div className="congrats">{this.state.tournamentComplete && this.state.winData.player1 == this.state.winData.player2
              ? "Tournament Draw!" : "Congratulations!"}</div>
            : null
          }
          <div className="subtitle">{
            this.state.tournamentComplete && this.state.winData.player1 != this.state.winData.player2 ?
              (this.state.winData.player1 > this.state.winData.player2 ? this.props.gameMeta.player1 : this.props.gameMeta.player2) + ", you won Tournament" :
              this.state.gameComplete ? this.state.winner + ", you won Game " + this.state.gameCount :
                "Playing Game " + this.state.gameCount}</div>
          <PlayerCard theme="green" logo={avatar01} label="Player 01" value={this.props.gameMeta.player1}
            score={this.state.winData.player1}
            selectedPlayer={this.state.gameComplete ? false : this.state.currentPlayer == 1} />
          <PlayerCard theme="yellow" logo={avatar02} label="Player 02" value={this.props.gameMeta.player2}
            score={this.state.winData.player2}
            selectedPlayer={this.state.gameComplete ? false : this.state.currentPlayer == 2} />
          <div className="footer">
            {this.state.gameComplete ? this.state.tournamentComplete ?
              <Button color="blue2" text="Play Again" logo="" width="100%" fontWeight="600" clickHandler={this.tournamentReset.bind(this)} />
              :
              <Button color="blue2" text="Next Game" logo="" width="100%" fontWeight="600" clickHandler={this.gameReset.bind(this)} />
              :
              <Button color="blue2" text="Undo Step" logo="" width="100%" fontWeight="600" />
            }
            <div style={{ marginTop: "20px" }}>
              <Button color="secondary btn-red" text="End Tournament" logo="" width="100%" fontWeight="600"
                clickHandler={this.endTournament.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    gameMeta: state.gameDetails
  }
}

export default connect(mapStateToProps)(GameContainer)