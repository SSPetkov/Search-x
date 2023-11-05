import React from 'react';
import './autocomplete.scss';
import Button from "../../common/Button/Button";

interface AutocompleteSuggestionsComponentProps {
  suggestions: string[];
  visitedSuggestions: string[];
  selectedResult: number | null;
  onResultClick: (result: string) => void;
  handleRemoveSuggestion: (suggestion: string) => void;
}

const AutocompleteSuggestionsComponent: React.FC<
  AutocompleteSuggestionsComponentProps
> = ({
  suggestions,
  onResultClick,
  selectedResult,
  visitedSuggestions,
  handleRemoveSuggestion,
}) => {
  return (
    <ul className="results-dropdown">
      {suggestions.map((value, index) => (
        <li
          key={value}
          className={selectedResult === index ? 'selected' : ''}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onResultClick(value);
            }}
            style={{
              color: visitedSuggestions.includes(value) ? 'purple' : 'blue',
            }}
          >
            {value}
          </a>
          {visitedSuggestions.includes(value) && (
            <Button onClick={() => handleRemoveSuggestion(value)}>
              Remove
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AutocompleteSuggestionsComponent;
