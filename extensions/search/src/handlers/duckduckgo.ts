import { fetch } from '@tauri-apps/api/http';
import { EngineHandler, Suggestion, SuggestionGetter } from 'types';

const SUGGESTIONS_URL = 'https://duckduckgo.com/ac/?q=';

const SEARCH_URL = 'https://duckduckgo.com/?q=';

const duckduckgo: EngineHandler = async (term) => {
  const results = await getSuggestions(term);

  const getSearchString = (q: string) => `${SEARCH_URL}${q}`;

  return { results, getSearchString };
};

export default duckduckgo;

/**
 * Get suggestions for entered query
 */
const getSuggestions: SuggestionGetter = async (term: string) => {
  return fetch<{ phrase: string }[]>(`${SUGGESTIONS_URL}${term}`)
    .then((response) => response.data)
    .then((response) => (response || []))
    .then((res) => res.map(mapToSuggestion));
};

const mapToSuggestion = ({ phrase }: { phrase: string }): Suggestion => ({
  title: phrase
});
