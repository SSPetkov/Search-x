import { DataLocalStorage } from '../DataLocalStorage';
import data from '../../../data/words.json';
describe('DataLocalStorage', () => {
  it('should fetch transactions from local storage', async () => {
    const dataLocalStorage = new DataLocalStorage();
    const transactions = await dataLocalStorage.fetchSuggestions();
    // Write your assertions here to check if the transactions are as expected
    expect(transactions.length).toBe(data.length);
  });
});
