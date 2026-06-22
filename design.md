# Quotation Generator System — Design Document

**Document Type:** Single Source of Truth (SSOT) for System Design and PDF Reconstruction
**Reference Quotation:** ASA EPC PVT. LTD. — Open Access KUSUM C Solar Proposal (12500 KWp DC Grid-Connected Ground Mount Turnkey Solar Project)
**Reference Client in Source Document:** D K Builders
**Total Pages:** 17
**Version:** 1.0

---

## 1. Project Overview

### 1.1 Project Name
Quotation Generator System

### 1.2 Purpose of the System
The Quotation Generator System is a web-based application that allows a non-technical user to produce a fully branded, 17-page, professionally designed solar EPC quotation PDF without manually editing a document in design software. The system replaces a manual "copy the old quotation, retype the numbers, hope nothing breaks" workflow with a structured admin panel that captures every variable field (client details, technical specifications, equipment lists, scope of work, schedule, warranty terms, and commercial pricing) and outputs a PDF that is visually identical in structure, branding, and layout to the original reference quotation, every time.

### 1.3 Target Users
- **Primary user:** Internal sales/proposal staff at ASA EPC PVT. LTD. (or any EPC company using this system) who prepare client-facing quotations.
- **Secondary user:** Business owner/admin who manages master data (vendor lists, standard warranty terms, default specification text) that gets reused across quotations.
- **Indirect consumer:** The end client receiving the PDF — they never interact with the system, only receive the output document.

### 1.4 Business Objectives
- Eliminate manual document editing errors (wrong totals, outdated specs, inconsistent formatting) when producing solar EPC quotations.
- Reduce quotation turnaround time from hours (manual document editing) to minutes (form fill + generate).
- Ensure every quotation sent to a client maintains consistent, professional branding regardless of who creates it.
- Maintain a historical record of every quotation generated, tied to a specific client and project, for future reference, revisions, or audits.
- Allow the underlying template to evolve or new templates to be added without requiring a system rebuild.

### 1.5 Output Format
A single downloadable PDF file, 17 pages, US Letter or A4 (matching source: source PDF uses 612×792 pt pages, i.e., US Letter), generated on demand from form data and downloaded directly to the user's browser.

---

## 2. Document Structure

### 2.1 Total Number of Pages
17 pages, fixed page count and fixed page order. The system does not support arbitrary insertion or removal of pages in v1; page count flexibility is a future scalability consideration (see Section 8).

### 2.2 Page Numbering Structure
Pages are referenced sequentially as Page 1 through Page 17. The source PDF does not display visible printed page numbers on the page faces themselves; page identity is implicit from content and order. The generated system should maintain this same behavior (no visible "Page X of 17" footer text) to stay visually faithful to the source, unless the client later requests page numbers be added as an enhancement.

### 2.3 Static vs Dynamic Pages

| Page | Name | Type |
|------|------|------|
| 1 | Cover Page | Static |
| 2 | Company Stats, Vision & Mission | Static |
| 3 | Product/Service Range & Customer Map | Static |
| 4 | Project Description | **Dynamic** |
| 5 | About Us | Static |
| 6 | Technical Proposal — Project Summary | **Dynamic** |
| 7 | Specification Table | **Dynamic** |
| 8 | List of Major Equipment & Proposed Vendors | **Dynamic** |
| 9 | Scope of Work | **Dynamic** |
| 10 | Project Schedule | **Dynamic** |
| 11 | Product Warranty / Manufacturing Defect Warranty | **Dynamic** |
| 12 | Valuable Clients & Banking Affiliations | Static |
| 13 | Commercial Offer | **Dynamic** |
| 14 | Project Execution Methodology (Part 1) | Static |
| 15 | Project Execution Methodology (Part 2) | Static |
| 16 | Our Projects (Portfolio Gallery) | Static |
| 17 | Company Contact / Closing Page | Static |

> **Summary:** 9 static pages (1, 2, 3, 5, 12, 14, 15, 16, 17) and 8 dynamic pages (4, 6, 7, 8, 9, 10, 11, 13).

### 2.4 Purpose of Each Page (Summary)
- **Pages 1–3:** Brand introduction — who ASA EPC is, their scale, and their service range.
- **Page 4:** States the specific proposal type and project at a glance (title page for this specific deal).
- **Page 5:** Company narrative — mission-driven "About Us" copy.
- **Page 6:** The technical snapshot of this specific project (location, capacity, scheme).
- **Page 7:** Detailed component-level technical specification for the system being proposed.
- **Page 8:** Transparency on which brands/vendors will be used for each major component.
- **Page 9:** Legal/operational clarity on who (EPC vs Owner) is responsible for which task.
- **Page 10:** Time-bound delivery commitment, shown as a Gantt-style chart.
- **Page 11:** Warranty assurances per component — a trust/risk-reduction page.
- **Page 12:** Social proof — client logos and banking partners.
- **Page 13:** The actual commercial ask — itemized pricing and grand total.
- **Pages 14–15:** Visual proof of execution capability via process photos.
- **Page 16:** Portfolio proof — completed project examples.
- **Page 17:** Contact information and company registration details — closing/legal page.

---

## 3. Page-by-Page Breakdown

---

### Page 1 — Cover Page

**Page Purpose:** First impression brand cover. Establishes ASA EPC's identity and the nature of the document (a techno-commercial offer) before any content is read.

**Layout Description:** Full-bleed background using a diagonal yellow-to-green gradient. Company logo positioned top-left. Three angled/rounded photographic panels (wind turbines + solar farm, solar panel rows, electrical substation/transmission tower) arranged diagonally across the right two-thirds of the page, overlapping in a staggered cascade from top-right to bottom-right. Left-aligned text block in the lower-middle area stating the service categories. Bottom-right corner shows "SINCE 2017" badge.

**Design Guidelines:** Diagonal compositional energy (nothing is purely horizontal/vertical — all panels and dividing lines run on a diagonal axis). Color palette is yellow-green gradient (top) transitioning to dark forest green (bottom). White rounded-corner image frames create a "torn photo stack" aesthetic.

**Content Sections:**
- Header zone: Logo + tagline area
- Mid zone: Three stacked photo panels with diagonal white borders
- Lower zone: Headline copy + service bullet list
- Footer zone: Document type label + founding year badge

**Dynamic Fields:** None.

**Static Fields:**
- Company name: "ASA EPC PVT. LTD."
- Tagline: "One Stop Solar Solutions"
- Service bullets: "EPC & Power Transmission", "Energy Storage Solution.", "Energy Trading."
- Sub-headline: "Harness sunlight for eco-friendly electricity"
- Document type label: "Techno-Commercial Offer"
- Founding badge: "SINCE 2017"

**Images/Graphics:** ASA EPC logo (leaf/flower icon mark + wordmark), wind turbine + solar farm aerial photo, solar panel row aerial photo, electrical substation/transmission tower photo.

**Header/Footer:** No separate header/footer band; logo functions as the implicit header element.

**Typography & Spacing:** Bold rounded sans-serif for headline ("One Stop Solar Solutions") in white/cream on green background. Service bullets use a triangular bullet glyph (▶), white text, medium weight. "Techno-Commercial Offer" rendered in a larger, lighter-weight serif-adjacent display font for contrast against the bold sans-serif headline above it. Generous negative space at top-left around the logo.

---

### Page 2 — Company Stats, Vision & Mission

**Page Purpose:** Builds credibility through quantified track record, then states company philosophy.

**Layout Description:** Solid gradient green background (lighter at top, darker toward bottom). Header text spans two lines, centered. Below it, a 3×2 statistics grid divided by thin vertical/horizontal rule lines. Below the stats grid, two side-by-side columns ("VISION" and "MISSION") in large stylized display type, each with a quoted paragraph beneath. At the very bottom, a horizontal row of 5 icon+label pairs under a "Core Values" heading.

**Design Guidelines:** Heavy use of large bold numerals to make statistics scannable at a glance. Vision/Mission headers use a glowing/embossed display typeface treatment to feel aspirational. Core values use simple flat icon illustrations (single-color silhouette icons) for quick visual scanning.

**Content Sections:**
- Header: Two-line bold headline
- Stats grid: 6 stat blocks (3 columns × 2 rows)
- Vision/Mission: 2-column quote block
- Core Values: 5-item icon row

**Dynamic Fields:** None.

**Static Fields:**
- Headline: "Partner With NO.1 Indian Solar Panel Manufacture Waaree Energy LTD." / "India's Largest Vertically Integrated Energy Company with Global Operations"
- Stat 1: "09 years industry experience"
- Stat 2: "100+ Employees"
- Stat 3: "100+MW Turnkey Solar EPC Projects Succwssfully Commissiond" *(note: source contains typos "Succwssfully Commissiond" — reproduce exactly as-is per the static-content fidelity requirement, or flag for correction; see Section 6 content notes)*
- Stat 4: "2 COUNTRY presence"
- Stat 5: "200+ Project In Pipe LIne"
- Stat 6: "100+MW Assets Management"
- Vision quote: "Delivering Exceptional, Economical, and Eco-Friendly Energy Solutions We provide top-tier, cost-efficient sustainable energy solutions, fostering a greener future for generations."
- Mission quote: "Revolutionizing global energy with cutting-edge, high-quality, and affordable solar solutions for a sustainable future, empowering energy independence worldwide instantly."
- Core Values labels: "Integrity", "Respect for Individuals", "Customer first", "Passion for Excellence", "Continuous Improvements & Innovation"

**Images/Graphics:** 5 flat-icon illustrations for core values (handshake/integrity icon, pointing-hand icon, crown-in-hands icon, medal icon, lightbulb-head icon).

**Header/Footer:** Logo repeated top-left, consistent with all pages.

**Typography & Spacing:** Stat numbers in extra-bold, large size (visually the dominant element on the page) with smaller label text beneath each. "VISION" and "MISSION" headers rendered in a heavy, glow-outlined display font for emphasis, noticeably larger than body copy. Quote paragraphs in italics or regular weight, centered, with generous line height for readability against the busy background.

---

### Page 3 — Product/Service Range & Customer Map

**Page Purpose:** Visually communicates the breadth of ASA EPC's product/service catalog and geographic reach.

**Layout Description:** Gradient background (yellow-green top to dark green bottom), same family as Page 1. Two rows of icon+label tiles (6 tiles top row, 6 tiles bottom row) representing distinct products/services. Below that, a "Trusted by 200+ customers" headline, followed by a stylized map graphic (India + UAE) with red dot markers indicating customer locations.

**Design Guidelines:** Grid-based icon tile layout for the service range — consistent tile sizing creates visual rhythm. Map uses a simplified, flat, two-tone (light green landmass on dark background) cartographic style with red accent dots, not a literal satellite map.

**Content Sections:**
- Header: "ASA Is Driving Growth And Adoption In The Renewable Energy Sector"
- Service/product tile grid (12 tiles total across 2 rows)
- Customer trust headline
- Map graphic with location markers

**Dynamic Fields:** None.

**Static Fields:**
- Tile labels: "Solar Module", "EPC Service", "Rooftop Solar", "Floating On Gnd /off Grid Solar", "Inverters", "Water Pumps", "Energy Storoge Solutions" *(typo in source: "Storoge")*, "THERMAL SOLAR POWER PLANT", "Hydrogen Enorgy" *(typo in source: "Enorgy")*, "Solar Cables", "Solar Partners", "Financial Service"
- Headline: "Trusted by 200+ customers"

**Images/Graphics:** 12 product/service photo or icon tiles, stylized India+UAE map illustration with marker pins (approx. 8–9 markers visible across India plus 1 in UAE).

**Header/Footer:** Logo top-left, consistent placement.

**Typography & Spacing:** Tile labels in bold, dark text directly beneath each photo/icon, center or left aligned depending on tile. "200+" rendered in a contrasting accent color (light green/lime) against the surrounding white headline text to draw the eye to the key trust metric.

---

### Page 4 — Proposal Title Page

**Page Purpose:** States precisely which proposal this document is — the specific scheme, capacity, technology, and client — functioning as the divider between brand-intro pages and project-specific technical content.

**Layout Description:** Solid green gradient background (yellow-green top, fading to near-black green at bottom), no photographic imagery. Centered text block, vertically weighted toward the upper-middle third of the page, with the client/site details positioned lower-middle, separated by significant vertical white space.

**Design Guidelines:** Minimalist, text-only, high-contrast (light text on dark gradient). Underlines used as a visual divider beneath the main company name to separate it from the proposal subtitle.

**Content Sections:**
- Company name banner (underlined)
- Proposal category label
- Capacity + technology headline
- Client/site attribution block

**Dynamic Fields (treated as static placeholders in current build; see Section 2.3 note):**
- Proposal scheme name (source example: "OPEN ACCESS KUSUM C SOLAR PROPOSAL")
- Capacity and system type headline (source example: "12500KWp DC Grid-connected Ground Mount Turnkey Solar Project.")
- Client name (source example: "[D K BUILDERS]")
- Site address (source example: "[FOR-DK 24 CARAT BAWADIYA KALA]")
- Site city/state (source example: "[BHOPAL MP]")

**Static Fields:**
- Company name: "ASA EPC PVT.LTD."

**Images/Graphics:** Logo top-left only; no other imagery.

**Header/Footer:** Logo top-left, consistent with all pages. No footer content.

**Typography & Spacing:** Company name in large, bold, underlined, light-yellow/cream text. Proposal category label in a contrasting lighter blue/cyan tone to differentiate it from the white headline text below. Capacity headline in large bold white text, two-line wrap. Client/site block in bold black text inside square brackets (source formatting literally includes bracket characters around placeholder values — this is a content authoring artifact in the source document, not a design element, and should not be replicated as literal brackets in the live system; brackets should be removed once real data populates the field).

---

### Page 5 — About Us

**Page Purpose:** Narrative company description — what ASA EPC does and the breadth of services across the project lifecycle, reinforcing credibility before diving into technical content.

**Layout Description:** Gradient background (yellow-green top to dark green bottom). Top third is dense paragraph text (quoted company description, then two supporting paragraphs). Bottom two-thirds is a circular/petal four-quadrant diagram (Engineering, Procurement, Construction, Asset Management) with small supporting icons flanking the diagram on both left and right edges.

**Design Guidelines:** Paragraph-heavy upper section balanced by a strong central graphic anchor (the 4-quadrant circular diagram) in the lower section to avoid the page feeling like a wall of text. Icons flanking the central diagram add visual texture without competing with the central focal graphic.

**Content Sections:**
- Header: "ABOUT US"
- Quoted company description paragraph
- Two narrative paragraphs (capability statement + value proposition)
- Process pipeline list (Site Assessment & Planning → Design and Installation → Testing and commissioning → Automation and Integration → Repair and Maintenance → Spare Part Replacement)
- 4-quadrant circular diagram: Engineering / Procurement / Construction / Asset Management
- Flanking decorative icons (solar installer figure, energy cycle icon, solar panel icon, transmission tower icons ×2, wind turbine icon, sun/solar icon, power station icon)

**Dynamic Fields:** None.

**Static Fields:** All "About Us" narrative copy, the process pipeline list, and the 4 quadrant labels are fixed company-level content, not project-specific.

**Images/Graphics:** 4 colored circular badges (green) for Engineering/Procurement/Construction/Asset Management quadrants, each with a small thematic icon inside (gear/pipes, briefcase/handshake, building/construction, solar+building icon); 7 small flanking line/flat icons along the page edges.

**Header/Footer:** Logo top-left, consistent placement.

**Typography & Spacing:** Body paragraphs in regular weight, dark text, centered or justified, against the colored background (sufficient contrast maintained via dark text color choice). Process pipeline rendered as an inline hyphen-separated list rather than bullets. Quadrant labels in bold white text inside the green circular badges.

---

### Page 6 — Technical Proposal: Project Summary

**Page Purpose:** The first project-specific data page. Gives a fast-reference summary table of the system being proposed, before the detailed specification table on Page 7.

**Layout Description:** Top: gradient banner with two-line header. Below: a structured two-column key-value table, organized into labeled sub-sections (Proposed Site, Solar PV System Specification, Developer Details), each sub-section introduced by a full-width green section-header row.

**Design Guidelines:** Alternating white/green row shading for scannability. Section header rows span the full table width to visually group related fields. Left column holds field labels (lighter weight), right column holds values (bold/emphasized).

**Content Sections / Dynamic Fields:**

*Proposed Site*
- `location` — Free text (source example: "VILLAGE- RAISEN, TEHSIL-RAISEN, DISTRICT-RAISEN")

*Solar PV System Specification: On-Grid Ground Mounted*
- `plant_capacity` — Numeric + unit (source example: "12.50 MWp")
- `module_technology` — Free text (source example: "TOPCON 625 Wp")
- `area_required` — Numeric + unit (source example: "30 ACRE")
- `mounting_structure_technology` — Free text/dropdown (source example: "seasonal Tilt")
- `finance_scheme` — Free text, comma-separated list of lenders (source example: "SBi AGRI, SBI MSME, Canara, AU")
- `project_scheme` — Free text/dropdown (source example: "KUSUM")

*Developer Details*
- `contact_person` — Free text (source example: "Ashutosh Pandey")
- `offer_date` — Date field (source example: "4/6/2027")

**Static Fields:** Section header row labels ("Proposed Site", "Solar PV System Specification: On-Grid Ground Mounted", "Developer Details") and field labels themselves ("Location:", "Plant Capacity:", "Module Technology:", "Area Required", "Mounting Structure technology:", "Finance Scheme", "Project Scheme:", "Contact Person:", "Offer Date:") are static labels; only the values are dynamic.

**Images/Graphics:** None beyond logo and gradient header banner.

**Header/Footer:** Logo top-left; gradient header band containing page title "TECHNICAL PROPOSAL / PROJECT SUMMARY".

**Typography & Spacing:** Table uses consistent cell padding; field labels in regular weight dark text on white rows, bold dark text on green rows; values right-aligned or left-aligned consistently per column. Date field shown as a pill/badge-style highlighted value in the source (light gray rounded rectangle around "4/6/2027") — this styling can be optionally preserved or simplified to plain table text.

---

### Page 7 — Specification of [X] MWp Ground Mounted

**Page Purpose:** Detailed, component-by-component technical specification of the proposed solar system, used by the client's technical reviewers to validate engineering compliance.

**Layout Description:** Gradient header banner with dynamic capacity value embedded in the title. Below, a 3-column table (No. / Item / Specification) with alternating white/green row shading, one row per system component.

**Design Guidelines:** Identical table styling pattern to Page 6 and Page 8 for visual consistency across all tabular pages. Specification column allows multi-line wrapped text since some specs are lengthy (e.g., inverter spec spans capacity ratings at multiple voltage levels).

**Content Sections / Dynamic Fields:**

Table title capacity value: `spec_table_capacity` (source example: "2.4 MWp" — note this differs from the 12.50 MWp stated on Page 6; in the source document this appears to be a per-unit/sub-block specification rather than the whole-plant capacity, and the admin form should make clear which capacity this label refers to, or allow it to be edited independently from the Page 6 plant capacity field).

Repeatable specification rows, each with: `sr_no` (auto-incrementing or manual), `item` (free text), `specification` (free text, multi-line supported). Source rows, in order:

| No. | Item | Specification |
|-----|------|----------------|
| 1 | Solar PV Modules | P max>=615Wp. N Type Bi-Facial |
| 2 | Module Mounting Structures – Seasonal Tilt (5-20) Degree | HDGI ( For RCC)+Galvonum( minimum clearance 500mm, 20 Degree, 1092 mm 5 Degree) |
| 3 | Inverter | outdoor Type String Inverter, Min 98% Efficiency ( SG320HX20) (352KVA@30/320KVA@40/300KVA@51 [text truncated in source document at page edge] |
| 4 | Combiner Boxes (if applicable) | Dust/Water Proof With Applicable Protection Features |
| 5 | DC Solar Cables | Solar Grade, Halogen Free, UV& Weather Resistant |
| 6 | AC LT Cables | 3 Core Aluminium core XLPE insulated, Inner PVC sheated, Galvanized Steal Armored Cables (As per Clients Spec.) |
| 7 | Earthing System | Chemical, Maintenance Free Type |
| 8 | Lighting Arrestor | As Per Industry Standards ( ESE Type 120 Mtr. Radius) |
| 9 | ACDB | Dust Proof, Over Current and Surge Protection Device, (IP 65) |
| 10 | Remote Monitoring System | Web Based Remote Monitoring system with data logger & SCADA System |
| 11 | Substation & Yard | Pulling substation( 800/33KV,( 10MVA) Transformer, Breaker, Isolater, Metering Unite) |
| 12 | Transmission Line | 33KV overhead line 'H' beam 13 Mtr. Type structure, Dog Conductor |
| 14 | Injection Bay & Metering Unit | 33KV Injection Bay at HT side of Substation along with Metering Unite |

> **Content note:** The source table's numbering jumps from 12 directly to 14, skipping 13. This is a pagination/authoring artifact in the original document (the table likely continues onto a row that was cut off in the source export, or row 13 was deleted without renumbering). The admin panel's row builder should not enforce sequential numbering as a hard validation rule, since the source template itself does not follow strict sequential numbering. Also, item 3's specification text is cut off at the page's right edge in the source PDF; this should be flagged for the client to provide the complete text when populating real data, rather than silently truncating in the generated output.

**Static Fields:** Column headers "No.", "Item", "Specification" are static labels.

**Images/Graphics:** None beyond logo and gradient header banner.

**Header/Footer:** Logo top-left; gradient header banner with title "SPECIFICATION OF [capacity] Ground Mounted:".

**Typography & Spacing:** Bold column headers on dark-green header row with white/dark text; body rows alternate white and medium-green shading; multi-line specification cells maintain consistent line-height and left padding.

---

### Page 8 — List of Major Equipment's and Proposed Vendors

**Page Purpose:** Establishes which brand/manufacturer will be used for each major equipment category, giving the client transparency and confidence in component quality.

**Layout Description:** Gradient header banner with fixed title (no dynamic value in the title itself, unlike Page 7). Below, a 3-column table (Sr. No. / Item / Offered Makes) with alternating white/green row shading.

**Design Guidelines:** Same tabular pattern as Pages 6 and 7 for visual consistency. "Offered Makes" column may list a single brand or multiple brand alternatives separated by "/".

**Content Sections / Dynamic Fields:**

Repeatable rows, each with: `sr_no`, `item` (free text), `offered_makes` (free text, may contain multiple brand names separated by "/"). Source rows, in order:

| Sr. No. | Item | Offered Makes |
|---------|------|----------------|
| 1 | Solar PV Modules | WAAREE |
| 2 | Module Mounting Structures | As per Standard Make (TATA, JSW) |
| 3 | On Grid String Inverter | Sungrow |
| 4 | DC Solar Cables | Polycab |
| 5 | AC Cables | Polycab |
| 6 | Earthing System | As per DISCOM guidelines |
| 7 | Lighting Arrestor | Powertech/ Jeftechno/ Equivalent |
| 8 | MCB / MCCB | Schneider |
| 9 | Weather Monitoring Station | KIP & ZONEN/Davis / Trinity touch/ Equivalent |
| 10 | ACDB | Locally Manufactured (As per IP-65 Standard) |
| 11 | MC4 Connectors | Waaree/ Pheonix/ Elmex/ Equivalent |
| 12 | Other Miscellaneous Items | Standard Make |

**Static Fields:** Page title "LIST OF MAJOR EQUIPMENT'S AND PROPOSED VENDORS"; column headers "Sr. No.", "Item", "Offered Makes".

**Images/Graphics:** None beyond logo and gradient header banner.

**Header/Footer:** Logo top-left; gradient header banner with static title.

**Typography & Spacing:** Identical styling pattern to Page 7's table — bold header row, alternating row shading, consistent cell padding.

---

### Page 9 — Scope of Work

**Page Purpose:** Defines responsibility allocation between the EPC contractor and the project owner across clearances, site preparation, and DC/AC side equipment — critical for avoiding scope disputes later in the project.

**Layout Description:** No gradient banner on this page (departs from the pattern of Pages 6–8) — instead a single bold header label "SCOPE OF WORK" sits directly above four stacked sub-tables, each introduced by a full-width dark-green section title row: "Clearances & Approvals", "Site Preparation Activities", "DC Side", "AC Side".

**Design Guidelines:** Each sub-table uses a consistent column structure (Sr No / Activity-or-Approval-or-Item / responsibility column(s) / Remarks). Checkmark icons (☑) indicate which party is responsible; a "-" indicates not applicable to that party. The DC Side and AC Side tables split responsibility into two columns ("Supply" and "E&C" — Engineering & Construction) rather than the "EPC / Owner" split used in the first two sub-tables.

**Content Sections / Dynamic Fields:**

*Sub-table 1: Clearances & Approvals* — columns: Sr No, Approvals & Clearances (item name), EPC (checkbox), Owner (checkbox), Remarks (free text)

| Sr No | Approvals & Clearances | EPC | Owner | Remarks |
|-------|------------------------|-----|-------|---------|
| 1 | CEIG & MPPTCL Approval | ✓ | - | |
| 2 | Third party inspection & testing | ✓ | - | |
| 3 | Completion Certificate from Nodal Agencies | ✓ | - | |
| 4 | Liaison for meter approval | ✓ | - | |

*Sub-table 2: Site Preparation Activities* — columns: Sr No, Activity, EPC (checkbox), Owner (checkbox), Remarks

| Sr No | Activity | EPC | Owner | Remarks |
|-------|----------|-----|-------|---------|
| 1 | Construction Power | ✓ | - | |
| 2 | Construction Water | ✓ | - | |
| 3 | Power Plant Design & Layout | ✓ | | |
| 4 | Access of Site | - | ✓ | |

*Sub-table 3: DC Side* — columns: Sr No, Item, Supply (checkbox), E&C (checkbox), Remarks

| Sr No | Item | Supply | E&C | Remarks |
|-------|------|--------|-----|---------|
| 1 | Solar Panels | ✓ | ✓ | |
| 2 | MMS – SEASONAL Tilt | ✓ | ✓ | |
| 3 | DC Cables | ✓ | ✓ | |
| 4 | DC Side Earthing | ✓ | ✓ | |
| 5 | Weather Monitoring system | ✓ | ✓ | |
| 6 | Lightening Arrestor | ✓ | ✓ | |

*Sub-table 4: AC Side* — columns: Sr No, Item, Supply (checkbox), E&C (checkbox), Remarks

| Sr No | Item | Supply | E&C | Remarks |
|-------|------|--------|-----|---------|
| 1 | Inverter | ✓ | ✓ | |
| 2 | LT Cables | ✓ | ✓ | |
| 3 | AC Distribution Board | ✓ | ✓ | |
| 4 | AC Side Earthing | ✓ | ✓ | |
| 5 | Control & Communication Cables | ✓ | ✓ | |

Each row's checkbox values (`epc_checked`/`owner_checked` or `supply_checked`/`ec_checked`) and the `remarks` field are dynamic. Rows can be added or removed within each sub-table.

**Static Fields:** Page title "SCOPE OF WORK"; the four sub-table section titles; column headers within each sub-table.

**Images/Graphics:** Checkmark glyphs (☑ style box-checkmark icon) rendered per cell where applicable.

**Header/Footer:** Logo top-left; no gradient banner header on this page (plain white background above the table structure, distinguishing it from Pages 6–8).

**Typography & Spacing:** Section title rows in bold white-on-dark-green; data rows in regular weight on white background with thin black grid borders throughout (heavier-bordered table than Pages 6–8, which use color-block shading instead of grid lines as the primary visual separator).

---

### Page 10 — Project Schedule

**Page Purpose:** Visual delivery timeline communicating exactly when each construction activity occurs, divided into three 40-day phases.

**Layout Description:** Gradient header banner with title. Below, a Gantt-style table: first two columns are Sr No and Activity (fixed width, text-heavy), followed by 3 grouped phase-header columns each labeled "40 days", each phase subdivided into 2 sub-columns (so 6 fillable time-cells total per row). Cells are filled solid green where the activity is active during that time-sub-period, left white/empty otherwise.

**Design Guidelines:** The visual Gantt bar effect is achieved purely through cell shading (filled vs unfilled), not through layered bar-chart graphics — this keeps it achievable with simple table/grid rendering rather than requiring chart-library Gantt components.

**Content Sections / Dynamic Fields:**

Repeatable rows, each with: `sr_no`, `activity` (free text), and a `timeline` array of 6 boolean values (one per time-sub-column) indicating whether that activity is active during that period. Source rows, in order:

| Sr No | Activity |
|-------|----------|
| 1 | Solar Power Plant |
| 2 | NTP |
| 3 | Site Mobilisation |
| 4 | Preparation of Final Drawings and BOM |
| 5 | Receipt of Material (MMS, PV Mod, Inverters & ...) |
| 6 | Installation of PV Modules |
| 7 | Module Interconnections |
| 8 | Earthing and Connections to Equipment |
| 9 | Solar Cable Laying & Termination at Module & Inverter |
| 10 | Installations of Inverters with Frame/Stand |
| 11 | DC Cable Laying & connection to Inverter |
| 12 | AC Cable Laying & Terminations to Inverter & LT Panel |
| 13 | Installations of Communication Cable & Data |
| 14 | Quality Checking at various stages of all activities |
| 15 | Pre-Commissioning Tests |
| 16 | Inspection from Government Bodies |
| 17 | Final Commissioning of the Plant |
| 18 | Observation for Performance |
| 19 | Completion & Handover |

The exact filled/unfilled pattern per row (the visual Gantt bars) is dynamic data tied to project-specific planning and should be fully editable per cell in the admin panel — represented as a simple 19-row × 6-column boolean grid input (e.g., a clickable cell toggle UI).

**Static Fields:** Page title "PROJECT SCHEDULE"; the three "40 days" phase header labels (the phase duration value itself could be made dynamic in a future enhancement if project durations vary, but is treated as a static label in this build); column headers "Sr No" and "Activity".

**Images/Graphics:** None beyond logo and gradient header banner; the "graphic" content is entirely the cell-shading pattern itself.

**Header/Footer:** Logo top-left; gradient header banner with title.

**Typography & Spacing:** Activity names in small regular-weight text, left-aligned, word-wrapped within a fixed-width column; phase header labels centered and bold above their respective grouped sub-columns.

---

### Page 11 — Product Warranty / Manufacturing Defect Warranty

**Page Purpose:** Lists warranty commitments per major component category, a key trust-building and risk-disclosure page for the client.

**Layout Description:** Gradient header banner (two-line title). Below, a 3-column table (Sr. No. / Component / Warranty (In Years)) with green header row and white body rows separated by thin colored vertical divider lines (not full grid borders like Page 9, closer to the minimal-line style of Page 6).

**Design Guidelines:** Warranty column supports multi-line, multi-clause text (e.g., separate product warranty and performance warranty statements stacked within a single cell), with underline formatting used in the source for emphasis on key warranty terms.

**Content Sections / Dynamic Fields:**

Repeatable rows, each with: `sr_no`, `component` (free text), `warranty_terms` (free text, multi-line supported). Source rows, in order:

| Sr. No. | Component | Warranty (In Years) |
|---------|-----------|----------------------|
| 1 | Solar modules | 30 Year Product Warranty against manufacturing defect and poor workmanship. Performance Warranty: 90% Rated Power Output at end of 10th years and 80% Power at end of 30th year. |
| 2 | Inverter | 5 Years EXTENTED 25 YEARS |
| 3 | Module Mounting Structure | 25 Years |
| 4 | Other BOS | 1 As per Original Equipment Manufacture warranty terms |

**Static Fields:** Page title "Product Warranty / Manufacturing Defect Warranty"; column headers "Sr. No.", "Component", "Warranty (In Years)".

**Images/Graphics:** None beyond logo and gradient header banner.

**Header/Footer:** Logo top-left; gradient header banner with title.

**Typography & Spacing:** Component names in bold/medium weight; warranty text uses underline emphasis on key numeric commitments (e.g., "30 Year Product Warranty", "90% Rated Power Output") per the source styling — this underline-as-emphasis pattern should be preserved or substituted with bold emphasis if underline rendering is inconsistent across the chosen PDF library.

---

### Page 12 — Valuable Clients & Banking Affiliations

**Page Purpose:** Social proof through brand logos of past clients and financial/banking partners, reinforcing credibility and bankability of the EPC offering.

**Layout Description:** Gradient background (yellow-green top to dark green bottom). "VALUABLE CLIENTS:" header, followed by a 4×3 grid of client logo tiles. Below that, "ASSOCIATION & BANKING AFFILIATION" header, followed by 2 large partner logo banners (Waaree, Rayzon Solar) and a 4-tile row of banking partner logos.

**Design Guidelines:** Logo tiles use a clean white background card per logo for legibility against the colored page background. Grid alignment is consistent across both the client-logo section and the banking-affiliation section.

**Content Sections:**
- "VALUABLE CLIENTS:" header + 12 client logos (Bajaj, L&T Construction, Shyam Steel, Envisol, Novus Green, Shakti Pumping Life, Waaree, Bhawani, Disha Interio, KEC International, CVRU, Monte Carlo)
- "ASSOCIATION & BANKING AFFILIATION" header
- 2 large partner banners: Waaree, Rayzon Solar
- 4 banking partner logos: SBI, Canara Bank, Ecobank, AU Small Finance Bank

**Dynamic Fields:** None in current build. *(Future enhancement: client logo grid could be made dynamic if the company wants to refresh the showcased client list per quotation or periodically without a full template rebuild — see Section 8.)*

**Static Fields:** All header labels and the logo set as currently curated.

**Images/Graphics:** 12 client brand logo images, 2 large partner banner images, 4 banking partner logo images.

**Header/Footer:** Logo top-left, consistent placement.

**Typography & Spacing:** Section headers in bold, underlined, golden/cream color against the gradient background; logo tiles arranged in evenly spaced grid rows with consistent white-card padding around each logo for contrast.

---

### Page 13 — Commercial Offer

**Page Purpose:** The core commercial proposal — itemized BOQ-style pricing for every major cost component, culminating in the grand total the client is being asked to approve.

**Layout Description:** Bold header "COMMERCIAL OFFER:" on a gradient banner. Below, a wide multi-column table: Sr. No / Dis. (Description) / Specification / Tentative Quantity / Per Watt (rate) / Unit Price / Price. Table terminates in three summary rows: TOTAL, GST [rate]%, and GRAND TOTAL, each spanning/merging the Sr.No–Per Watt columns into a single label cell with the corresponding value(s) in the trailing columns.

**Design Guidelines:** This is the most data-dense and calculation-critical page in the document. Alternating white/green row shading consistent with other tabular pages (6, 7, 8). The per-watt rate column functions as a secondary unit-economics reference alongside the absolute unit price — both are shown so the client can sanity-check pricing on a ₹/Watt basis, a standard convention in solar EPC commercial proposals.

**Content Sections / Fields (treated as static placeholders in current build; see Section 2.3 note):**

Repeatable line items, each with: `sr_no`, `description`, `specification`, `tentative_quantity`, `per_watt_rate`, `unit_price`, `price` (= quantity × unit price, or derived from per-watt rate × total watts depending on line item type). Source rows, in order:

| Sr. No | Dis. | Specification | Tentative Qty | Per Watt | Unit Price | Price |
|--------|------|----------------|----------------|----------|------------|-------|
| 1 | Solar Module | 620 Wp Future | 20161 | ₹14.25 | ₹8,835.00 | ₹17,81,25,000.00 |
| 2 | Inverter | 320 KVA Sungrow | 34 | ₹1.21 | ₹4,45,000.00 | ₹1,51,30,000.00 |
| 3 | Structure | HDGI Colum & Galvonum Rafter, Perlin++ SS Hardware | 200 | ₹1.68 | ₹1,05,000.00 | ₹2,10,00,000.00 |
| 4 | Cable AC | 300SQMM Armered Cable, 11 KV HT Cable | 6800 | ₹0.82 | ₹1,500.00 | ₹1,02,00,000.00 |
| 5 | Cable DC | 4 Sq.mm copper Cable EN Type | 52075 | ₹0.23 | ₹56.00 | ₹29,16,200.00 |
| 6 | BOS (HDPE Pipe, Connector, LA, Earthings & earthing Strips, Tie) | 1 Lot | 1 | ₹0.40 | ₹50,00,000.00 | ₹50,00,000.00 |
| 7 | ACDB(LT Panel) | 7 IN 2 OUT, L&T | 1 | ₹0.32 | ₹40,00,000.00 | ₹40,00,000.00 |
| 8 | Transformer | 33/.800Kv 10000 KVA | 1 | ₹1.04 | ₹1,30,00,000.00 | ₹1,30,00,000.00 |
| 9 | HT Panel | 33 Kv, ABB Panel | 1 | ₹0.16 | ₹20,00,000.00 | ₹20,00,000.00 |
| 10 | GSS Meter | 3 nos. ABT METER 150, 3 Nos. Metering Equepment, Modem, Cable and box | 1 | ₹0.11 | ₹13,50,000.00 | ₹13,50,000.00 |
| 11 | Transmission Line | 33 KV | 3 | ₹0.36 | ₹15,00,000.00 | ₹45,00,000.00 |
| 12 | GSS Injection Bay | 33KV | 1 | ₹0.08 | ₹10,00,000.00 | ₹10,00,000.00 |
| 13 | I & C including Civil Material | 12500 KW Installation & Commissioning | 1 | ₹1.02 | ₹1,28,00,000.00 | ₹1,28,00,000.00 |
| 14 | EPCM | 12500 KW | 1 | ₹0.72 | ₹90,00,000.00 | ₹90,00,000.00 |
| 15 | Fencing (10Ft per Mtr) | chain fencing | 3000 | ₹0.24 | ₹1,000.00 | ₹30,00,000.00 |
| 16 | Control Room, Scada, CCTV, Lighting. | | 1 | ₹0.26 | ₹33,00,000.00 | ₹33,00,000.00 |

**Summary rows:**
- TOTAL — Per Watt: ₹22.91, Price: ₹28,63,21,200.00
- GST 8.9% — Per Watt: ₹2.04, Price: ₹2,54,82,586.80
- GRAND TOTAL — Per Watt: ₹24.94, Price: ₹31,18,03,786.80

> **Calculation note:** TOTAL.Price = Σ(line item Price). GST.Price = TOTAL.Price × GST rate (here 8.9%, an unusual blended rate — likely a mix of goods at 18%/12% GST slabs averaged across the BOQ rather than a single standard slab; the system should allow the GST rate to be entered as a direct percentage rather than assuming a fixed 18%, since blended EPC project GST rates vary). GRAND TOTAL.Price = TOTAL.Price + GST.Price. The same relationship holds for the Per Watt column (Total Per Watt + GST Per Watt = Grand Total Per Watt). All three summary values must be computed, not manually typed, to avoid the totals silently going stale if a line item changes.

**Static Fields:** Page title "COMMERCIAL OFFER:"; column headers "Sr. No", "Dis.", "Specification", "Tentative quantity", "PER WATT", "UNIT PRICE", "PRICE"; summary row labels "TOTAL", "GST", "GRAND TOTAL".

**Images/Graphics:** None beyond logo and gradient header banner.

**Header/Footer:** Logo top-left; gradient header banner with bold title.

**Typography & Spacing:** Header row in bold on green background; alternating white/green body rows; summary rows (TOTAL, GST, GRAND TOTAL) visually emphasized via bold text and merged/spanning label cells, with GRAND TOTAL given the strongest visual weight as the page's key takeaway figure.

---

### Page 14 — Project Execution Methodology (Part 1)

**Page Purpose:** Builds confidence in execution capability by visually documenting the construction process from site survey through cabling, using real project photographs.

**Layout Description:** Header banner "PROJECT EXECUTION METHODOLOGY:" with a bold underline accent. Below, two bordered photo-grid panels, each containing a 2-row × 3-column grid of captioned process photos connected by numbered sequence markers (1 through 12) and faint connecting guide lines indicating workflow order.

**Design Guidelines:** Numbered circular badges overlaid on/near each photo create an explicit step-sequence reading order, even though the grid layout itself doesn't read in simple left-to-right order (the sequence snakes through the grid, e.g., 1→2→3 top row, then 4→5→6 reading right-to-left on the bottom row of that panel, an S-curve/boustrophedon pattern).

**Content Sections:**
- Panel 1 — "Survey to Site leveling": Site Survey (1), Leveling of Site (2), Leveling & Grading (3), Auguring/Drilling holes for Foundation (6), Marking of Mounting Structure (5), Site After Leveling (4)
- Panel 2 — "Concreting of MMS to Erection of MMS, Module & Cabling": Column Post Installation (7), MMS Erection (8), Structure & PV Modules Alignment (9), DC Cable Termination/SMB-SCB Work (12), DC & AC Cable Laying (11), DC Cable Laying & Conduit Dressing (10)

**Dynamic Fields:** None.

**Static Fields:** All captions and panel sub-headers as listed above.

**Images/Graphics:** 12 real on-site construction process photographs, numbered circular sequence badges, connecting guide lines/brackets between sequential photos.

**Header/Footer:** Logo top-left; underlined section header banner.

**Typography & Spacing:** Photo captions in small bold caps or title-case text directly beneath each image; panel sub-headers in bold black text above each bordered photo grid.

---

### Page 15 — Project Execution Methodology (Part 2)

**Page Purpose:** Continuation of Page 14's execution methodology, covering electrical infrastructure and final testing/commissioning steps.

**Layout Description:** No repeated main header (continues directly from Page 14's visual language). Two bordered panels: first a 2-row mixed grid (3 photos top row, 1 photo + connecting line bottom) for "Transformer Yard to Transmission Line Erection" (steps 13–16), then a borderless 2×3 photo grid for "Testing to Commissioning" (unnumbered, six testing-related photos).

**Content Sections:**
- Panel 1 — "Transformer Yard to Transmission Line Erection": INV Transformer Yard (13), Control Room Construction (14), Cable Laying Work/Control Room (15), Transmission Line (16)
- Panel 2 — "Testing to Commissioning": 6 unnumbered photos showing meter/gauge readings, control panel inspection, clamp meter testing, and panel-side technical checks

**Dynamic Fields:** None.

**Static Fields:** Both panel sub-headers as listed above.

**Images/Graphics:** 4 numbered sequence photos (continuing the 13–16 numbering from Page 14's 1–12), 6 unnumbered testing/commissioning photos.

**Header/Footer:** Logo presence implied to continue from prior page; no new gradient banner on this page.

**Typography & Spacing:** Same caption and sub-header styling pattern as Page 14, for visual continuity across the two-page methodology spread.

---

### Page 16 — Our Projects (Portfolio Gallery)

**Page Purpose:** Provides concrete proof of delivered project scale and geographic spread to reinforce execution credibility.

**Layout Description:** Gradient background (yellow-green top to dark green bottom). Bold header "OUR PROJECTS" with a "150+ PROJECTS" sub-headline. Below, a 2×2 grid of large project photographs, each captioned with capacity and location.

**Content Sections:**
- "2MW JHIGANPUR" (solar panel rows close-up photo)
- "2MW KHURAI" (team photo on-site)
- "2MW Raisen" (substation/transmission structure photo)
- "6MW Guna" (panel rows at sunset/sunrise photo)

**Dynamic Fields:** None in current build. *(Future enhancement candidate: portfolio examples could be made dynamic if the company wants to rotate or update featured projects per quotation without a template rebuild — see Section 8.)*

**Static Fields:** "150+ PROJECTS" headline figure and all 4 captions as currently curated.

**Images/Graphics:** 4 large project photographs.

**Header/Footer:** Logo top-left, consistent placement.

**Typography & Spacing:** Bold large blue headline "OUR PROJECTS"; capacity figures in each caption rendered in a contrasting accent color against the location text for quick scanning (e.g., "2MW" in gold, "JHIGANPUR" in white).

---

### Page 17 — Company Contact / Closing Page

**Page Purpose:** Final page providing all formal contact, registration, and legal identification details — the page a client refers back to for follow-up communication and due diligence.

**Layout Description:** Gradient background (yellow-green top to dark green bottom). Centered text block listing company name (large, underlined), phone number, registered office address, secondary office (Dubai/UAE entity), legal registration numbers, email addresses, and website URLs, in descending visual hierarchy.

**Content Sections:**
- Company name: "ASA EPC PVT. LTD."
- Phone: "TELL NO.:+917554920666" *(typo in source: "TELL" should be "TEL")*
- Registered office: "OFFICE B-22,C SCTOR INDRAPURI NEAR SYANDICATE BANK BHEL BHOPAL, MADHYA PRADESH -INDIA" *(typos in source: "SCTOR" → "SECTOR", "SYANDICATE" → "SYNDICATE")*
- Secondary entity: "ASA PUMPS TRADING LLC, D-37 Al Bahri Warehouse, Dubai, United Arab Emirates"
- Legal IDs: "CIN:U31905MP2018PTC04527", "DPIIT No:DIPP19520", "MPPWD REG.No.:PWD180031492"
- Partnership note: "FRANCHISE PARTNER WAAREE SOLAR"
- Emails: "asa-epc.com" *(general)*, "asaepc@waareepartners.com", "ashutosh@asa-epc.com", "pushpraj@asa-epc.com"
- Websites: "http://www.asa-epc.com", "www.asasolar.in"

**Dynamic Fields:** None in current build (this is the company's own static contact record, not project-specific). *(Future enhancement: if this system is reused as a white-label product for other EPC companies, this entire page becomes the primary dynamic "company profile" page — see Section 8.)*

**Static Fields:** All contact and legal information as listed above.

**Images/Graphics:** Logo (larger size than other pages, used as a closing brand mark).

**Header/Footer:** Logo prominent and centered/top, larger than the small top-left logo treatment used on content pages — this page functions as a closing "business card" layout.

**Typography & Spacing:** Company name in large bold underlined gold/cream text; contact details in medium-weight white text, centered, with consistent vertical spacing between each information group (phone → address → secondary office → legal IDs → emails → websites).

---

## 4. Dynamic Content Mapping

### 4.1 Fields Populated from User Input (Admin Form)

| Section | Fields |
|---------|--------|
| Page 6 — Project Summary | location, plant_capacity, module_technology, area_required, mounting_structure_technology, finance_scheme, project_scheme, contact_person, offer_date |
| Page 7 — Specification Table | spec_table_capacity (title value), repeatable rows of {sr_no, item, specification} |
| Page 8 — Equipment & Vendors | repeatable rows of {sr_no, item, offered_makes} |
| Page 9 — Scope of Work | repeatable rows per sub-table of {sr_no, item/activity, responsibility checkboxes, remarks} |
| Page 10 — Project Schedule | repeatable rows of {sr_no, activity, timeline[6] booleans} |
| Page 11 — Warranty | repeatable rows of {sr_no, component, warranty_terms} |

> Page 4 and Page 13 contain project-specific values in the source document but are scoped as **static** for the current build (see Section 2.3). If reclassified as dynamic in a future phase, their fields would be: Page 4 — proposal_scheme_name, capacity_headline, client_name, site_address, site_city_state; Page 13 — repeatable commercial line items {sr_no, description, specification, tentative_quantity, per_watt_rate, unit_price} plus a gst_rate_percent input.

### 4.2 Fields That Are Calculated Automatically
- Page 13 (if/when made dynamic): `price` per line item = `tentative_quantity` × `unit_price` (or derived consistently from `per_watt_rate`, whichever the business defines as the source-of-truth calculation — this must be clarified with the client before implementation, since the source data shows both values present and internally consistent, implying one is derived from the other via total system wattage).
- Page 13 summary rows: `TOTAL.price` = sum of all line item prices; `GST.price` = `TOTAL.price` × `gst_rate_percent`; `GRAND_TOTAL.price` = `TOTAL.price` + `GST.price`. Same derivation applies to the "Per Watt" column values.
- Page 10: no calculated fields; the timeline grid is direct boolean input, not a calculation, though a future enhancement could auto-suggest a default timeline pattern based on total project capacity or duration.

### 4.3 Fields Generated by AI
None in the current system scope. All content is either fixed brand copy or direct user-entered project data. *(Potential future enhancement: an AI-assisted "first draft" suggestion for free-text fields like warranty_terms or specification text, pre-filled from a library of standard clauses, which the user then reviews and edits — this would be an optional convenience feature, not a default behavior, since technical/commercial content in an EPC quotation must remain fully user-controlled and auditable.)*

### 4.4 Validation Rules
- `offer_date` — must be a valid date; should default to the current date but remain editable.
- `plant_capacity`, `area_required` — numeric, positive values only.
- `tentative_quantity`, `unit_price`, `per_watt_rate` (Page 13, if dynamic) — numeric, non-negative; `unit_price` should not be zero for a line item unless explicitly marked as "included"/"not applicable".
- `gst_rate_percent` (Page 13, if dynamic) — numeric, 0–100 range; should not silently default to a hardcoded value like 18%, since the source example uses a non-standard blended rate (8.9%).
- Page 9 checkboxes — at minimum one of EPC/Owner (or Supply/E&C) should typically be checked per row, though the system should not hard-block submission if a row is intentionally left fully unmarked (e.g., a placeholder row pending confirmation).
- Page 10 timeline grid — no hard validation; any combination of filled/unfilled cells is valid, including a fully empty row (representing an activity not yet scheduled).
- Free-text fields (specification, warranty_terms, remarks) — no strict format validation; reasonable max-length limits should be applied to prevent layout overflow in the generated PDF (exact limits should be tuned empirically once the chosen PDF rendering library's text-wrapping behavior is tested against realistic content lengths).

### 4.5 Required vs Optional Fields

| Field Type | Required | Optional |
|---|---|---|
| Page 6 | location, plant_capacity, contact_person, offer_date | module_technology, area_required, mounting_structure_technology, finance_scheme, project_scheme (recommended but a quotation could omit one without breaking layout) |
| Page 7 | At least one specification row | spec_table_capacity title override (can default to Page 6's plant_capacity if left blank) |
| Page 8 | At least one equipment row | — |
| Page 9 | None strictly required; sub-tables can be left at default/empty state | remarks per row |
| Page 10 | activity name per row if a row exists | timeline cells (can be left blank if scheduling is undecided) |
| Page 11 | At least one warranty row | — |

---

## 5. PDF Generation Rules

### 5.1 Page Size
US Letter, matching the source PDF's native page dimensions (612 × 792 points, equivalent to 8.5" × 11"). Do not default to A4, since the source document was authored at US Letter dimensions and switching to A4 would alter the proportions of the gradient backgrounds and image placements relative to the original design.

### 5.2 Margins
Content should be edge-to-edge for full-bleed background gradient pages (Pages 1, 2, 3, 4, 5, 12, 16, 17), with no white margin border, matching the source design. For tabular content pages (6, 7, 8, 9, 10, 11, 13), maintain a consistent inner content margin (recommend ~0.4"–0.5" on left/right, ~0.3" top/bottom below the header banner) so table borders don't run to the literal page edge, matching the visual breathing room observed in the source.

### 5.3 Font Hierarchy
The source document uses a rounded, geometric sans-serif typeface family throughout (visually consistent with fonts like Poppins, Quicksand, or similar rounded-terminal sans-serifs) for headlines, and a more neutral sans-serif (visually consistent with something like Open Sans or similar) for body/table text. Recommended hierarchy for the rebuilt system:
- **Display/Headline** (page titles, "VISION"/"MISSION", cover headline): Bold, large size (28–40pt equivalent), rounded sans-serif.
- **Section headers** (table section titles, sub-headers): Bold, medium-large size (16–20pt equivalent).
- **Table headers**: Bold, medium size (11–13pt equivalent).
- **Body/table content**: Regular weight, small-medium size (9–11pt equivalent).
- **Captions/labels**: Regular or medium weight, small size (8–10pt equivalent).

### 5.4 Color Palette
- **Primary green gradient**: Yellow-green (approx. `#B5C400` to `#8CC63F` range) at the top transitioning to dark forest green (approx. `#0D2B1A` to `#1A3D24` range) at the bottom — used as full-page backgrounds on static brand pages.
- **Table header green**: Medium-bright green (approx. `#3CB54A`–`#43A047` range) — used for table header rows and section divider rows.
- **Table alternate row green**: Lighter green tint (approx. `#A8D8A0`–`#7FC97F` range) for alternating row shading.
- **Accent gold/cream**: Used for key headline emphasis text and badges (approx. `#F2D675`–`#E8C547` range).
- **Logo blue**: Brand blue from the ASA logo wordmark (approx. `#1E5AA8`–`#2563B0` range).
- **Text colors**: White/cream for text on dark green backgrounds; dark charcoal/black (approx. `#1A1A1A`–`#222222`) for text on white/light table cells.

### 5.5 Branding Rules
- The ASA EPC logo must appear on every page, consistently positioned top-left (except Page 17, where it is enlarged and more centrally/prominently placed as a closing brand mark).
- The green gradient theme must be visually consistent across all pages using it — no page should introduce an unrelated color scheme.
- Typos present in the original source content (e.g., "Succwssfully Commissiond", "Storoge", "Enorgy", "TELL NO.", "SCTOR", "SYANDICATE") are reproduced faithfully in this documentation per the exact-content requirement, but should be flagged to the client as candidates for correction in the live system, since they are clearly unintentional authoring errors rather than stylistic choices.

### 5.6 Image Handling
- Static brand/process photography (Pages 1, 3, 14, 15, 16) should be stored as fixed assets bundled with the static page templates, not re-uploaded per quotation.
- Logo and client/partner logo images (Page 12) should similarly be fixed assets.
- No dynamic page in the current scope requires user-uploaded images; if a future template adds an image-upload field (e.g., a project-specific site photo), it should be handled via object storage (e.g., Supabase Storage) with a reference URL/path stored in the corresponding `quotation_sections.data` JSON, not embedded as binary data in the database.

### 5.7 Table Styling
- Two distinct table visual patterns exist in the source and should both be supported as reusable style variants:
  1. **Shaded-row style** (Pages 6, 7, 8, 11): no/minimal grid lines, rows distinguished by alternating background color blocks.
  2. **Bordered-grid style** (Page 9): full black grid borders around every cell, with section title rows spanning full width in dark green.
- Column widths should be defined per-page as fixed proportional ratios (not auto-sized), to guarantee consistent layout regardless of content length — with text wrapping handled within cells rather than expanding column width.
- Page 13's table, being the widest (7 columns), requires the smallest font size among all tabular pages to fit content without overflow; this should be accounted for explicitly in the template rather than relying on auto-shrink behavior, since auto-shrink can produce inconsistent results across different PDF rendering libraries.

### 5.8 Page-Break Logic
- Each of the 17 pages is a fixed single page in the current scope — no page's content is expected to dynamically overflow into an additional page under normal data volumes.
- However, repeatable-row sections (Pages 7, 8, 9, 10, 11) have variable row counts depending on user input. The system must define a **maximum row count per page** for each of these sections (to be empirically determined based on the chosen rendering library's available vertical space after the fixed header banner), and either: (a) enforce a UI-level row limit matching that maximum, or (b) implement page-break/overflow logic that continues the table onto a visually consistent "continuation" page using the same header/footer treatment, if the business requires unlimited row counts. Recommendation: start with approach (a) for v1 simplicity, given the source document's row counts (max ~19 rows on Page 10) fit comfortably within a single page, and revisit (b) only if real usage shows users need more rows than the template can hold.

### 5.9 Footer Numbering Logic
The source document does not display visible page numbers on any page face. The rebuilt system should match this by default (no footer page-number text), preserving visual fidelity to the original. If the client later requests page numbers as a usability enhancement (e.g., for printed copies), this would be a small additive change — a footer text element showing "Page X of 17" — applied uniformly across all pages, not a structural redesign.

---

## 6. Theme & Design System

### 6.1 Overall Aesthetic
Premium, energy-sector corporate styling — confident, scaled-up numbers (employee counts, MW figures, years of experience) paired with a consistent green-and-gold palette evoking sustainability and growth. The diagonal photo compositions on brand pages (1, 3) convey dynamism rather than a static/conservative corporate feel, while the dense data tables (6–11, 13) convey technical rigor and transparency.

### 6.2 Layout Principles
- **Consistency over novelty per page-type**: All tabular data pages (6, 7, 8, 11) share the same shaded-row table pattern; Page 9 intentionally breaks this pattern with full borders to visually signal "this is a checklist/matrix, read it differently than the data tables around it."
- **Visual hierarchy via size + color, not just position**: Key trust metrics (employee count, MW figures, "200+" customers, Grand Total price) are always the largest or most color-contrasted element on their respective page, never buried in body text size.
- **Brand mark consistency**: Logo placement top-left is a structural anchor present on every page, giving the reader a constant visual reference point regardless of how dramatically the rest of the page layout changes between brand pages and data pages.

### 6.3 Readability Considerations
- Dark text on light table cells, light text on dark gradient backgrounds — contrast direction is always chosen for legibility, never decorative-only.
- Multi-line cells (Page 7 specifications, Page 11 warranty terms) use adequate line-height to avoid cramped text, since these cells often contain the most information-dense content in the document.

### 6.4 Suitability for Client Presentation
This design system is built to function both as a digital PDF sent via email and as a printed leave-behind document in a sales meeting — the full-bleed gradient pages and large-format photography on brand pages are specifically chosen to read well even at a glance or from across a table, while the dense tabular pages are intended for closer technical/financial review.

---

## 7. Content Extraction Summary

All page-by-page content (headings, subheadings, text blocks, tables, notes) has been fully captured in Section 3 above, organized per-page. No signature blocks, disclaimers, or attachment references are present in the source 17-page document — the document concludes at Page 17 with company contact and legal registration details, with no separate signature page, terms-and-conditions disclaimer page, or appendix/attachment section included in this version of the template. If a future revision of the source template adds a signature block or formal disclaimer page, it should be appended as Page 18 (or inserted at the appropriate position) and documented here using the same per-page format established in Section 3.

---

## 8. Scalability & Future Template Considerations

### 8.1 Reclassifying Page 4 and Page 13 as Dynamic
Both pages are structurally simple (Page 4 is five text fields; Page 13 is a repeatable line-item table, structurally identical in pattern to Pages 7/8/11). Converting either to a dynamic admin-panel section in a future phase requires no architectural change — only adding the corresponding form section and wiring it into the existing section-based data model described in the system's database schema (see the project's accompanying technical architecture documentation / master build prompt for schema details).

### 8.2 Supporting Additional Quotation Templates
The page-by-page structure documented here is specific to this ASA EPC template. To support a second template (different branding, different page set, or both) without rebuilding the system: each template should be registered with its own set of page-component definitions and its own dynamic-section schema, while reusing the same underlying admin-panel rendering engine and PDF-generation pipeline. A quotation record references which template it was built from, so historical quotations remain correctly tied to the template version used at the time of generation even if templates are later updated.

### 8.3 Versioning Static Content
Because static pages (1, 2, 3, 5, 12, 14, 15, 16, 17) contain company-level facts that do change over time (employee count, years of experience, project count, client logo roster), these should not be hardcoded as immutable — they should live in a lightly-editable "company profile" data set that an administrator can update periodically (e.g., once per quarter) without needing developer involvement, even though they are not exposed as per-quotation editable fields in the day-to-day admin workflow.

---

*End of design.md*