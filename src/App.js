import React, { Component } from 'react'
import './App.css';
import StockInfo from './components/StockInfo'
import Logo from './components/Logo'
import SearchItem from './components/SearchItem'
import NewsItem from './components/NewsItem';
import {
  loadQuoteForStock,
  loadLogoForStock,
  loadLastFiveNewsItems
} from "./api/iex";

loadQuoteForStock('nflx')
  .then((quote) => {
    console.log('Netflix: ', quote);
  })

loadLogoForStock("nflx")
  .then((logo) => {
    console.log("Netflix: ", logo);
})

loadLastFiveNewsItems("nflx")
  .then(news => {
    console.log("News: ", news);
});

class App extends Component {
  state = {
    error: null,
    enteredSymbol: "AAPL",
    quote: null,
    logo: null,
    searchHistory: [],
    newsItems: [
      // {
      //  dateTime: null,
      //  headline: null,
      //  source: null,
      //  url: null,
      //  summary: null
      // }
    ]
  };

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    this.loadQuote();
  }

  onChangeEnteredSymbol = event => {
    const input = event.target;
    const rawValue = input.value;
    const value = rawValue.trim().toUpperCase();
    this.setState({
      enteredSymbol: value
    });
  };

  loadQuote = () => {
    const { enteredSymbol, searchHistory } = this.state;

    loadQuoteForStock(enteredSymbol)
      .then(quote => {
        this.setState({
          quote: quote,
          searchHistory: searchHistory.concat([enteredSymbol]),
          error: null
        });
      })
      .catch(error => {
        // If 404 found
        if (error.response.status === 404) {
          error = new Error(
            `The stock symbol '${enteredSymbol}' does not exist`
          );
        }
        this.setState({ error: error });
        console.error("Error loading quote: ", error);
      });

    loadLastFiveNewsItems(enteredSymbol)
      .then(newsItem => {
        this.setState({
          newsItems: newsItem,
          error: null
        });
      })
      .catch(error => {
        // If 404 found
        if (error.response.status === 404) {
          error = new Error(
            `The stock symbol '${enteredSymbol}' does not exist`
          );
        }
        this.setState({ error: error });
        console.error("Error loading quote: ", error);
      });

    loadLogoForStock(enteredSymbol)
      .then(logo => {
        this.setState({ logo: logo.url, error: null });
      })
      .catch(error => {
        if (error.response.status === 404) {
          error = new Error(
            `The stock symbol '${enteredSymbol}' does not exist`
          );
        }
        this.setState({ error: error });
        console.error("Error loading quote: ", error);
      });
  };

  render() {
    const {
      error,
      enteredSymbol,
      quote,
      logo,
      newsItems,
      searchHistory
    } = this.state;
    console.log("News Items: ", newsItems);
    return <div className="App">
        <h1 className="App-title">Wolf of React</h1>
        <h2>Quote</h2>
        <input value={enteredSymbol} placeholder="Symbol e.g. NFLX" aria-label="Stock Symbol" onChange={this.onChangeEnteredSymbol} />
        <button onClick={this.loadQuote}>Submit</button>

        {!!error && <p>
            {error.message // conditional must be true to show
            }
          </p>}
        {!!logo && <Logo logo={logo} />}
        {!!quote ? <StockInfo {...quote} /> : <p>Loading...</p>}
        <h2>Latest News</h2>
        <ol>
          {!!newsItems.length >= 1 &&
            newsItems.map(item => (
              <NewsItem key={item.call} {...item} />
            ))}
        </ol>
        <h2>Search History</h2>
        <ol>
          {!!searchHistory.length >= 1 &&
            searchHistory.map(item => (
              <SearchItem key={item.call} item={item} />
            ))}
        </ol>
      </div>;
  }
}

export default App;
