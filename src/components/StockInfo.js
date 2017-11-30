import React from 'react'

function StockInfo({
  symbol, // "AAPL"
  companyName, // "Apple Inc."
  primaryExchange, // "Nasdaq Global Select"
  latestPrice, // 169.48
  latestSource, // "Close"
  week52High, // 176.24
  week52Low // 108.25
}) {
  return (
    <div>
      <h3>{ symbol } : { companyName }</h3>
      <h4>{ latestPrice } ({ latestSource })</h4>
      <dl>
        <dt>Week 52 High</dt>
        <dd>{ week52High }</dd>
        <dt>Week 52 Low</dt>
        <dd>{week52Low}</dd>
      </dl>
    </div>
  )
}

export default StockInfo