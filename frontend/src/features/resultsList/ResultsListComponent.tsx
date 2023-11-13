import React from 'react';
import './results-list.scss';

export interface ResultItem {
  title: string;
  description: string;
  url: string;
}

interface SearchResultsProps {
  items: ResultItem[];
  elapsed: number;
}

const SearchResults: React.FC<SearchResultsProps> = React.memo(({ items, elapsed }) => {
  return (
    <div className="search-results">
      <div className="search-results-metadata">
          {`About ${items.length} results (${elapsed/1000} seconds) `}
      </div>
      {items.map((item, index) => (
        <div className="search-result-item" key={index}>
          <h3 className="result-title">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </h3>
          <p className="result-description">{item.description}</p>
          <a
            className="result-url"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.url}
          </a>
        </div>
      ))}
    </div>
  );
});

export default SearchResults;
