import React from 'react';
import AutocompleteSuggestionsComponent from './AutocompleteSuggestionsComponent';
import './autocomplete.scss';
import ResultsListComponent from '../resultsList/ResultsListComponent';
import useAutocompleteSearch from '../../hooks/useAutocompleteSearch';

const AutocompleteSearchComponent: React.FC = () => {
  const {
    inputRef,
    searchText,
    suggestions,
    visitedSuggestions,
    selectedSuggestion,
    showSuggestions,
    noResults,
    searchResults,
    timeTaken,
    handleInputChange,
    handleSuggestionsClick,
    handleKeyDown,
    setShowSuggestions,
    handleRemoveSuggestion,
  } = useAutocompleteSearch();

  return (
    <>
      <div className="autocomplete-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 300)}
          onFocus={() => setShowSuggestions(true)}
        />
        {showSuggestions && suggestions.length > 0 && (
          <AutocompleteSuggestionsComponent
            suggestions={suggestions}
            onResultClick={handleSuggestionsClick}
            selectedResult={selectedSuggestion}
            handleRemoveSuggestion={handleRemoveSuggestion}
            visitedSuggestions={visitedSuggestions}
          />
        )}
      </div>
      {noResults ? (
        <div>No results found</div>
      ) : (
        searchResults.length > 0 && (
          <ResultsListComponent items={searchResults} elapsed={timeTaken} />
        )
      )}
    </>
  );
};
export default AutocompleteSearchComponent;
