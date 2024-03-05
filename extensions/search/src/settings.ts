import { Setting, SelectSetting, StringSetting } from '@rokii/api';

import type { Engine } from 'types';

export const SearchEngines: Engine[] = [
  'Google',
  'Brave',
  'DuckDuckGo',
  'Ecosia',
  'StartPage'
];

/**
 * @returns A valid options array with each search engine name and label
 */
const generateOptions = (): Array<{ value: string; label: string }> => {
  const options = SearchEngines.map((engine) => ({
    value: engine,
    label: engine
  }));

  return options;
};

const settings: Record<string, Setting> = {
  'Search Engine': SelectSetting({
    id: 'Search Engine',
    label: 'Search Engine',
    options: generateOptions(),
    defaultValue: 'Google',
    description: 'Select a search engine'
  }),
  'Search Link': StringSetting({
    id: 'Search Link',
    label: 'Search Link',
    defaultValue: '',
    description:
      'The link your search engine uses to search. I.e.\nhttps://google.com/search?q='
  })
};

export default settings;
