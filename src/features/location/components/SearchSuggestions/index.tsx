import { type Location } from '../../types/location.types';
import Skeleton from '../../../../shared/components/Skeleton';
import { getErrorMessage } from '../../../../shared/utils/errorMessage';
import styles from './SearchSuggestions.module.scss';

interface SearchSuggestionsProps {
  readonly suggestions: Location[];
  readonly isLoading: boolean;
  readonly error: Error | null;
  readonly onSelect: (location: Location) => void;
  readonly isOpen: boolean;
  readonly isHistory?: boolean;
}

const SuggestionItem = ({ loc, onSelect }: { loc: Location; onSelect: (l: Location) => void }) => (
  <li
    id={`location-option-${loc.id}`}
    role="option"
    aria-selected={false}
    className={styles.item}
    onClick={() => onSelect(loc)}
    data-testid={`suggestion-${loc.id}`}
  >
    <span className={styles.name}>{loc.name}</span>
    <span className={styles.details}>{[loc.admin1, loc.country].filter(Boolean).join(', ')}</span>
  </li>
);

const SearchSuggestions = ({
  suggestions,
  isLoading,
  error,
  onSelect,
  isOpen,
  isHistory = false,
}: SearchSuggestionsProps) => {
  if (!isOpen) return null;

  return (
    <ul id="location-listbox" className={styles.container} role="listbox" aria-label="Location suggestions">
      {isLoading &&
        Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className={styles.item}>
            <div className={styles.skeletonItem}>
              <Skeleton className={styles.skeletonName} />
              <Skeleton className={styles.skeletonDetails} />
            </div>
          </li>
        ))}

      {error && <li className={`${styles.item} ${styles.message} ${styles.error}`}>{getErrorMessage(error)}</li>}

      {!isLoading && !error && suggestions.length === 0 && !isHistory && (
        <li className={`${styles.item} ${styles.message}`}>No locations found</li>
      )}

      {!isLoading && !error && suggestions.map((loc) => <SuggestionItem key={loc.id} loc={loc} onSelect={onSelect} />)}
    </ul>
  );
};

export default SearchSuggestions;
