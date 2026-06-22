export const defaultState = {
  // ── HERO / HEADER ──────────────────────────────────────────
  eyebrow: 'Open Access · KUSUM C Solar Proposal',
  title: '12,500 KWp DC Grid-Connected Ground Mount Turnkey Solar Project',
  heroSub: 'A techno-commercial offer prepared for D K Builders — Bawadiya Kala, Bhopal, Madhya Pradesh, built on nine years of solar EPC delivery and a Waaree Energy partnership.',

  // ── HERO META CARD ─────────────────────────────────────────
  clientName: 'D K Builders',
  location: 'Bawadiya Kala, Bhopal, MP',
  projectDate: '06 April 2027',
  scheme: 'KUSUM',

  // ── PROJECT SUMMARY ────────────────────────────────────────
  summary: {
    siteSystem: [
      { k: 'Location', v: 'Village Raisen, Tehsil & District Raisen' },
      { k: 'Plant capacity', v: '12.50 MWp' },
      { k: 'Module technology', v: 'TOPCon 625 Wp' },
      { k: 'Area required', v: '30 acres' },
      { k: 'Mounting structure', v: 'Seasonal tilt' },
    ],
    schemeContact: [
      { k: 'Project scheme', v: 'PM-KUSUM' },
      { k: 'Finance options', v: 'SBI Agri · SBI MSME · Canara · AU' },
      { k: 'Developer contact', v: 'Ashutosh Pandey' },
      { k: 'Offer date', v: '06 April 2027' },
    ],
  },

  // ── TECHNICAL SPECIFICATIONS ───────────────────────────────
  specs: [
    { item: 'Solar PV Modules', spec: 'P max ≥ 615 Wp, N-Type Bi-Facial' },
    { item: 'Mounting Structures', spec: 'Seasonal tilt 5–20°, HDGI (for RCC) + Galvanum, min. 500mm clearance' },
    { item: 'Inverter', spec: 'Outdoor string inverter, min. 98% efficiency (SG320HX20), multi-rated 300–352 KVA' },
    { item: 'Combiner Boxes', spec: 'Dust / water-proof with applicable protection features' },
    { item: 'DC Solar Cables', spec: 'Solar grade, halogen-free, UV & weather resistant' },
    { item: 'AC LT Cables', spec: '3-core aluminium XLPE insulated, galvanised steel armoured' },
    { item: 'Earthing System', spec: 'Chemical, maintenance-free type' },
    { item: 'Lightning Arrestor', spec: 'ESE type, 120m radius coverage, per industry standards' },
    { item: 'ACDB', spec: 'Dust-proof, over-current and surge protection, IP65' },
    { item: 'Remote Monitoring', spec: 'Web-based, with data logger & SCADA system' },
    { item: 'Substation & Yard', spec: '800/33KV pulling substation, 10MVA transformer, breaker, isolator, metering unit' },
    { item: 'Transmission Line', spec: '33KV overhead, \'H\'-beam 13m structure, Dog conductor' },
    { item: 'Injection Bay & Metering', spec: '33KV injection bay at HT side of substation, with metering unit' },
  ],

  // ── EQUIPMENT & VENDORS ────────────────────────────────────
  vendors: [
    { item: 'Solar PV Modules', make: 'Waaree' },
    { item: 'Mounting Structures', make: 'Tata / JSW' },
    { item: 'String Inverter', make: 'Sungrow' },
    { item: 'DC Solar Cables', make: 'Polycab' },
    { item: 'AC Cables', make: 'Polycab' },
    { item: 'Earthing System', make: 'Per DISCOM guidelines' },
    { item: 'Lightning Arrestor', make: 'Powertech / Jeftechno' },
    { item: 'MCB / MCCB', make: 'Schneider' },
    { item: 'Weather Station', make: 'Kipp & Zonen / Davis' },
    { item: 'ACDB', make: 'Locally manufactured, IP65' },
    { item: 'MC4 Connectors', make: 'Waaree / Phoenix / Elmex' },
    { item: 'Miscellaneous', make: 'Standard make' },
  ],

  // ── SCOPE OF WORK (4 sub-blocks matching index.html) ───────
  scopeBlocks: [
    {
      title: 'Clearances & Approvals',
      col1Label: 'Approval / Clearance',
      col2Label: 'EPC',
      col3Label: 'Owner',
      rows: [
        { activity: 'CEIG & MPPTCL approval', c2: true, c3: false },
        { activity: 'Third-party inspection & testing', c2: true, c3: false },
        { activity: 'Completion certificate from nodal agencies', c2: true, c3: false },
        { activity: 'Liaison for meter approval', c2: true, c3: false },
      ],
    },
    {
      title: 'Site Preparation',
      col1Label: 'Activity',
      col2Label: 'EPC',
      col3Label: 'Owner',
      rows: [
        { activity: 'Construction power', c2: true, c3: false },
        { activity: 'Construction water', c2: true, c3: false },
        { activity: 'Power plant design & layout', c2: true, c3: false },
        { activity: 'Access of site', c2: false, c3: true },
      ],
    },
    {
      title: 'DC Side',
      col1Label: 'Item',
      col2Label: 'Supply',
      col3Label: 'E&C',
      rows: [
        { activity: 'Solar panels', c2: true, c3: true },
        { activity: 'MMS — seasonal tilt', c2: true, c3: true },
        { activity: 'DC cables', c2: true, c3: true },
        { activity: 'DC side earthing', c2: true, c3: true },
        { activity: 'Weather monitoring system', c2: true, c3: true },
        { activity: 'Lightning arrestor', c2: true, c3: true },
      ],
    },
    {
      title: 'AC Side',
      col1Label: 'Item',
      col2Label: 'Supply',
      col3Label: 'E&C',
      rows: [
        { activity: 'Inverter', c2: true, c3: true },
        { activity: 'LT cables', c2: true, c3: true },
        { activity: 'AC distribution board', c2: true, c3: true },
        { activity: 'AC side earthing', c2: true, c3: true },
        { activity: 'Control & communication cables', c2: true, c3: true },
      ],
    },
  ],

  // ── PROJECT SCHEDULE ───────────────────────────────────────
  scheduleTitle: '120 days, start to handover.',
  scheduleSubtitle: 'Three 40-day phases covering mobilisation, installation, and commissioning.',
  phaseLabels: ['Phase 1 · 40 days', 'Phase 2 · 40 days', 'Phase 3 · 40 days'],
  schedule: [
    { activity: 'Solar Power Plant',               p1: [true, true],  p2: [true, true],  p3: [true, true]  },
    { activity: 'NTP',                             p1: [true, false], p2: [false,false], p3: [false,false] },
    { activity: 'Site Mobilisation',               p1: [true, true],  p2: [true, true],  p3: [false,false] },
    { activity: 'Prep. of Final Drawings & BOM',   p1: [true, true],  p2: [false,false], p3: [false,false] },
    { activity: 'Receipt of Material',             p1: [false,true],  p2: [false,false], p3: [false,false] },
    { activity: 'Installation of PV Modules',      p1: [false,true],  p2: [true, false], p3: [false,false] },
    { activity: 'Module Interconnections',         p1: [false,true],  p2: [true, true],  p3: [false,false] },
    { activity: 'Earthing & Connections',          p1: [false,false], p2: [true, true],  p3: [false,false] },
    { activity: 'Solar Cable Laying & Termination',p1: [false,false], p2: [false,true],  p3: [false,false] },
    { activity: 'Installation of Inverters',       p1: [false,false], p2: [false,true],  p3: [false,false] },
    { activity: 'DC Cable Laying',                 p1: [false,false], p2: [false,true],  p3: [false,false] },
    { activity: 'AC Cable Laying & Terminations',  p1: [false,false], p2: [false,true],  p3: [false,false] },
    { activity: 'Communication Cable & Data',      p1: [false,false], p2: [false,false], p3: [true, false] },
    { activity: 'Quality Checking',                p1: [false,false], p2: [false,false], p3: [true, false] },
    { activity: 'Pre-Commissioning Tests',         p1: [false,false], p2: [false,false], p3: [true, false] },
    { activity: 'Inspection from Govt Bodies',     p1: [false,false], p2: [false,false], p3: [false,true]  },
    { activity: 'Final Commissioning',             p1: [false,false], p2: [false,false], p3: [false,true]  },
    { activity: 'Observation for Performance',     p1: [false,false], p2: [false,false], p3: [false,true]  },
    { activity: 'Completion & Handover',           p1: [false,false], p2: [false,false], p3: [false,true]  },
  ],

  // ── COMMERCIAL ─────────────────────────────────────────────
  commercialItems: [
    { desc: 'Solar Module', spec: '620 Wp Future', qty: 20161, perWatt: 14.25, price: 8835 },
    { desc: 'Inverter', spec: '320 KVA Sungrow', qty: 34, perWatt: 1.21, price: 445000 },
    { desc: 'Structure', spec: 'HDGI Column & Galvanum Rafter', qty: 200, perWatt: 1.68, price: 105000 },
    { desc: 'Cable AC', spec: '300SQMM Armoured, 11KV HT', qty: 6800, perWatt: 0.82, price: 1500 },
    { desc: 'Cable DC', spec: '4 Sq.mm copper, EN type', qty: 52075, perWatt: 0.23, price: 56 },
    { desc: 'BOS', spec: 'HDPE pipe, connectors, LA, earthing', qty: 1, perWatt: 0.40, price: 5000000 },
    { desc: 'ACDB (LT Panel)', spec: '7 IN 2 OUT, L&T', qty: 1, perWatt: 0.32, price: 4000000 },
    { desc: 'Transformer', spec: '33/0.8KV, 10000 KVA', qty: 1, perWatt: 1.04, price: 13000000 },
    { desc: 'HT Panel', spec: '33KV, ABB Panel', qty: 1, perWatt: 0.16, price: 2000000 },
    { desc: 'GSS Meter', spec: '3× ABT Meter 150 + metering eqpt.', qty: 1, perWatt: 0.11, price: 1350000 },
    { desc: 'Transmission Line', spec: '33 KV', qty: 3, perWatt: 0.36, price: 1500000 },
    { desc: 'GSS Injection Bay', spec: '33 KV', qty: 1, perWatt: 0.08, price: 1000000 },
    { desc: 'I&C incl. Civil', spec: '12,500 KW installation & commissioning', qty: 1, perWatt: 1.02, price: 12800000 },
    { desc: 'EPCM', spec: '12,500 KW', qty: 1, perWatt: 0.72, price: 9000000 },
    { desc: 'Fencing', spec: 'Chain fencing, 10ft/mtr', qty: 3000, perWatt: 0.24, price: 1000 },
    { desc: 'Control Room', spec: 'SCADA, CCTV, lighting', qty: 1, perWatt: 0.26, price: 3300000 },
  ],
};
