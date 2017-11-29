import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo'

class App extends Component {
  state = {
    quote: {
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      primaryExchange: 'Nasdaq Global Select',
      latestPrice: 169.48,
      latestSource: 'Close',
      week52High: 176.24,
      week52Low: 108.25
    }
  }
  render() {
    const { quote } = this.state // same as const quote = this.state.quote

    return (
      <div className="App">
        <h1 className="App-title">Wolf of React</h1>
        <StockInfo
          { ...quote }
          // symbol={quote.symbol}
          // companyName={quote.companyName}
          // primaryExchange={quote.primaryExchange}
          // latestPrice={quote.latestPrice}
          // latestSource={quote.latestSource}
          // week52High={quote.week52High}
          // week52Low={quote.week52Low}
        />
      </div>
    );
  }
}

export default App;
