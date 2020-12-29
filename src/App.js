import './App.css';
import MainPage from "./component/MainPage/MainPage";
import { Route, Switch } from 'react-router-dom';
import Layout from './component/Layout';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/game" component={Layout}/>
        <Route path="/" component={MainPage} />
      </Switch>
    </div>
  );
}

export default App;
