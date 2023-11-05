import data from '../../../data/words.json';
import { DataFetcher } from '../DataFetcher';
import DataServiceProvider from '../DataServiceProvider';

const mockData = data;

const mockDataFetcher: DataFetcher = {
  search(): Promise<any> {
    return Promise.resolve({});
  },
  fetchSuggestions: async () => mockData,
};

describe('DataServiceProvider', () => {
  it('should return transactions using the provided DataFetcher', async () => {
    const dataServiceProvider = new DataServiceProvider(mockDataFetcher);
    const transactions = await dataServiceProvider.getSuggestions();
    expect(transactions.length).toBe(1030);
    expect(transactions).toEqual(mockData);
  });
});
