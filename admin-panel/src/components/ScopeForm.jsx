import React from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Edits the array of scope sub-blocks.
 * Each block has: title, col1Label, col2Label, col3Label, rows[]
 * Each row has: activity, c2 (bool), c3 (bool)
 */
export default function ScopeForm({ scopeBlocks, onChange }) {
  const updateBlock = (bi, field, value) => {
    const updated = [...scopeBlocks];
    updated[bi] = { ...updated[bi], [field]: value };
    onChange(updated);
  };

  const updateRow = (bi, ri, field, value) => {
    const updated = [...scopeBlocks];
    const rows = [...updated[bi].rows];
    rows[ri] = { ...rows[ri], [field]: value };
    updated[bi] = { ...updated[bi], rows };
    onChange(updated);
  };

  const addRow = (bi) => {
    const updated = [...scopeBlocks];
    updated[bi] = {
      ...updated[bi],
      rows: [...updated[bi].rows, { activity: '', c2: false, c3: false }],
    };
    onChange(updated);
  };

  const removeRow = (bi, ri) => {
    const updated = [...scopeBlocks];
    updated[bi] = {
      ...updated[bi],
      rows: updated[bi].rows.filter((_, i) => i !== ri),
    };
    onChange(updated);
  };

  const addBlock = () => {
    onChange([
      ...scopeBlocks,
      { title: 'New Category', col1Label: 'Item', col2Label: 'EPC', col3Label: 'Owner', rows: [] },
    ]);
  };

  const removeBlock = (bi) => {
    onChange(scopeBlocks.filter((_, i) => i !== bi));
  };

  return (
    <div className="section-card">
      <h2>Scope of Work</h2>
      {scopeBlocks.map((block, bi) => (
        <div
          key={bi}
          style={{
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          {/* Block header row */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <input
              className="form-control"
              value={block.title}
              onChange={(e) => updateBlock(bi, 'title', e.target.value)}
              placeholder="Block title (e.g. DC Side)"
              style={{ flex: '1', minWidth: '140px', fontWeight: 600 }}
            />
            <input
              className="form-control"
              value={block.col1Label}
              onChange={(e) => updateBlock(bi, 'col1Label', e.target.value)}
              placeholder="Col 1 header"
              style={{ flex: '1', minWidth: '100px' }}
            />
            <input
              className="form-control"
              value={block.col2Label}
              onChange={(e) => updateBlock(bi, 'col2Label', e.target.value)}
              placeholder="Col 2 header"
              style={{ width: '80px' }}
            />
            <input
              className="form-control"
              value={block.col3Label}
              onChange={(e) => updateBlock(bi, 'col3Label', e.target.value)}
              placeholder="Col 3 header"
              style={{ width: '80px' }}
            />
            <button
              className="btn btn-danger icon-btn"
              onClick={() => removeBlock(bi)}
              title="Remove block"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Rows */}
          <div style={{ overflowX: 'auto' }}>
            <table className="dynamic-table" style={{ marginBottom: '0.75rem' }}>
              <thead>
                <tr>
                  <th>{block.col1Label}</th>
                  <th style={{ textAlign: 'center', width: '80px' }}>{block.col2Label}</th>
                  <th style={{ textAlign: 'center', width: '80px' }}>{block.col3Label}</th>
                  <th style={{ width: '50px' }}>Del</th>
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri}>
                    <td>
                      <input
                        className="form-control"
                        value={row.activity}
                        onChange={(e) => updateRow(bi, ri, 'activity', e.target.value)}
                        placeholder="Activity / item"
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={row.c2 || false}
                        onChange={(e) => updateRow(bi, ri, 'c2', e.target.checked)}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={row.c3 || false}
                        onChange={(e) => updateRow(bi, ri, 'c3', e.target.checked)}
                      />
                    </td>
                    <td>
                      <button className="btn btn-danger icon-btn" onClick={() => removeRow(bi, ri)}>
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-secondary" style={{ fontSize: '0.8rem' }} onClick={() => addRow(bi)}>
            <Plus size={14} /> Add Row
          </button>
        </div>
      ))}

      <button className="btn btn-secondary" onClick={addBlock}>
        <Plus size={16} /> Add Scope Block
      </button>
    </div>
  );
}
