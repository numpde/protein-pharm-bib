// src/utils/bibUtils.js
(function() {
  function escapeSpecialChars(str) {
    return String(str).replace(/[\{\}\\]/g, '\\$&');
  }

  function formatField(key, value) {
    return `  ${key} = {${escapeSpecialChars(value)}}`;
  }

  function bibjsonToBibtex(bibjson) {
    const { ENTRYTYPE, ID, ...fields } = bibjson;
    let bib = `@${ENTRYTYPE}{${ID},\n`;
    for (const [k, v] of Object.entries(fields)) {
      if (v) bib += formatField(k, v) + ',\n';
    }
    bib = bib.replace(/,\n$/, '\n') + '}';
    return bib;
  }

  function hitToBibJson(hit) {
    const doc = hit.document;
    const ENTRYTYPE = doc.type || 'article';
    const ID = doc.cite_key || doc.id || `${(doc.author||'').split(' ').pop()}-${doc.year||'noyear'}`;
    const bib = { ENTRYTYPE, ID };

    Object.entries(doc).forEach(([key, val]) => {
      if (['type','extra_fields','cite_key','id'].includes(key.toLowerCase())) return;
      let value = val;
      if (key === 'pages' && typeof val === 'string') {
        value = val.split('-').map(x => x.trim()).filter(Boolean).join('--');
      }
      if (key === 'author') {
        value = val.split(';').map(a => a.trim()).join(' and ');
      }
      bib[key] = String(value);
    });

    if (doc.extra_fields && typeof doc.extra_fields === 'object') {
      Object.entries(doc.extra_fields).forEach(([k, v]) => {
        if (!(k in bib)) bib[k] = v;
      });
    }

    return bib;
  }

  window.bibjsonToBibtex = bibjsonToBibtex;
  window.hitToBibJson = hitToBibJson;
})();
