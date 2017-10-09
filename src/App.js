import React, {Component} from 'react';
import rushingData from './static/rushing.json';
import PlayersGrid from './players-grid/PlayersGrid';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <h1 className="App-title">theScore NFL Rushing App</h1>
                </header>
                <PlayersGrid rushingData={rushingData}/>
            </div>
        );
    }
}

export default App;
