import React, { useEffect, useRef, useState } from 'react';
import DataServiceProvider from '../sdk/DataServiceProvider';
import { DataServerStorage } from '../sdk/DataServerStorage';
import { ResultItem } from '../features/resultsList/ResultsListComponent';

export interface SearchResponse {
  data: ResultItem[];
  timeTaken: number;
}

const AUTOCOMPLETE_URL = 'http://localhost:5000/api/autocomplete?q=';
const SEARCH_URL = 'http://localhost:5000/api/search?q=';

interface AutocompleteState {
  searchText: string;
  suggestions: string[];
  selectedSuggestion: number | null;
  suggestionClicked: boolean;
  showSuggestions: boolean;
  searchResults: ResultItem[];
  noResults: boolean;
  timeTaken: number;
  visitedSuggestions: string[];
}

const initialState: AutocompleteState = {
  searchText: '',
  suggestions: [],
  selectedSuggestion: null,
  suggestionClicked: false,
  showSuggestions: false,
  searchResults: [],
  noResults: false,
  timeTaken: 0,
  visitedSuggestions: [],
};

const useAutocomplete = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState<AutocompleteState>(initialState);

  useEffect(() => {
    const fetchData = async () => {
      //API call
      const dataFetcher = new DataServerStorage(
        `${AUTOCOMPLETE_URL}${state.searchText}`,
      );
      const dataService = new DataServiceProvider(dataFetcher);

      const response = await dataService.getSuggestions();
      setState((prevState) => ({
        ...prevState,
        suggestions: response,
        showSuggestions: true,
      }));
    };

    if (state.searchText !== '' && !state.suggestionClicked) {
      fetchData();
    } else {
      setState((prevState) => ({
        ...prevState,
        suggestions: [],
        showSuggestions: false,
      }));
    }
    setState((prevState) => ({ ...prevState, suggestionClicked: false }));
  }, [state.searchText]);

  const performSearch = async (searchText: string): Promise<void> => {
    const dataFetcher = new DataServerStorage(`${SEARCH_URL}${searchText}`);
    const dataService = new DataServiceProvider(dataFetcher);
    const response = await dataService.search();
    setState((prevState) => ({
      ...prevState,
      noResults: response.data.length === 0,
      searchResults: response.data,
      timeTaken: response.timeTaken,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = e.target.value;
    setState((prevState) => ({
      ...prevState,
      searchText: newSearchText,
      selectedSuggestion: null,
    }));
  };

  const handleSuggestionsClick = (result: string) => {
    setState((prevState) => ({
      ...prevState,
      visitedSuggestions: [...prevState.visitedSuggestions, result],
      searchText: result,
      showSuggestions: false,
      suggestionClicked: true,
    }));
    performSearch(result);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && state.selectedSuggestion !== null) {
      handleSuggestionsClick(state.suggestions[state.selectedSuggestion]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setState((prevState) => ({
        ...prevState,
        selectedSuggestion:
          state.selectedSuggestion === null ||
          state.selectedSuggestion === state.suggestions.length - 1
            ? 0
            : state.selectedSuggestion + 1,
      }));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setState((prevState) => ({
        ...prevState,
        selectedSuggestion:
          state.selectedSuggestion === null || state.selectedSuggestion === 0
            ? state.suggestions.length - 1
            : state.selectedSuggestion - 1,
      }));
    }
  };

  const handleRemoveSuggestion = (suggestion: string) => {
    setState((prevState) => ({
      ...prevState,
      visitedSuggestions: prevState.visitedSuggestions.filter(
        (s) => s !== suggestion,
      ),
    }));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return {
    inputRef,
    searchText: state.searchText,
    suggestions: state.suggestions,
    visitedSuggestions: state.visitedSuggestions,
    selectedSuggestion: state.selectedSuggestion,
    showSuggestions: state.showSuggestions,
    noResults: state.noResults,
    searchResults: state.searchResults,
    timeTaken: state.timeTaken,
    handleInputChange,
    handleSuggestionsClick,
    handleKeyDown,
    setShowSuggestions: (value: boolean) =>
      setState((prevState) => ({ ...prevState, showSuggestions: value })),
    handleRemoveSuggestion,
  };
};

export default useAutocomplete;
