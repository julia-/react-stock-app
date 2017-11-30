import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo'
import { loadQuoteForStock } from './api/iex'

loadQuoteForStock('nflx')
  .then((quote) => {
    console.log('Netflix: ', quote);
  })

class App extends Component {
  state = {
    quote: null
  }

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    loadQuoteForStock('nflx')
    .then((quote) => {
      this.setState({ quote: quote })
    })

  }

  render() {
    const { quote } = this.state // same as const quote = this.state.quote

    return (
      <div className="App">
        <h1 className="App-title">Wolf of React</h1>
        {
          !!quote ? (
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
          ) : (
            <p>Loading...</p>
          )
        }
      </div>
    );
  }
}

export default App;
