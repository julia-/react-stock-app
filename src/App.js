import React, { Component } from 'react'
import './App.css';
import StockInfo from './components/StockInfo'
import Logo from './components/Logo'
import SearchItem from './components/SearchItem'
import NewsItem from './components/NewsItem'
import { Table, TableRow } from './components/ChartTable'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import {
  loadQuoteForStock,
  loadLogoForStock,
  loadLastFiveNewsItems,
  loadSixMonthChart
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
  .then((news) => {
    console.log("News: ", news);
});

loadSixMonthChart("nflx")
  .then((chart) => {
  console.log("Chart: ", chart);
});

class App extends Component {
  state = {
    error: null,
    enteredSymbol: "AAPL",
    quote: null,
    logo: null,
    searchHistory: [],
    newsItems: [],
    chartResults: []
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

    this.setState({
      searchHistory: searchHistory.concat([enteredSymbol])
    })

    loadQuoteForStock(enteredSymbol)
      .then(quote => {
        this.setState({
          quote: quote,
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

      loadSixMonthChart(enteredSymbol)
        .then(chartResult => {
          this.setState({ chartResults: chartResult, error: null });
        })
        .catch(error => {
          if (error.response.status === 404) {
            error = new Error(`The stock symbol '${enteredSymbol}' does not exist`);
          }
          this.setState({ error: error });
          console.error("Error loading quote: ", error);
        });
  };

  render() {
    const { error, enteredSymbol, quote, logo, newsItems, searchHistory, chartResults } = this.state;

    return (
      <div className="App">
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
            newsItems.map(item => <NewsItem key={item.call} {...item} />)}
        </ol>
        <h2>Six Month Table</h2>
        <Table>
          {!!chartResults.length >= 1 &&
            chartResults.map(row => <TableRow key={row.call} {...row} />)}
        </Table>

        <h2>Chart</h2>
        <LineChart width={1000} height={400} data={chartResults} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="label" height={60} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="high" stroke="#DDA0DD" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="low" stroke="#b2ffc5" />
          <Line type="monotone" dataKey="open" stroke="#FFDAB9" />
          <Line type="monotone" dataKey="close" stroke="#B0E0E6" />
        </LineChart>

        <h2>Search History</h2>
        <ol>
          {
            !!searchHistory.length >= 1 &&
              searchHistory.map(item => (
                <SearchItem key={item.call} item={item} />
              ))
          }
        </ol>
      </div>
    )
  }
}

export default App;
