import { ResultItem } from '../features/resultsList/ResultsListComponent';

interface DataFetcher {
  fetchSuggestions(): Promise<string[]>;
  search(): Promise<{ data: ResultItem[]; timeTaken: number }>;
}

export type { DataFetcher };
