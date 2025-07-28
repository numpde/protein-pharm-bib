// src/utils/api.js
(function() {
  async function fetchBibliography(q) {
    const params = new URLSearchParams({
      q,
      query_by: 'embedding',
      per_page: 9,
      prefix: false,
      exclude_fields: 'embedding'
    });

    const response = await fetch(
      `https://ts.counter-resistance.org/collections/bibliography/documents/search?${params}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-TYPESENSE-API-KEY': 'F7ghgqY7OGYUwt3A3FP0BJwFa7Pqyikg'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  window.fetchBibliography = fetchBibliography;
})();
