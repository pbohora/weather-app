import { type Location } from '../../types/location.types';
import Skeleton from '../../../../shared/components/Skeleton';
import styles from './SearchSuggestions.module.scss';

interface SearchSuggestionsProps {
  readonly suggestions: Location[];
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly onSelect: (location: Location) => void;
  readonly isOpen: boolean;
  readonly isHistory?: boolean;
}

const SuggestionItem = ({ loc, onSelect }: { loc: Location; onSelect: (l: Location) => void }) => (
  <li className={styles.item}>
    <button
      type="button"
      className={styles.button}
      onClick={() => onSelect(loc)}
      data-testid={`suggestion-${loc.id}`}
    >
      <span className={styles.name}>{loc.name}</span>
      <span className={styles.details}>
        {[loc.admin1, loc.country].filter(Boolean).join(', ')}
      </span>
    </button>
  </li>
);

const SearchSuggestions = ({
  suggestions,
  isLoading,
  isError,
  onSelect,
  isOpen,
  isHistory = false,
}: SearchSuggestionsProps) => {
  if (!isOpen) return null;

  return (
    <ul className={styles.container} role="listbox">
      {isLoading &&
        Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className={styles.item}>
            <div className={styles.skeletonItem}>
              <Skeleton className={styles.skeletonName} />
              <Skeleton className={styles.skeletonDetails} />
            </div>
          </li>
        ))}

      {isError && (
        <li className={`${styles.item} ${styles.message} ${styles.error}`}>
          Failed to fetch locations
        </li>
      )}

      {!isLoading && !isError && suggestions.length === 0 && !isHistory && (
        <li className={`${styles.item} ${styles.message}`}>No locations found</li>
      )}

      {!isLoading && !isError && suggestions.map((loc) => (
        <SuggestionItem key={loc.id} loc={loc} onSelect={onSelect} />
      ))}
    </ul>
  );
};

export default SearchSuggestions;
