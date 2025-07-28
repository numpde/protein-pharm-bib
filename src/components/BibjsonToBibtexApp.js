// src/components/BibjsonToBibtexApp.js
(function() {
  const BibjsonToBibtexApp = ({ bibJson }) => {
    const bibtex = window.bibjsonToBibtex(bibJson);

    const handleCopy = () => {
      navigator.clipboard
        .writeText(bibtex)
        .catch(err => console.error('Copy failed:', err));
    };

    return (
      <div>
        <pre>{bibtex}</pre>
        <button className="copy-button" onClick={handleCopy}>
          Copy
        </button>
      </div>
    );
  };

  window.BibjsonToBibtexApp = BibjsonToBibtexApp;
})();
