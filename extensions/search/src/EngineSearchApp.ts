import { App, ExtensionModule, InfoItem, ScriptItem } from '@rokii/api';
import {
  google,
  duckduckgo,
  ecosia,
  brave,
  startpage
} from './handlers';
import { Engine, EngineHandler } from './types';
import icons from './icons';

const handlers: Record<Engine, EngineHandler> = {
  Google: google,
  DuckDuckGo: duckduckgo,
  Ecosia: ecosia,
  Brave: brave,
  StartPage: startpage
};

const EngineSearchRun: ExtensionModule['run'] = async (ctx) => {
  const { term, display, hide, actions, settings } = ctx;

  const engine = settings['Search Engine'] as Engine;
  const icon = icons[engine] || icons.Google;
  const handler = handlers[engine] || google;
  const { getSearchString, results } = await handler(term);

  const noResultsItem = new InfoItem({
    id: 'no-results',
    title: `No results found for "${term}" on ${engine}`,
    icon
  });

  if (!results.length) return display([noResultsItem]);
  hide('no-results');

  const items = results.map(result => {
    return new ScriptItem({
      icon,
      title: result.title,
      subtitle: result.description,
      run: () => actions.open(getSearchString(result.title))
    });
  });

  display(items);
};

export const EngineSearchApp: App = {
  id: 'EngineSearch',
  run: EngineSearchRun
};
