import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '../../../../shared/hooks/useDebounce';
import styles from './LocationSearch.module.scss';
import { type Location } from '../../types/location.types';
import { useLocationSearch } from '../../hooks/useLocationSearch';
import SearchSuggestions from '../SearchSuggestions';
import { useLocationStore } from '../../store/locationStore';

export const LocationSearch = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const { data: suggestions, isLoading, isError } = useLocationSearch(debouncedQuery);
  const { setLocation, searchHistory } = useLocationStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (loc: Location) => {
    setLocation(loc);
    setQuery('');
    setIsFocused(false);
  };

  const showSuggestions = isFocused && query.length > 2;
  const showHistory = isFocused && query.length <= 2 && searchHistory.length > 0;

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.inputWrapper}>
        <Search className={styles.icon} size={20} />
        <input
          type="text"
          className={styles.input}
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          aria-label="Search location"
          aria-expanded={showSuggestions}
        />
      </div>

      <SearchSuggestions
        isOpen={showSuggestions || showHistory}
        suggestions={showSuggestions ? suggestions || [] : searchHistory}
        isLoading={showSuggestions ? isLoading : false}
        isError={showSuggestions ? isError : false}
        onSelect={handleSelect}
        isHistory={showHistory}
      />
    </div>
  );
};
