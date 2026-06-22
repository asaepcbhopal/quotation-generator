import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function DynamicTable({ title, columns, data, onChange }) {
  const handleItemChange = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  const addItem = () => {
    const newItem = {};
    columns.forEach(c => newItem[c.key] = c.type === 'checkbox' ? false : '');
    onChange([...data, newItem]);
  };

  const removeItem = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="section-card">
      <h2>{title}</h2>
      <div style={{overflowX: 'auto'}}>
        <table className="dynamic-table">
          <thead>
            <tr>
              {columns.map(c => <th key={c.key}>{c.label}</th>)}
              <th style={{width: '60px'}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {columns.map(c => (
                  <td key={c.key}>
                    {c.type === 'checkbox' ? (
                      <label className="checkbox-label">
                        <input type="checkbox" checked={row[c.key] || false} onChange={e => handleItemChange(i, c.key, e.target.checked)} />
                        Yes
                      </label>
                    ) : (
                      <input className="form-control" value={row[c.key] || ''} onChange={e => handleItemChange(i, c.key, e.target.value)} />
                    )}
                  </td>
                ))}
                <td>
                  <button onClick={() => removeItem(i)} className="btn btn-danger icon-btn"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addItem} className="btn btn-secondary"><Plus size={16}/> Add Row</button>
    </div>
  );
}
