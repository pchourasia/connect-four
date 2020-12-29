const initialState = {
  gameDetails: { player1: "Pawan", player2: "Kumar", noOfGame: "5 Games", whoStarts: "Alternate turn"}
}

const reducer = (state=initialState, action) => {
  switch(action.type){
    case("GAME_DETAIL"):
      return {
        ...state,
        gameDetails: action.data
      }
    default:
      return state;
  }
}

export default reducer;