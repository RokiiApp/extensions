import { fetch } from '@tauri-apps/api/http';
import { EngineHandler, Suggestion, SuggestionGetter } from 'types';

const SUGGESTIONS_URL = 'https://search.brave.com/api/suggest?q=';

const SEARCH_URL = 'https://search.brave.com/search?q=';

const brave: EngineHandler = async (term) => {
  const results = await getSuggestions(term);

  const getSearchString = (q: string) => `${SEARCH_URL}${q}`;

  return { results, getSearchString };
};

export default brave;

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
