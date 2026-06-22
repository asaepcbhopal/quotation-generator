// Import the raw CSS string from the original style.css
// This is bundled into the exported HTML so it is fully self-contained.
import cssString from '../assets/style.css?raw';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (num) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(num);

const tick = (val) =>
  val
    ? `<span class="tick">✓</span>`
    : `<span class="dash">—</span>`;

// ─── Section builders ─────────────────────────────────────────────────────────

function buildSummaryRows(rows) {
  return rows
    .map((r) => `<div class="summary-row"><span class="k">${r.k}</span><span class="v">${r.v}</span></div>`)
    .join('\n');
}

function buildSpecsRows(specs) {
  return specs
    .map(
      (s, i) =>
        `<tr><td class="center">${i + 1}</td><td>${s.item}</td><td>${s.spec}</td></tr>`
    )
    .join('\n');
}

function buildVendorRows(vendors) {
  return vendors
    .map(
      (v, i) =>
        `<tr><td class="center">${i + 1}</td><td>${v.item}</td><td>${v.make}</td></tr>`
    )
    .join('\n');
}

function buildScopeBlocks(scopeBlocks) {
  const lastIndex = scopeBlocks.length - 1;
  return scopeBlocks
    .map((block, bi) => {
      const rows = block.rows
        .map(
          (r) =>
            `<tr><td>${r.activity}</td>` +
            `<td class="center">${r.c2 ? tick(true) : `<span class="dash">—</span>`}</td>` +
            `<td class="center">${r.c3 ? tick(true) : `<span class="dash">—</span>`}</td></tr>`
        )
        .join('\n');

      return `
    <div class="scope-block"${bi === lastIndex ? ' style="margin-bottom:0;"' : ''}>
      <span class="scope-title">${block.title}</span>
      <div class="scope-table-wrap">
        <table class="scope-table">
          <thead><tr><th>${block.col1Label}</th><th class="center">${block.col2Label}</th><th class="center">${block.col3Label}</th></tr></thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </div>`;
    })
    .join('\n');
}

function buildGanttRows(schedule) {
  return schedule
    .map((row) => {
      const cells = [
        row.p1[0], row.p1[1],
        row.p2[0], row.p2[1],
        row.p3[0], row.p3[1],
      ]
        .map((on, i) => {
          const phaseEdge = i % 2 === 0 ? ' phase-divider' : '';
          return `<td class="cell${phaseEdge}"><div class="gbar ${on ? 'on' : ''}"></div></td>`;
        })
        .join('');
      return `<tr><td class="act">${row.activity}</td>${cells}</tr>`;
    })
    .join('\n');
}

function buildCommercialRows(items) {
  return items
    .map((item) => {
      const amount = (item.qty || 0) * (item.price || 0);
      return `<tr>
        <td>${item.desc}</td>
        <td>${item.spec || ''}</td>
        <td class="num">${Number(item.qty).toLocaleString('en-IN')}</td>
        <td class="num">₹${Number(item.perWatt || 0).toFixed(2)}</td>
        <td class="num">${fmt(item.price)}</td>
        <td class="num">${fmt(amount)}</td>
      </tr>`;
    })
    .join('\n');
}

// ─── Main export function ─────────────────────────────────────────────────────

export function generateHtml(data, logoSrc = '') {
  // Commercial calculations
  const subtotal = data.commercialItems.reduce(
    (sum, item) => sum + (item.qty || 0) * (item.price || 0),
    0
  );
  const gst = subtotal * 0.089;
  const grandTotal = subtotal + gst;
  const perWattEff = grandTotal / 12500000; // effective per watt across full system

  const phaseLabels = data.phaseLabels || ['Phase 1 · 40 days', 'Phase 2 · 40 days', 'Phase 3 · 40 days'];

  // Nav brand — use logo if available, fallback to text
  const navBrand = logoSrc
    ? `<div class="nav-brand"><img src="${logoSrc}" alt="ASA EPC Pvt. Ltd." class="nav-logo"></div>`
    : `<div class="nav-brand"><span class="dot"></span> ASA EPC PVT. LTD.</div>`;

  // Footer logo
  const footerLogo = logoSrc
    ? `<img src="${logoSrc}" alt="ASA EPC Pvt. Ltd." class="footer-logo">`
    : `<h3>ASA EPC PVT. LTD.</h3>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.title} — ASA EPC</title>
<style>
${cssString}
</style>
</head>
<body>

<!-- ══ PRINT COVER PAGE (hidden on screen, first PDF page) ══ -->
<div class="cover-page">
  <div class="cv-top">
    ${logoSrc ? `<img src="${logoSrc}" alt="ASA EPC Pvt. Ltd." class="cv-logo">` : `<div class="cv-company-name">ASA EPC PVT. LTD.</div>`}
    <div class="cv-top-right">
      <div class="cv-company-name">ASA EPC Pvt. Ltd.</div>
      <div class="cv-credentials">DPIIT Recognised &nbsp;·&nbsp; Waaree Energy Franchise Partner &nbsp;·&nbsp; 9 Years of Solar Excellence</div>
    </div>
  </div>
  <div class="cv-main">
    <div class="cv-eyebrow">${data.eyebrow}</div>
    <h1 class="cv-title">${data.title}</h1>
    <div class="cv-divider"></div>
    <p class="cv-subtitle">${data.heroSub}</p>
  </div>
  <div class="cv-bottom">
    <div class="cv-meta-grid">
      <div>
        <div class="cv-meta-label">Prepared For</div>
        <div class="cv-meta-value">${data.clientName}</div>
      </div>
      <div>
        <div class="cv-meta-label">Site Location</div>
        <div class="cv-meta-value">${data.location}</div>
      </div>
      <div>
        <div class="cv-meta-label">Offer Date</div>
        <div class="cv-meta-value">${data.projectDate}</div>
      </div>
      <div>
        <div class="cv-meta-label">Project Scheme</div>
        <div class="cv-meta-value">PM-${data.scheme}</div>
      </div>
    </div>
    <div class="cv-stats-strip">
      <div>
        <span class="cv-stat-num">9 yrs</span>
        <span class="cv-stat-lbl">Industry experience</span>
      </div>
      <div>
        <span class="cv-stat-num">100+ MW</span>
        <span class="cv-stat-lbl">EPC projects commissioned</span>
      </div>
      <div>
        <span class="cv-stat-num">200+</span>
        <span class="cv-stat-lbl">Projects in pipeline</span>
      </div>
      <div>
        <span class="cv-stat-num">2</span>
        <span class="cv-stat-lbl">Country presence</span>
      </div>
    </div>
  </div>
</div>

<nav class="nav">
  <div class="nav-inner">
    ${navBrand}
    <div class="nav-links">
      <a href="#summary">Summary</a>
      <a href="#specification">Specification</a>
      <a href="#scope">Scope</a>
      <a href="#schedule">Schedule</a>
      <a href="#commercial">Commercial</a>
    </div>
    <a class="nav-cta" href="#commercial">View Pricing</a>
  </div>
</nav>

<!-- ═══════════════════ HERO (DYNAMIC) ═══════════════════ -->
<header class="hero">
  <div class="hero-inner">
    <span class="eyebrow">${data.eyebrow}</span>
    <h1>${data.title}</h1>
    <p class="hero-sub">${data.heroSub}</p>

    <div class="hero-meta">
      <div><div class="hm-label">Prepared For</div><div class="hm-value">${data.clientName}</div></div>
      <div><div class="hm-label">Site</div><div class="hm-value">${data.location}</div></div>
      <div><div class="hm-label">Offer Date</div><div class="hm-value">${data.projectDate}</div></div>
      <div><div class="hm-label">Scheme</div><div class="hm-value">${data.scheme}</div></div>
    </div>

    <div class="hero-stats">
      <div class="hstat"><div class="num">9 yrs</div><div class="lbl">Industry experience</div></div>
      <div class="hstat"><div class="num">100+ MW</div><div class="lbl">EPC projects commissioned</div></div>
      <div class="hstat"><div class="num">200+</div><div class="lbl">Projects in pipeline</div></div>
      <div class="hstat"><div class="num">2</div><div class="lbl">Country presence</div></div>
    </div>
  </div>
</header>

<!-- ═══════════════════ ABOUT ASA EPC (FIXED — DO NOT CHANGE) ═══════════════════ -->
<section id="about">
  <div class="wrap">
    <div class="info-grid">
      <div>
        <span class="sec-num">ABOUT ASA EPC</span>
        <h2 style="font-size:26px; margin-bottom:14px; color:var(--forest);">Concept to commissioning, under one roof.</h2>
        <p class="lede">ASA EPC PVT LTD is a <strong>DPIIT-recognised</strong> renewable energy company delivering residential, commercial, and industrial solar systems, IPP, asset management, and power transmission. As a <strong>franchise partner of Waaree Energy</strong> — India's largest vertically integrated energy company — every project draws on a supply chain built for scale and reliability.</p>
      </div>
      <div class="pillar-list">
        <div class="pillar"><div class="ic">E</div><div><strong>Engineering</strong><br><span style="color:var(--muted)">Site assessment, system design, layout planning</span></div></div>
        <div class="pillar"><div class="ic">P</div><div><strong>Procurement</strong><br><span style="color:var(--muted)">Tier-1 components sourced at scale</span></div></div>
        <div class="pillar"><div class="ic">C</div><div><strong>Construction</strong><br><span style="color:var(--muted)">Installation, testing, and commissioning</span></div></div>
        <div class="pillar"><div class="ic">A</div><div><strong>Asset Mgmt</strong><br><span style="color:var(--muted)">Automation, repair, spare-part replacement</span></div></div>
      </div>
    </div>

    <!-- Waaree Partnership -->
    <div class="waaree-callout">
      <span class="waaree-callout-icon">⚡</span>
      <div>
        <div class="waaree-callout-title">Partner with India's No.1 Solar Panel Manufacturer — Waaree Energy Ltd.</div>
        <div class="waaree-callout-sub">India's Largest Vertically Integrated Energy Company with Global Operations · Franchise Partner for Bhopal &amp; Central India</div>
      </div>
    </div>

    <!-- Vision / Mission -->
    <div class="vm-grid">
      <div class="vm-card vision">
        <div class="vm-card-label">Our Vision</div>
        <div class="vm-card-head">Vision</div>
        <p class="vm-card-text">"Delivering Exceptional, Economical, and Eco-Friendly Energy Solutions. We provide top-tier, cost-efficient sustainable energy solutions, fostering a greener future for generations."</p>
      </div>
      <div class="vm-card mission">
        <div class="vm-card-label">Our Mission</div>
        <div class="vm-card-head">Mission</div>
        <p class="vm-card-text">"Revolutionizing global energy with cutting-edge, high-quality, and affordable solar solutions for a sustainable future, empowering energy independence worldwide instantly."</p>
      </div>
    </div>

    <!-- Core Values -->
    <div class="core-values-wrap">
      <div class="cv-strip-label">Core Values</div>
      <div class="cv-strip">
        <div class="cv-value">
          <div class="cv-value-name">Integrity</div>
        </div>
        <div class="cv-value">
          <div class="cv-value-name">Respect for Individuals</div>
        </div>
        <div class="cv-value">
          <div class="cv-value-name">Customer First</div>
        </div>
        <div class="cv-value">
          <div class="cv-value-name">Passion for Excellence</div>
        </div>
        <div class="cv-value">
          <div class="cv-value-name">Continuous Improvements &amp; Innovation</div>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- ═══════════════════ 01 — PROJECT SUMMARY (DYNAMIC) ═══════════════════ -->
<section id="summary" class="alt">
  <div class="wrap">
    <div class="section-head">
      <span class="sec-num">01 — PROJECT SUMMARY</span>
      <h2>The plant, at a glance.</h2>
      <p>Key technical parameters for the proposed on-grid, ground-mounted system.</p>
    </div>
    <div class="info-grid">
      <div class="summary-card">
        <div class="summary-card-head">Site &amp; System</div>
        ${buildSummaryRows(data.summary.siteSystem)}
      </div>
      <div class="summary-card">
        <div class="summary-card-head">Scheme &amp; Contact</div>
        ${buildSummaryRows(data.summary.schemeContact)}
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════ 02 — TECHNICAL SPECIFICATION (DYNAMIC) ═══════════════════ -->
<section id="specification">
  <div class="wrap">
    <div class="section-head">
      <span class="sec-num">02 — TECHNICAL SPECIFICATION</span>
      <h2>What's going into the ground.</h2>
      <p>Component-level specification for the project.</p>
    </div>
    <div class="styled-table-wrap">
      <table class="styled-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Item</th>
            <th>Specification</th>
          </tr>
        </thead>
        <tbody>
          ${buildSpecsRows(data.specs)}
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- ═══════════════════ 03 — EQUIPMENT & VENDORS (DYNAMIC) ═══════════════════ -->
<section class="alt">
  <div class="wrap">
    <div class="section-head">
      <span class="sec-num">03 — EQUIPMENT &amp; VENDORS</span>
      <h2>Built on names you already trust.</h2>
      <p>Major equipment categories and the proposed manufacturer for each.</p>
    </div>
    <div class="styled-table-wrap">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Item</th>
            <th>Offered Makes</th>
          </tr>
        </thead>
        <tbody>
          ${buildVendorRows(data.vendors)}
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- ═══════════════════ 04 — SCOPE OF WORK (DYNAMIC) ═══════════════════ -->
<section id="scope">
  <div class="wrap">
    <div class="section-head">
      <span class="sec-num">04 — SCOPE OF WORK</span>
      <h2>Who does what, on paper.</h2>
      <p>Responsibility split across clearances, site preparation, and DC/AC side delivery.</p>
    </div>
    ${buildScopeBlocks(data.scopeBlocks)}
  </div>
</section>

<!-- ═══════════════════ 05 — PROJECT SCHEDULE (DYNAMIC) ═══════════════════ -->
<section id="schedule" class="alt">
  <div class="wrap">
    <div class="section-head">
      <span class="sec-num">05 — PROJECT SCHEDULE</span>
      <h2>${data.scheduleTitle}</h2>
      <p>${data.scheduleSubtitle}</p>
    </div>
    <div class="gantt-wrap">
      <table class="gantt">
        <thead>
          <tr>
            <th class="act-h">Activity</th>
            <th colspan="2">${phaseLabels[0]}</th>
            <th colspan="2">${phaseLabels[1]}</th>
            <th colspan="2">${phaseLabels[2]}</th>
          </tr>
        </thead>
        <tbody>
          ${buildGanttRows(data.schedule)}
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- ═══════════════════ 06 — WARRANTY (FIXED) ═══════════════════ -->
<section>
  <div class="wrap">
    <div class="section-head">
      <span class="sec-num">06 — WARRANTY</span>
      <h2>Backed long after handover.</h2>
      <p>Manufacturing defect and performance warranty by component.</p>
    </div>
    <div class="warranty-grid">
      <div class="warranty-card">
        <div class="wc-top"><h4>Solar Modules</h4><span class="wc-years">30 yrs</span></div>
        <p>Product warranty against manufacturing defect and poor workmanship. Performance warranty: 90% rated output at year 10, 80% at year 30.</p>
      </div>
      <div class="warranty-card">
        <div class="wc-top"><h4>Inverter</h4><span class="wc-years">5 + 25 yrs</span></div>
        <p>Standard 5-year manufacturer warranty, extendable up to 25 years.</p>
      </div>
      <div class="warranty-card">
        <div class="wc-top"><h4>Mounting Structure</h4><span class="wc-years">25 yrs</span></div>
        <p>Structural warranty covering the full module mounting system.</p>
      </div>
      <div class="warranty-card">
        <div class="wc-top"><h4>Other BOS</h4><span class="wc-years">As per OEM</span></div>
        <p>Balance-of-system components covered as per original equipment manufacturer terms.</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════ 07 — COMMERCIAL OFFER (DYNAMIC) ═══════════════════ -->
<section id="commercial" class="alt">
  <div class="wrap">
    <div class="section-head">
      <span class="sec-num">07 — COMMERCIAL OFFER</span>
      <h2>The investment, itemised.</h2>
      <p>Full bill of quantities for the turnkey system.</p>
    </div>
    <div class="commercial-table-wrap">
      <table class="commercial-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Specification</th>
            <th class="num">Qty</th>
            <th class="num">Per Watt</th>
            <th class="num">Unit Price</th>
            <th class="num">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${buildCommercialRows(data.commercialItems)}
          <tr class="sum"><td colspan="5">Total</td><td class="num">${fmt(subtotal)}</td></tr>
          <tr class="sum"><td colspan="5">GST @ 8.9%</td><td class="num">${fmt(gst)}</td></tr>
          <tr class="grand"><td colspan="5">Grand Total</td><td class="num">${fmt(grandTotal)}</td></tr>
        </tbody>
      </table>
    </div>

    <div class="total-banner">
      <div>
        <div class="tb-label">Grand Total (incl. 8.9% GST)</div>
        <div class="tb-value">${fmt(grandTotal)}</div>
        <div class="tb-sub">Effective ₹${perWattEff.toFixed(2)} per watt across the full system</div>
      </div>
      <div style="text-align:right;">
        <div class="tb-label">Base value</div>
        <div style="font-family:'Space Grotesk'; font-size:18px; font-weight:700;">${fmt(subtotal)}</div>
        <div class="tb-sub">GST @ 8.9% — ${fmt(gst)}</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════ 08 — EXECUTION METHODOLOGY (FIXED) ═══════════════════ -->
<section id="execution">
  <div class="wrap">
    <div class="section-head">
      <span class="sec-num">08 — EXECUTION METHODOLOGY</span>
      <h2>From survey to switch-on.</h2>
      <p>A sixteen-step delivery process, refined across 150+ commissioned projects.</p>
    </div>
    <div class="exec-track">
      <div class="exec-step"><div class="exec-num">1</div><div><h4>Site survey &amp; leveling</h4><p>Topographic survey, grading, and ground preparation for foundation work.</p></div></div>
      <div class="exec-step"><div class="exec-num">2</div><div><h4>Foundation &amp; MMS erection</h4><p>Auguring, column post installation, and mounting structure erection.</p></div></div>
      <div class="exec-step"><div class="exec-num">3</div><div><h4>Module alignment &amp; cabling</h4><p>Structure and PV module alignment, DC/AC cable laying and termination.</p></div></div>
      <div class="exec-step"><div class="exec-num">4</div><div><h4>Transformer yard &amp; transmission</h4><p>Inverter transformer yard, control room construction, and 33KV transmission line erection.</p></div></div>
      <div class="exec-step"><div class="exec-num">5</div><div><h4>Testing &amp; commissioning</h4><p>Pre-commissioning tests, government inspection, and final grid commissioning.</p></div></div>
    </div>
  </div>
</section>

<!-- ═══════════════════ 09 — TRACK RECORD (FIXED) ═══════════════════ -->
<section class="alt">
  <div class="wrap">
    <div class="section-head">
      <span class="sec-num">09 — TRACK RECORD</span>
      <h2>Trusted by 200+ customers.</h2>
    </div>
    <div class="client-strip">
      <span class="client-chip">Bajaj</span>
      <span class="client-chip">L&amp;T Construction</span>
      <span class="client-chip">Shyam Steel</span>
      <span class="client-chip">Envisol</span>
      <span class="client-chip">Novus Green</span>
      <span class="client-chip">Shakti Pumping Life</span>
      <span class="client-chip">Waaree</span>
      <span class="client-chip">Bhawani</span>
      <span class="client-chip">Disha Interio</span>
      <span class="client-chip">KEC International</span>
      <span class="client-chip">CVRU</span>
      <span class="client-chip">Monte Carlo</span>
    </div>
    <div class="proj-grid" style="margin-top:32px;">
      <div class="proj-card"><div class="pc-mw">2 MW</div><div class="pc-loc">Jhiganpur</div></div>
      <div class="proj-card"><div class="pc-mw">2 MW</div><div class="pc-loc">Khurai</div></div>
      <div class="proj-card"><div class="pc-mw">2 MW</div><div class="pc-loc">Raisen</div></div>
      <div class="proj-card"><div class="pc-mw">6 MW</div><div class="pc-loc">Guna</div></div>
    </div>
  </div>
</section>

<!-- ═══════════════════ FOOTER (FIXED) ═══════════════════ -->
<footer class="closing">
  <div class="wrap closing-grid">
    <div>
      ${footerLogo}
      <p>One-stop solar solutions — EPC &amp; power transmission, energy storage, and energy trading. Franchise partner of Waaree Solar.</p>
    </div>
    <div>
      <div class="closing-col-label">Registered Office</div>
      <p>Office B-22, C Sector, Indrapuri,<br>near Syndicate Bank BHEL,<br>Bhopal, Madhya Pradesh, India</p>
      <p style="margin-top:10px;">+91 75549 20666</p>
    </div>
    <div>
      <div class="closing-col-label">Contact &amp; Legal</div>
      <p><a href="mailto:ashutosh@asa-epc.com">ashutosh@asa-epc.com</a></p>
      <p><a href="mailto:pushpraj@asa-epc.com">pushpraj@asa-epc.com</a></p>
      <p style="margin-top:10px;">CIN U31905MP2018PTC04527<br>DPIIT No. DIPP19520</p>
    </div>
  </div>
  <div class="wrap closing-bottom">
    <span>Quotation valid for 30 days from offer date.</span>
    <span>asa-epc.com · asasolar.in</span>
  </div>
</footer>

<!-- ═══════════════════ ACCEPT BAR (DYNAMIC TOTAL) ═══════════════════ -->
<div class="accept-bar">
  <div class="ab-left">Grand Total <strong>${fmt(grandTotal)}</strong></div>
  <button class="ab-btn" onclick="window.print()">Download / Print</button>
</div>

<script>
// Scroll reveal
const revealEls = document.querySelectorAll('section');
revealEls.forEach(el => el.classList.add('reveal'));
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
}, { threshold: 0.08 });
revealEls.forEach(el => obs.observe(el));

// ── PRINT FIX: IntersectionObserver doesn't fire during print ──
// Force ALL sections visible the moment print dialog opens.
function makeAllVisible() {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}
window.addEventListener('beforeprint', makeAllVisible);
// Also trigger immediately so the first print attempt works even without scrolling
document.addEventListener('DOMContentLoaded', function() {
  // Small delay so observer can catch the visible sections first, then we ensure rest are visible on print
  window.matchMedia('print').addListener(function(mq) {
    if (mq.matches) makeAllVisible();
  });
});
</script>
</body>
</html>`;
}
