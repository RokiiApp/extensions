import { fetch } from '@tauri-apps/api/http';
import { EngineHandler, Suggestion, SuggestionGetter } from 'types';

const SUGGESTIONS_URL =
  'https://suggestqueries.google.com/complete/search?client=firefox&q=';

const SEARCH_URL = 'https://www.google.com/search?q=';

const google: EngineHandler = async (term: string) => {
  const results = await getSuggestions(term);

  const getSearchString = (q: string) => `${SEARCH_URL}${q}`;

  return { results, getSearchString };
};

export default google;

/**
 * Get suggestions for entered query
 */
const getSuggestions: SuggestionGetter = async (term: string) => {
  return fetch<Array<string[]>>(`${SUGGESTIONS_URL}${term}`)
    .then((response) => response.data)
    .then((response) => (response[1] || []))
    .then((res) => res.map(mapToSuggestion));
};

const mapToSuggestion = (suggestion: string): Suggestion => ({
  title: suggestion
});
