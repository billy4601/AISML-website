// Certificate directory filters: keyword (number, organization, scope, site), standard, status, accreditation body.
// Filters are mirrored in the URL (?q=&standard=&status=&ab=) so a result can be shared as a link.
const root = document.querySelector('[data-cert-search]');
if (root) {
  const query = root.querySelector('input[name="q"]');
  const standard = root.querySelector('select[name="standard"]');
  const status = root.querySelector('select[name="status"]');
  const body = root.querySelector('select[name="ab"]');
  const rows = [...root.querySelectorAll('tbody tr:not([data-empty])')];
  const empty = root.querySelector('[data-empty]');
  const emptyCell = empty.querySelector('td');
  const output = root.querySelector('[data-count-output]');

  const params = new URLSearchParams(location.search);
  query.value = params.get('q') || '';
  for (const select of [standard, status, body]) {
    const value = params.get(select.name);
    if (value && [...select.options].some(option => option.value === value)) select.value = value;
  }

  const apply = () => {
    const terms = query.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const row of rows) {
      const match = terms.every(term => row.dataset.search.includes(term))
        && (!standard.value || row.dataset.standard === standard.value)
        && (!status.value || row.dataset.status === status.value)
        && (!body.value || row.dataset.ab === body.value);
      row.hidden = !match;
      if (match) shown += 1;
    }
    empty.hidden = shown > 0;
    emptyCell.textContent = rows.length ? emptyCell.dataset.nomatchText : emptyCell.dataset.emptyText;
    output.textContent = root.dataset.count.replace('{shown}', shown).replace('{total}', rows.length);

    const next = new URLSearchParams();
    if (query.value.trim()) next.set('q', query.value.trim());
    if (standard.value) next.set('standard', standard.value);
    if (status.value) next.set('status', status.value);
    if (body.value) next.set('ab', body.value);
    const search = next.toString();
    history.replaceState(null, '', search ? `?${search}` : location.pathname);
  };

  query.addEventListener('input', apply);
  standard.addEventListener('change', apply);
  status.addEventListener('change', apply);
  body.addEventListener('change', apply);
  root.querySelector('[data-reset]').addEventListener('click', () => {
    query.value = '';
    standard.value = '';
    status.value = '';
    body.value = '';
    apply();
    query.focus();
  });
  apply();
}
