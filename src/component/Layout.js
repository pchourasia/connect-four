import React, {Component} from "react";
import { Route, Switch } from 'react-router-dom';
import GameContainer from "./GameContainer/GameContainer";
import GameInputs from "./GameInputs/GameInputs";
import Navbar from "./Navbar/Navbar";

class Layout extends Component{
  render(){
    return(
      <div>
      <Navbar history={this.props.history}/>
      <Switch>
        <Route path="/game/players" component={GameInputs} />
          <Route path="/game/play" component={GameContainer} />
      </Switch>
      </div>
    )
  }
}

export default Layout;