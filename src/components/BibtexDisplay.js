// src/components/BibtexDisplay.js
(function() {
  const { hitToBibJson, BibjsonToBibtexApp } = window;

  function BibtexDisplay({ hits }) {
    const [selected, setSelected] = React.useState(null);

    const LinkTo = ({ doc }) => {
      const url = doc.url || (doc.doi && `https://doi.org/${doc.doi}`);
      return url
        ? React.createElement('a', { href: url, target: '_blank', rel: 'noreferrer' }, 'Link')
        : null;
    };

    return React.createElement(
      'div',
      { className: 'results' },
      hits.map((hit, idx) =>
        React.createElement(
          'div',
          { key: idx, className: 'result-item' },
          React.createElement('h3', { className: 'result-title' }, hit.document.title),
          React.createElement(
            'p',
            { className: 'result-year' },
            hit.document.year,
            ' ',
            React.createElement(LinkTo, { doc: hit.document })
          ),
          React.createElement(
            'button',
            {
              className: 'generate-bibtex-btn',
              onClick: () => setSelected(hitToBibJson(hit))
            },
            'BibTeX'
          )
        )
      ),
      selected &&
        React.createElement(
          'div',
          { className: 'selected-entry' },
          React.createElement('h2', null, 'Selected Entry'),
          React.createElement(BibjsonToBibtexApp, { bibJson: selected })
        )
    );
  }

  window.BibtexDisplay = BibtexDisplay;
})();
