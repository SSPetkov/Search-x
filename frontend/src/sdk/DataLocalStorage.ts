import {DataFetcher} from './DataFetcher';
import words from '../../data/words.json';
import data from '../../data/data.json';
import {ResultItem} from '../features/resultsList/ResultsListComponent';

class DataLocalStorage implements DataFetcher {
    public async fetchSuggestions(): Promise<string[]> {
        return new Promise((resolve) => {
            resolve(words);
        });
    }

    public async search(): Promise<{ data: ResultItem[]; timeTaken: number }> {
        const startTime = performance.now();
        return new Promise((resolve) => {
            setTimeout(() => {
                const endTime = performance.now();
                const timeTaken = endTime - startTime;
                resolve({data: data, timeTaken});
            }, 158);
        });
    }
}

export {DataLocalStorage};
