import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function ScheduleForm({ schedule, phaseLabels, onChange, onPhaseLabelsChange }) {
  const labels = phaseLabels || ['Phase 1 · 40 days', 'Phase 2 · 40 days', 'Phase 3 · 40 days'];

  const togglePhase = (rowIndex, phase, subIndex, value) => {
    const newSchedule = [...schedule];
    const row = { ...newSchedule[rowIndex] };
    row[phase] = [...row[phase]];
    row[phase][subIndex] = value;
    newSchedule[rowIndex] = row;
    onChange(newSchedule);
  };

  const updateActivity = (rowIndex, value) => {
    const newSchedule = [...schedule];
    newSchedule[rowIndex] = { ...newSchedule[rowIndex], activity: value };
    onChange(newSchedule);
  };

  const addRow = () => {
    onChange([...schedule, { activity: '', p1: [false, false], p2: [false, false], p3: [false, false] }]);
  };

  const removeRow = (index) => {
    onChange(schedule.filter((_, i) => i !== index));
  };

  const updateLabel = (i, value) => {
    if (!onPhaseLabelsChange) return;
    const updated = [...labels];
    updated[i] = value;
    onPhaseLabelsChange(updated);
  };

  return (
    <div className="section-card">
      <h2>Project Schedule (Gantt)</h2>

      {/* Phase label editors */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {labels.map((lbl, i) => (
          <div key={i} style={{ flex: '1', minWidth: '160px' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block', marginBottom: '2px' }}>
              Phase {i + 1} Label
            </label>
            <input
              className="form-control"
              value={lbl}
              onChange={(e) => updateLabel(i, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="dynamic-table">
          <thead>
            <tr>
              <th style={{ minWidth: '220px' }}>Activity</th>
              <th colSpan="2" style={{ textAlign: 'center' }}>{labels[0]}</th>
              <th colSpan="2" style={{ textAlign: 'center' }}>{labels[1]}</th>
              <th colSpan="2" style={{ textAlign: 'center' }}>{labels[2]}</th>
              <th style={{ width: '50px' }}>Del</th>
            </tr>
            <tr style={{ background: 'var(--bg)' }}>
              <th></th>
              <th style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-light)' }}>H1</th>
              <th style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-light)' }}>H2</th>
              <th style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-light)' }}>H1</th>
              <th style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-light)' }}>H2</th>
              <th style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-light)' }}>H1</th>
              <th style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-light)' }}>H2</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, i) => (
              <tr key={i}>
                <td>
                  <input
                    className="form-control"
                    value={row.activity}
                    onChange={(e) => updateActivity(i, e.target.value)}
                    placeholder="Activity name"
                  />
                </td>
                {[['p1', 0], ['p1', 1], ['p2', 0], ['p2', 1], ['p3', 0], ['p3', 1]].map(([phase, sub]) => (
                  <td key={`${phase}-${sub}`} style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={row[phase][sub] || false}
                      onChange={(e) => togglePhase(i, phase, sub, e.target.checked)}
                    />
                  </td>
                ))}
                <td>
                  <button className="btn btn-danger icon-btn" onClick={() => removeRow(i)}>
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-secondary" style={{ marginTop: '0.75rem' }} onClick={addRow}>
        <Plus size={16} /> Add Activity
      </button>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>
        Each phase has two half-columns (H1, H2). Check the boxes to represent activity bars.
      </p>
    </div>
  );
}
