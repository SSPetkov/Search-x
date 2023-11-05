import { DataFetcher } from './DataFetcher';
import axios from 'axios';
import { ResultItem } from '../features/resultsList/ResultsListComponent';
class DataServerStorage implements DataFetcher {
  private readonly apiUrl: string; // Replace with the actual API URL

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  public async fetchSuggestions(): Promise<string[]> {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching data from the server:', error);
      throw error;
    }
  }

  public async search(): Promise<{ data: ResultItem[]; timeTaken: number }> {
    const startTime = performance.now();

    try {
      const response = await axios.get(this.apiUrl);
      const endTime = performance.now();
      const timeTaken = endTime - startTime;

      return { data: response.data, timeTaken };
    } catch (error) {
      console.error('Error fetching data from the server:', error);
      throw error;
    }
  }

  // private fetch()
}

export { DataServerStorage };
