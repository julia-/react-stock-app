import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-title">Wolf of React</h1>
        <StockInfo
          symbol='AAPL'
          companyName='Apple Inc.'
          primaryExchange='Nasdaq Global Select'
          latestPrice={169.48}
          latestSource='Close'
          week52High={176.24}
          week52Low={108.25}
        />
      </div>
    );
  }
}

export default App;
