import { fetch } from '@tauri-apps/plugin-http';
import { EngineHandler, Suggestion, SuggestionGetter } from 'types';

const SUGGESTIONS_URL = 'https://ac.ecosia.org/autocomplete?q=';

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
  return fetch(`${SUGGESTIONS_URL}${term}`)
    .then((response) => response.json())
    .then((response) => (response.suggestions || []))
    .then((res) => res.map(mapToSuggestion));
};

const mapToSuggestion = (suggestion: string): Suggestion => ({
  title: suggestion
});
