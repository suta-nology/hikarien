/* ─────────────────────────────────────────
   AZUMIEN — filter.js  (facility.html only)
───────────────────────────────────────── */

const regionSel  = document.getElementById('regionSelect');
const serviceSel = document.getElementById('serviceSelect');
const cards      = document.querySelectorAll('.facility-card');
const emptyState = document.getElementById('facilityEmpty');

function filterFacilities() {
  const region  = regionSel  ? regionSel.value  : 'all';
  const service = serviceSel ? serviceSel.value : 'all';
  let   visible = 0;

  cards.forEach(card => {
    const matchRegion  = region  === 'all' || card.dataset.region  === region;
    const matchService = service === 'all' || card.dataset.service === service;
    const show = matchRegion && matchService;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  if (emptyState) emptyState.style.display = visible === 0 ? 'block' : 'none';
}

if (regionSel)  regionSel.addEventListener('change',  filterFacilities);
if (serviceSel) serviceSel.addEventListener('change', filterFacilities);
