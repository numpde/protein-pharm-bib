// src/App.js
(function() {
  // bring your components into scope so JSX can reference them
  const { SearchInput, BibtexDisplay } = window;

  const App = () => {
    const [query, setQuery] = React.useState('');
    const [hits, setHits] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const debounceRef = React.useRef(null);
    const lastQueryRef = React.useRef('');

    React.useEffect(() => {
      if (!query.trim()) {
        setHits([]);
        return;
      }
      lastQueryRef.current = query;
      clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        setLoading(true);
        try {
          const data = await window.fetchBibliography(query);
          if (lastQueryRef.current === query) {
            setHits(data.hits);
          }
        } catch (err) {
          console.error('Search error:', err);
        } finally {
          setLoading(false);
        }
      }, 500);

      return () => clearTimeout(debounceRef.current);
    }, [query]);

    return (
      <div>
        <h1>Bibliography Search</h1>
        <SearchInput value={query} onChange={setQuery} />
        <div id="display">
          {loading ? (
            <p>Loading...</p>
          ) : hits.length > 0 ? (
            <BibtexDisplay hits={hits} />
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    );
  };

  window.App = App;
})();
