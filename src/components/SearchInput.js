// src/components/SearchInput.js
(function() {
  const SearchInput = ({ value, onChange }) => (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );

  window.SearchInput = SearchInput;
})();
