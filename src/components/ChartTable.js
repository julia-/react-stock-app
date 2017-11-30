import React from 'react'

function Table({
  children
}) {
  return(
  <table>
    <thead>
      <tr>
        <td>Date</td>
        <td>Open</td>
        <td>High</td>
        <td>Low</td>
        <td>Close</td>
        <td>Volume</td>
        <td>Unadjusted Volume</td>
        <td>Change</td>
        <td>changePercent</td>
        <td>vwapv</td>
        <td>labelv</td>
        <td>changeOverTime</td>
      </tr>
    </thead>
      {children}
    </table>)
}

function TableRow({
  date,
  open,
  high,
  low,
  close,
  volume,
  unadjustedVolume,
  change,
  changePercent,
  vwap,
  label,
  changeOverTime
}) {
  return(
    <tr>
      <td>{date}</td>
      <td>{open}</td>
      <td>{high}</td>
      <td>{low}</td>
      <td>{close}</td>
      <td>{volume}</td>
      <td>{unadjustedVolume}</td>
      <td>{change}</td>
      <td>{changePercent}</td>
      <td>{vwap}</td>
      <td>{label}</td>
      <td>{changeOverTime}</td>
    </tr>)
}

export { Table, TableRow }