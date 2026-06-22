// Gantt schedule data: [activity, [6 booleans across 3 phases x 2 sub-columns]]
const ganttData = [
  ["Solar Power Plant", [1,1,1,1,1,1]],
  ["NTP", [1,0,0,0,0,0]],
  ["Site Mobilisation", [1,1,1,1,0,0]],
  ["Prep. of Final Drawings & BOM", [1,1,0,0,0,0]],
  ["Receipt of Material", [0,1,0,0,0,0]],
  ["Installation of PV Modules", [0,1,1,0,0,0]],
  ["Module Interconnections", [0,1,1,1,0,0]],
  ["Earthing & Connections", [0,0,1,1,0,0]],
  ["Solar Cable Laying & Termination", [0,0,0,1,0,0]],
  ["Installation of Inverters", [0,0,0,1,0,0]],
  ["DC Cable Laying", [0,0,0,1,0,0]],
  ["AC Cable Laying & Terminations", [0,0,0,1,0,0]],
  ["Communication Cable & Data", [0,0,0,0,1,0]],
  ["Quality Checking", [0,0,0,0,1,0]],
  ["Pre-Commissioning Tests", [0,0,0,0,1,0]],
  ["Inspection from Govt Bodies", [0,0,0,0,0,1]],
  ["Final Commissioning", [0,0,0,0,0,1]],
  ["Observation for Performance", [0,0,0,0,0,1]],
  ["Completion & Handover", [0,0,0,0,0,1]],
];
const gbody = document.getElementById('gantt-body');
ganttData.forEach(([name, cells]) => {
  const tr = document.createElement('tr');
  let html = `<td class="act">${name}</td>`;
  cells.forEach((on, i) => {
    const phaseEdge = (i % 2 === 0) ? ' phase-divider' : '';
    html += `<td class="cell${phaseEdge}"><div class="gbar ${on ? 'on' : ''}"></div></td>`;
  });
  tr.innerHTML = html;
  gbody.appendChild(tr);
});

// Commercial table data
const commercialData = [
  ["Solar Module","620 Wp Future","20,161","₹14.25","₹8,835.00","₹17,81,25,000.00"],
  ["Inverter","320 KVA Sungrow","34","₹1.21","₹4,45,000.00","₹1,51,30,000.00"],
  ["Structure","HDGI Column & Galvanum Rafter","200","₹1.68","₹1,05,000.00","₹2,10,00,000.00"],
  ["Cable AC","300SQMM Armoured, 11KV HT","6,800","₹0.82","₹1,500.00","₹1,02,00,000.00"],
  ["Cable DC","4 Sq.mm copper, EN type","52,075","₹0.23","₹56.00","₹29,16,200.00"],
  ["BOS","HDPE pipe, connectors, LA, earthing","1 Lot","₹0.40","₹50,00,000.00","₹50,00,000.00"],
  ["ACDB (LT Panel)","7 IN 2 OUT, L&T","1","₹0.32","₹40,00,000.00","₹40,00,000.00"],
  ["Transformer","33/0.8KV, 10000 KVA","1","₹1.04","₹1,30,00,000.00","₹1,30,00,000.00"],
  ["HT Panel","33KV, ABB Panel","1","₹0.16","₹20,00,000.00","₹20,00,000.00"],
  ["GSS Meter","3× ABT Meter 150 + metering eqpt.","1","₹0.11","₹13,50,000.00","₹13,50,000.00"],
  ["Transmission Line","33 KV","3","₹0.36","₹15,00,000.00","₹45,00,000.00"],
  ["GSS Injection Bay","33 KV","1","₹0.08","₹10,00,000.00","₹10,00,000.00"],
  ["I&C incl. Civil","12,500 KW installation & commissioning","1","₹1.02","₹1,28,00,000.00","₹1,28,00,000.00"],
  ["EPCM","12,500 KW","1","₹0.72","₹90,00,000.00","₹90,00,000.00"],
  ["Fencing","Chain fencing, 10ft/mtr","3,000","₹0.24","₹1,000.00","₹30,00,000.00"],
  ["Control Room","SCADA, CCTV, lighting","1","₹0.26","₹33,00,000.00","₹33,00,000.00"],
];
const cbody = document.getElementById('commercial-body');
commercialData.forEach(row => {
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${row[0]}</td><td>${row[1]}</td><td class="num">${row[2]}</td><td class="num">${row[3]}</td><td class="num">${row[4]}</td><td class="num">${row[5]}</td>`;
  cbody.appendChild(tr);
});
cbody.innerHTML += `
  <tr class="sum"><td colspan="5">Total</td><td class="num">₹28,63,21,200.00</td></tr>
  <tr class="sum"><td colspan="5">GST @ 8.9%</td><td class="num">₹2,54,82,586.80</td></tr>
  <tr class="grand"><td colspan="5">Grand Total</td><td class="num">₹31,18,03,786.80</td></tr>
`;

// Scroll reveal
const revealEls = document.querySelectorAll('section');
revealEls.forEach(el => el.classList.add('reveal'));
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
}, { threshold: 0.08 });
revealEls.forEach(el => obs.observe(el));

// ── PRINT FIX: force all sections visible before print dialog opens ──
function makeAllVisible() {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}
window.addEventListener('beforeprint', makeAllVisible);
window.matchMedia('print').addEventListener('change', mq => { if (mq.matches) makeAllVisible(); });
