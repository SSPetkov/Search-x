import { DataFetcher } from './DataFetcher';
import { ResultItem } from '../features/resultsList/ResultsListComponent';

class DataServiceProvider {
  private dataFetcher: DataFetcher;

  constructor(dataFetcher: DataFetcher) {
    this.dataFetcher = dataFetcher;
  }

  public async getSuggestions(): Promise<string[]> {
    return this.dataFetcher.fetchSuggestions();
  }

  public async search(): Promise<{ data: ResultItem[]; timeTaken: number }> {
    return this.dataFetcher.search();
  }
}

export default DataServiceProvider;
