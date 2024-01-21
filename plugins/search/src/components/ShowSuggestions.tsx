import {
  Loading,
  KeyboardNav,
  KeyboardNavItem
} from '@rokii/ui';
import { Suggestion, SuggestionGetter } from 'types';
import styles from './suggestions.module.css';

type ShowSuggestionProps = {
  suggestionGetter: SuggestionGetter;
  term: string;
  searchFn: (term: string) => void;
};

const ShowSuggestions = ({ suggestionGetter, term, searchFn }: ShowSuggestionProps) => {
  const [suggestions, setResult] = React.useState<Suggestion[]>([]);

  React.useEffect(() => {
    suggestionGetter(term).then(setResult);
  }, []);

  if (!suggestions.length) return <Loading />;

  return (
    <div className={styles.wrapper}>
      <KeyboardNav>
        <ul className={styles.list}>
          {suggestions.map(({ title }) => {
            return (
              <KeyboardNavItem
                tagName={'li'}
                key={title}
                onSelect={() => searchFn(title)}
              >
                {title}
              </KeyboardNavItem>
            );
          })}
        </ul>
      </KeyboardNav>
    </div>
  );
};

export default ShowSuggestions;
