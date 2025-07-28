// src/components/BibtexDisplay.js
(function() {
  const { hitToBibJson, bibjsonToBibtex, BibjsonToBibtexApp } = window;

  function BibtexDisplay({ hits }) {
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [selectedBibJson, setSelectedBibJson] = React.useState(null);

    const LinkTo = ({ doc }) => {
      const url = doc.url || (doc.doi && `https://doi.org/${doc.doi}`);
      return url
        ? <a href={url} target="_blank" rel="noreferrer">Link</a>
        : null;
    };

    return (
      <div className="results">
        {hits.map((hit, idx) => {
          const doc = hit.document;
          const id = doc.cite_key || doc.id;
          const bibJson = hitToBibJson(hit);
          const bibText = bibjsonToBibtex(bibJson);
          const isOpen = selectedIndex === idx;

          return (
            <div key={idx}>
              <div className="result-item">
                <h3 className="result-title">{doc.title}</h3>
                <p className="result-year">
                  {doc.year} | ID: {id} | <LinkTo doc={doc}/>
                </p>

                <button
                  className="generate-bibtex-btn"
                  onClick={() => {
                    if (isOpen) {
                      setSelectedIndex(null);
                      setSelectedBibJson(null);
                    } else {
                      setSelectedIndex(idx);
                      setSelectedBibJson(bibJson);
                    }
                  }}
                >
                  BibTeX
                </button>
                <button
                  className="copy-button"
                  style={{ marginLeft: '8px' }}
                  onClick={() => {
                    const textToCopy = isOpen ? bibText : id;
                    navigator.clipboard
                      .writeText(textToCopy)
                      .catch(err => console.error('Copy failed:', err));
                  }}
                >
                  Copy
                </button>
              </div>

              {isOpen && selectedBibJson && (
                <div className="selected-entry">
                  <BibjsonToBibtexApp bibJson={selectedBibJson} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  window.BibtexDisplay = BibtexDisplay;
})();
