import { fetch } from '@tauri-apps/api/http';
import { EngineHandler, Suggestion, SuggestionGetter } from 'types';

const SUGGESTIONS_URL =
  'https://www.startpage.com/suggestions?segment=startpage.udog&q=';

const SEARCH_URL = 'https://www.startpage.com/search?query=';

const startpage: EngineHandler = async (term) => {
  const results = await getSuggestions(term);

  const getSearchString = (q: string) => `${SEARCH_URL}${q}`;

  return { results, getSearchString };
};

export default startpage;

/**
 * Get suggestions for entered query
 */
const getSuggestions: SuggestionGetter = async (term: string) => {
  return fetch<{ suggestions: Record<'text', string>[] }>(`${SUGGESTIONS_URL}${term}`)
    .then((response) => response.data)
    .then((response) => response.suggestions as Record<'text', string>[])
    .then((res) => res.map(mapToSuggestion));
};

const mapToSuggestion = (suggestion: Record<'text', string>): Suggestion => ({
  title: suggestion.text
});
