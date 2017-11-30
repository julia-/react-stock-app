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
    error: null,
    enteredSymbol: 'NFLX',
    quote: null
  };

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    loadQuoteForStock("nflx")
      .then(quote => {
        this.setState({ quote: quote });
      })
      .catch(error => {
        // If 404 found
        if (error.response.status === 404) {
          error = new Error("The stock symbol does not exist");
        }
        this.setState({ error: error });
        console.error("Error loading quote: ", error);
      });
  }
  onChangeEnteredSymbol = (event) => {
    const input = event.target
    const rawValue = input.value
    const value = rawValue.trim().toUpperCase()
    this.setState({
      enteredSymbol: value
    })
  }

  render() {
    const { error, enteredSymbol, quote } = this.state;

    return (
      <div className="App">
        <h1 className="App-title">Wolf of React</h1>

        <input
          value={enteredSymbol}
          placeholder="Symbol e.g. NFLX"
          aria-label="Stock Symbol"
          onChange={
            this.onChangeEnteredSymbol
          }
        />

        {!!error && <p>{error.message // conditional must be true to show
          }</p>}
        {!!quote ? <StockInfo {...quote} /> : <p>Loading...</p>}
      </div>
    );
  }
}

export default App;
