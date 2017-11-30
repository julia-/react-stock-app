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
    quote: null
  }

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    loadQuoteForStock('nflx')
    .then((quote) => {
      this.setState({ quote: quote })
    })
    .catch((error) => {
      // If 404 found
      if (error.response.status === 404) {
        error = new Error('The stock symbol does not exist')
      }
      this.setState({ error: error })
      console.error('Error loading quote: ', error)
    })
  }

  render() {
    const { error, quote } = this.state // same as const quote = this.state.quote

    return (
      <div className="App">
        <h1 className="App-title">Wolf of React</h1>
        {
          !!error && // conditional must be true to show
          <p>{ error.message }</p>
        }
        {
          !!quote ? (
            <StockInfo
              { ...quote }
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
