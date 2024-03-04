import { AppItem, ExtensionModule, ScriptItem } from '@rokii/api';
import {
  google,
  duckduckgo,
  ecosia,
  brave,
  startpage
} from './handlers';
import { Engine, EngineHandler } from './types';
import icons from './icons';
import defaultIcon from './icons/default.png';
import settings from './settings';

const handlers: Record<Engine, EngineHandler> = {
  Google: google,
  DuckDuckGo: duckduckgo,
  Ecosia: ecosia,
  Brave: brave,
  StartPage: startpage
};

const run: ExtensionModule['run'] = async ({ term, actions, settings, display }) => {
  if (!navigator.onLine) return;

  // handle custom search engine
  if (settings['Search Link']) {
    const item = new ScriptItem({
      title: `Search ${term}`,
      icon: defaultIcon,
      run: () => actions.open(settings['Search Link'] + term)
    });
    return display([item]);
  }
  // handle built-in search engines
  const engine = settings['Search Engine'] as Engine;
  const engineIcon = icons[engine];

  const engineLauncherItem = new AppItem({
    appName: 'EngineSearch',
    title: `Search ${term} with ${engine}.`,
    icon: engineIcon
  });

  return display([engineLauncherItem]);
};

const EngineSearchApp: ExtensionModule['run'] = async ({ term, display, actions, settings }) => {
  const engine = settings['Search Engine'] as Engine;
  const icon = icons[engine] || defaultIcon;
  const handler = handlers[engine] || google;
  const { getSearchString, results } = await handler(term);

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

const SerachExtension: ExtensionModule = {
  name: 'Search',
  run,
  apps: {
    EngineSearch: EngineSearchApp
  },
  icon: defaultIcon,
  settings
};

export default SerachExtension;
