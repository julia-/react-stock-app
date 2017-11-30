import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo'
import Logo from "./components/Logo";
import { loadQuoteForStock, loadLogoForStock } from './api/iex'

loadQuoteForStock('nflx')
  .then((quote) => {
    console.log('Netflix: ', quote);
  })

loadLogoForStock("nflx")
  .then((logo) => {
    console.log("Netflix: ", logo);
});

class App extends Component {
  state = {
    error: null,
    enteredSymbol: 'AAPL',
    quote: null,
    logo: null
  };

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    this.loadQuote()
  }

  onChangeEnteredSymbol = (event) => {
    const input = event.target
    const rawValue = input.value
    const value = rawValue.trim().toUpperCase()
    this.setState({
      enteredSymbol: value
    })
  }

  loadQuote = () => {
    const { enteredSymbol } = this.state

    loadQuoteForStock(enteredSymbol)
      .then((quote) => {
        this.setState({
          quote: quote,
          error: null
        });
      })
      .catch((error) => {
        // If 404 found
        if (error.response.status === 404) {
          error = new Error(`The stock symbol '${ enteredSymbol }' does not exist`);
        }
        this.setState({ error: error });
        console.error("Error loading quote: ", error);
      });
      loadLogoForStock(enteredSymbol)
        .then((logo) => {
          this.setState({ logo: logo.url, error: null });
        })
        .catch(error => {
          // If 404 found
          if (error.response.status === 404) {
            error = new Error(`The stock symbol '${enteredSymbol}' does not exist`);
          }
          this.setState({ error: error });
          console.error("Error loading quote: ", error);
        });
  }

  render() {
    const { error, enteredSymbol, quote, logo } = this.state;

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
        <button
          onClick={
            this.loadQuote
          }>
          Submit
        </button>

        {!!error && <p>{error.message // conditional must be true to show
          }</p>}
        {!!logo && <Logo logo={logo}/>}
        {!!quote ? <StockInfo {...quote}/> : <p>Loading...</p>}
      </div>
    );
  }
}

export default App;
