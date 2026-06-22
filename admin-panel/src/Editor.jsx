import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from './supabase';
import { defaultState } from './utils/defaultData';
import { generateHtml } from './utils/generateHtml';
import DynamicTable from './components/DynamicTable';
import CommercialForm from './components/CommercialForm';
import ScheduleForm from './components/ScheduleForm';
import ScopeForm from './components/ScopeForm';
import { Save, Download, ArrowLeft, RefreshCw, Link2, Link2Off } from 'lucide-react';
import logoUrl from './assets/asa-epc-logo.png';

// ── Converts an image URL to a base64 data URL (embeds it in exported HTML) ──
async function toBase64DataUrl(url) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch {
    return ''; // graceful fallback — export works without logo
  }
}

// ── Auto-generation templates ──────────────────────────────────────────────────

const generateEyebrow = ({ scheme }) =>
  `Open Access · ${scheme || 'KUSUM'} Solar Proposal`;

const generateHeroSub = ({ clientName, location, scheme }) =>
  `A techno-commercial offer prepared for ${clientName || '[Client]'} — ${location || '[Location]'}, built on nine years of solar EPC delivery and a Waaree Energy partnership.`;

// Syncs derived summary rows from master fields
function syncSummaryFromMaster(summary, { location, scheme, projectDate }) {
  const syncRow = (arr, key, value) =>
    arr.map((r) => (r.k.toLowerCase() === key ? { ...r, v: value } : r));

  return {
    siteSystem: syncRow(summary.siteSystem, 'location', location),
    schemeContact: syncRow(
      syncRow(
        syncRow(summary.schemeContact, 'project scheme', scheme ? `PM-${scheme}` : ''),
        'offer date',
        projectDate
      ),
      'developer contact',
      summary.schemeContact.find((r) => r.k.toLowerCase() === 'developer contact')?.v || ''
    ),
  };
}

// ──────────────────────────────────────────────────────────────────────────────

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Override flags — when true, field is manually controlled (not auto-generated)
  const [overrides, setOverrides] = useState({ eyebrow: false, heroSub: false });

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  async function loadData() {
    setLoading(true);
    try {
      const { data: qData, error } = await supabase
        .from('quotations')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      if (qData?.data) {
        // Deep-merge with defaultState so new fields don't crash on old saved data
        setData((prev) => ({
          ...defaultState,
          ...qData.data,
          summary: {
            ...defaultState.summary,
            ...(qData.data.summary || {}),
          },
        }));
      }
    } catch (err) {
      console.error('Error loading:', err.message);
      alert('Could not load quotation. Starting with default template.');
    } finally {
      setLoading(false);
    }
  }

  // Generic top-level field updater
  const set = (field, value) => setData((prev) => ({ ...prev, [field]: value }));
  const setNested = (parent, field, value) =>
    setData((prev) => ({ ...prev, [parent]: { ...prev[parent], [field]: value } }));

  // ── Auto-derive eyebrow & heroSub when master fields change ──────────────
  useEffect(() => {
    if (!overrides.eyebrow) {
      setData((prev) => ({ ...prev, eyebrow: generateEyebrow(prev) }));
    }
  }, [data.scheme, overrides.eyebrow]);

  useEffect(() => {
    if (!overrides.heroSub) {
      setData((prev) => ({
        ...prev,
        heroSub: generateHeroSub(prev),
      }));
    }
  }, [data.clientName, data.location, data.scheme, overrides.heroSub]);

  // ── Auto-sync summary card rows from master fields ────────────────────────
  useEffect(() => {
    setData((prev) => {
      const synced = syncSummaryFromMaster(prev.summary, {
        location: prev.location,
        scheme: prev.scheme,
        projectDate: prev.projectDate,
      });
      return { ...prev, summary: synced };
    });
  }, [data.location, data.scheme, data.projectDate]);

  // Toggle override for a derived field
  const toggleOverride = (field) => {
    setOverrides((prev) => {
      const nowOverriding = !prev[field];
      if (!nowOverriding) {
        // Re-generate when unlinking
        if (field === 'eyebrow') set('eyebrow', generateEyebrow(data));
        if (field === 'heroSub') set('heroSub', generateHeroSub(data));
      }
      return { ...prev, [field]: nowOverriding };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        title: data.title,
        client_name: data.clientName,
        location: data.location,
        project_date: data.projectDate,
        scheme: data.scheme,
        data: data,
      };
      if (id) {
        const { error } = await supabase.from('quotations').update(payload).eq('id', id);
        if (error) throw error;
        alert('Saved successfully!');
      } else {
        const { data: newQ, error } = await supabase
          .from('quotations')
          .insert([payload])
          .select()
          .single();
        if (error) throw error;
        alert('Created successfully!');
        navigate(`/edit/${newQ.id}`);
      }
    } catch (err) {
      console.error('Error saving:', err.message);
      alert('Error saving: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    // Convert logo to base64 so the exported file is fully self-contained
    const logoBase64 = await toBase64DataUrl(logoUrl);
    const htmlString = generateHtml(data, logoBase64);
    const blob = new Blob([htmlString], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Quotation_${data.clientName.replace(/\s+/g, '_')}_${data.projectDate.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading)
    return (
      <div className="container">
        <p style={{ padding: '2rem' }}>Loading quotation…</p>
      </div>
    );

  return (
    <div className="container">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/" className="btn btn-secondary icon-btn">
            <ArrowLeft size={18} />
          </Link>
          <h1 style={{ margin: 0 }}>Quotation Editor</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleSave} disabled={saving} className="btn btn-primary">
            <Save size={18} /> {saving ? 'Saving…' : 'Save'}
          </button>
          <button onClick={handleExport} className="btn btn-secondary">
            <Download size={18} /> Export HTML
          </button>
        </div>
      </header>

      <div className="editor-layout">
        <div className="main-content">

          {/* ════════════════════════════════════════════════
              HERO / PROPOSAL HEADER — MASTER FIELDS
              These drive all derived/auto-generated text
          ════════════════════════════════════════════════ */}
          <div className="section-card">
            <h2>Proposal Core Details</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '1.25rem' }}>
              Fill these in first — the hero description, eyebrow, and summary card values will update automatically.
            </p>

            <div className="form-row">
              <div className="form-group">
                <label>Client Name <span className="auto-badge">→ auto-fills description</span></label>
                <input
                  className="form-control"
                  value={data.clientName}
                  onChange={(e) => set('clientName', e.target.value)}
                  placeholder="e.g. D K Builders"
                />
              </div>
              <div className="form-group">
                <label>Site / Location <span className="auto-badge">→ auto-fills description &amp; summary</span></label>
                <input
                  className="form-control"
                  value={data.location}
                  onChange={(e) => set('location', e.target.value)}
                  placeholder="e.g. Bawadiya Kala, Bhopal, MP"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Offer Date <span className="auto-badge">→ auto-fills summary card</span></label>
                <input
                  className="form-control"
                  value={data.projectDate}
                  onChange={(e) => set('projectDate', e.target.value)}
                  placeholder="e.g. 06 April 2027"
                />
              </div>
              <div className="form-group">
                <label>Scheme <span className="auto-badge">→ auto-fills eyebrow &amp; summary</span></label>
                <input
                  className="form-control"
                  value={data.scheme}
                  onChange={(e) => set('scheme', e.target.value)}
                  placeholder="e.g. KUSUM"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Project Title (H1 heading)</label>
              <textarea
                className="form-control"
                value={data.title}
                onChange={(e) => set('title', e.target.value)}
                rows={2}
                placeholder="e.g. 12,500 KWp DC Grid-Connected Ground Mount Turnkey Solar Project"
              />
            </div>

            {/* ── Derived: Eyebrow ── */}
            <div className="form-group">
              <label>
                Eyebrow Text
                {!overrides.eyebrow && <span className="auto-badge linked">🔗 Auto from Scheme</span>}
                <button
                  className="btn-link override-toggle"
                  onClick={() => toggleOverride('eyebrow')}
                  title={overrides.eyebrow ? 'Re-link to auto' : 'Override manually'}
                >
                  {overrides.eyebrow ? <><Link2Off size={13} /> Unlink</> : <><Link2 size={13} /> Override</>}
                </button>
              </label>
              <input
                className={`form-control ${!overrides.eyebrow ? 'derived-field' : ''}`}
                value={data.eyebrow}
                onChange={(e) => set('eyebrow', e.target.value)}
                readOnly={!overrides.eyebrow}
                title={!overrides.eyebrow ? 'Click Override to edit manually' : ''}
              />
            </div>

            {/* ── Derived: Hero Sub Description ── */}
            <div className="form-group">
              <label>
                Hero Sub-Description
                {!overrides.heroSub && (
                  <span className="auto-badge linked">🔗 Auto from Client · Location · Scheme</span>
                )}
                <button
                  className="btn-link override-toggle"
                  onClick={() => toggleOverride('heroSub')}
                  title={overrides.heroSub ? 'Re-link to auto' : 'Override manually'}
                >
                  {overrides.heroSub ? <><Link2Off size={13} /> Re-link</> : <><Link2 size={13} /> Override</>}
                </button>
              </label>
              <textarea
                className={`form-control ${!overrides.heroSub ? 'derived-field' : ''}`}
                value={data.heroSub}
                onChange={(e) => set('heroSub', e.target.value)}
                readOnly={!overrides.heroSub}
                rows={3}
                title={!overrides.heroSub ? 'Click Override to edit manually' : ''}
              />
            </div>
          </div>

          {/* ── ABOUT ASA EPC (FIXED) ── */}
          <div className="section-card fixed-notice">
            <h2>About ASA EPC <span className="fixed-badge">Fixed</span></h2>
            <p>Company description, DPIIT recognition, Waaree partnership, E·P·C·A pillars — included verbatim in every export.</p>
          </div>

          {/* ── PROJECT SUMMARY ── */}
          <div className="section-card">
            <h2>Project Summary Cards</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '1rem' }}>
              <span className="auto-badge linked">🔗</span> Location, Offer Date &amp; Project Scheme sync automatically from the core details above. Edit other rows freely.
            </p>

            <label style={{ fontWeight: 600, fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
              Site &amp; System
            </label>
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table className="dynamic-table">
                <thead>
                  <tr>
                    <th>Label</th>
                    <th>Value</th>
                    <th style={{ width: '50px' }}>Del</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.summary?.siteSystem || []).map((row, i) => {
                    const isAutoSynced = row.k.toLowerCase() === 'location';
                    return (
                      <tr key={i} className={isAutoSynced ? 'synced-row' : ''}>
                        <td>
                          <input
                            className="form-control"
                            value={row.k}
                            onChange={(e) => {
                              const arr = [...data.summary.siteSystem];
                              arr[i] = { ...arr[i], k: e.target.value };
                              setNested('summary', 'siteSystem', arr);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            className={`form-control${isAutoSynced ? ' derived-field' : ''}`}
                            value={row.v}
                            readOnly={isAutoSynced}
                            title={isAutoSynced ? 'Synced from Location field above' : ''}
                            onChange={(e) => {
                              if (isAutoSynced) return;
                              const arr = [...data.summary.siteSystem];
                              arr[i] = { ...arr[i], v: e.target.value };
                              setNested('summary', 'siteSystem', arr);
                            }}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-danger icon-btn"
                            onClick={() =>
                              setNested(
                                'summary',
                                'siteSystem',
                                (data.summary?.siteSystem || []).filter((_, j) => j !== i)
                              )
                            }
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-secondary"
              style={{ marginBottom: '1.5rem' }}
              onClick={() =>
                setNested('summary', 'siteSystem', [...(data.summary?.siteSystem || []), { k: '', v: '' }])
              }
            >
              + Add Row
            </button>

            <label style={{ fontWeight: 600, fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
              Scheme &amp; Contact
            </label>
            <div style={{ overflowX: 'auto' }}>
              <table className="dynamic-table">
                <thead>
                  <tr>
                    <th>Label</th>
                    <th>Value</th>
                    <th style={{ width: '50px' }}>Del</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.summary?.schemeContact || []).map((row, i) => {
                    const kl = row.k.toLowerCase();
                    const isAutoSynced =
                      kl === 'project scheme' || kl === 'offer date';
                    return (
                      <tr key={i} className={isAutoSynced ? 'synced-row' : ''}>
                        <td>
                          <input
                            className="form-control"
                            value={row.k}
                            onChange={(e) => {
                              const arr = [...(data.summary?.schemeContact || [])];
                              arr[i] = { ...arr[i], k: e.target.value };
                              setNested('summary', 'schemeContact', arr);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            className={`form-control${isAutoSynced ? ' derived-field' : ''}`}
                            value={row.v}
                            readOnly={isAutoSynced}
                            title={isAutoSynced ? 'Synced from Scheme / Date above' : ''}
                            onChange={(e) => {
                              if (isAutoSynced) return;
                              const arr = [...(data.summary?.schemeContact || [])];
                              arr[i] = { ...arr[i], v: e.target.value };
                              setNested('summary', 'schemeContact', arr);
                            }}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-danger icon-btn"
                            onClick={() =>
                              setNested(
                                'summary',
                                'schemeContact',
                                (data.summary?.schemeContact || []).filter((_, j) => j !== i)
                              )
                            }
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-secondary"
              style={{ marginTop: '0.75rem' }}
              onClick={() =>
                setNested('summary', 'schemeContact', [
                  ...(data.summary?.schemeContact || []),
                  { k: '', v: '' },
                ])
              }
            >
              + Add Row
            </button>
          </div>

          {/* ── TECHNICAL SPECIFICATIONS ── */}
          <DynamicTable
            title="Technical Specifications"
            columns={[{ key: 'item', label: 'Item' }, { key: 'spec', label: 'Specification' }]}
            data={data.specs}
            onChange={(v) => set('specs', v)}
          />

          {/* ── EQUIPMENT & VENDORS ── */}
          <DynamicTable
            title="Equipment & Vendors"
            columns={[{ key: 'item', label: 'Item' }, { key: 'make', label: 'Offered Makes' }]}
            data={data.vendors}
            onChange={(v) => set('vendors', v)}
          />

          {/* ── SCOPE OF WORK ── */}
          <ScopeForm scopeBlocks={data.scopeBlocks} onChange={(v) => set('scopeBlocks', v)} />

          {/* ── PROJECT SCHEDULE ── */}
          <div className="section-card" style={{ paddingBottom: '0.5rem', marginBottom: 0, borderRadius: '12px 12px 0 0' }}>
            <div className="form-row">
              <div className="form-group">
                <label>Schedule Section Heading</label>
                <input
                  className="form-control"
                  value={data.scheduleTitle}
                  onChange={(e) => set('scheduleTitle', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Schedule Subtitle</label>
                <input
                  className="form-control"
                  value={data.scheduleSubtitle}
                  onChange={(e) => set('scheduleSubtitle', e.target.value)}
                />
              </div>
            </div>
          </div>
          <ScheduleForm
            schedule={data.schedule}
            phaseLabels={data.phaseLabels}
            onChange={(v) => set('schedule', v)}
            onPhaseLabelsChange={(v) => set('phaseLabels', v)}
          />

          {/* ── WARRANTY (FIXED) ── */}
          <div className="section-card fixed-notice">
            <h2>Warranty <span className="fixed-badge">Fixed</span></h2>
            <p>Solar Modules (30 yrs), Inverter (5+25 yrs), Mounting Structure (25 yrs), Other BOS (As per OEM).</p>
          </div>

          {/* ── COMMERCIAL ── */}
          <CommercialForm
            items={data.commercialItems}
            onChange={(v) => set('commercialItems', v)}
          />

          {/* ── EXECUTION METHODOLOGY + TRACK RECORD (FIXED) ── */}
          <div className="section-card fixed-notice">
            <h2>Execution Methodology &amp; Track Record <span className="fixed-badge">Fixed</span></h2>
            <p>5-step delivery process + client list (Bajaj, L&amp;T, Shyam Steel…) + project cards (2 MW Jhiganpur, etc.) — included verbatim in every export.</p>
          </div>

        </div>

        {/* ── SIDEBAR ── */}
        <div className="sidebar">
          <div
            className="sticky-sidebar section-card"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>Quick Actions</h3>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: '0.5rem' }}
            >
              <Save size={18} /> {saving ? 'Saving…' : 'Save to Database'}
            </button>
            <button onClick={handleExport} className="btn btn-secondary" style={{ width: '100%' }}>
              <Download size={18} /> Export HTML
            </button>
            <hr style={{ borderColor: 'var(--border)', margin: '1rem 0' }} />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', lineHeight: 1.7 }}>
              <p style={{ margin: '0 0 0.5rem' }}>
                <span className="auto-badge linked">🔗 Linked</span> fields update automatically.
              </p>
              <p style={{ margin: '0 0 0.5rem' }}>
                Click <strong>Override</strong> to edit a linked field manually.
              </p>
              <p style={{ margin: '0' }}>
                <strong>Export HTML</strong> = self-contained file the client opens in any browser &amp; prints to PDF.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
