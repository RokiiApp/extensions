import { fetch } from '@tauri-apps/api/http';
import { EngineHandler, Suggestion, SuggestionGetter } from 'types';

const SUGGESTIONS_URL = 'http://ac.ecosia.org/autocomplete?q=';

const SEARCH_URL = 'https://www.ecosia.org/search?q=';

const ecosia: EngineHandler = async (term) => {
  const results = await getSuggestions(term);

  const getSearchString = (q: string) => `${SEARCH_URL}${q}`;

  return { results, getSearchString };
};

export default ecosia;

/**
 * Get suggestions for entered query
 */
const getSuggestions: SuggestionGetter = async (term: string) => {
  return fetch<{ suggestions: string[] }>(`${SUGGESTIONS_URL}${term}`)
    .then((response) => response.data)
    .then((response) => (response.suggestions || []))
    .then((res) => res.map(mapToSuggestion));
};

const mapToSuggestion = (suggestion: string): Suggestion => ({
  title: suggestion
});
