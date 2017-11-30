import React from 'react'
import moment from 'moment'

function NewsItem ({
  datetime,
  headline,
  source,
  url,
  summary
}) {
  return <div>
      <h3>{headline}</h3>
      <p>
        <time datetime={datetime}>{datetime}</time>
      </p>
      <p>{summary}</p>
      <a href={url}>{`View article (Source: ${source})`}</a>
    </div>;
}

export default NewsItem