import { PluginContext } from '@rokii/types';

export type EngineHandler = (args: PluginContext & { order: number }) => void;

export type Suggestion = {
  title: string;
  description?: string;
};

export type SuggestionGetter = (apiResult: any) => Promise<Suggestion[]>;

export type Engine =
  | 'Google'
  | 'DuckDuckGo'
  | 'Ecosia'
  | 'Brave'
  | 'MetaGer'
  | 'StartPage';
