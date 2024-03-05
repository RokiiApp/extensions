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
  | 'StartPage';

export type EngineHandler = (term: string) => Promise<{
    results: Suggestion[];
    getSearchString: (q: string) => string;
  }>;
