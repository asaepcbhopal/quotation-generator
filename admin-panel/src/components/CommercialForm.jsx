import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function CommercialForm({ items, onChange }) {
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    let parsedValue = value;
    if (['qty', 'price', 'perWatt'].includes(field)) {
      parsedValue = parseFloat(value) || 0;
    }
    newItems[index] = { ...newItems[index], [field]: parsedValue };
    onChange(newItems);
  };

  const addItem = () => {
    onChange([...items, { desc: '', spec: '', unit: 'Nos.', qty: 1, perWatt: 0, price: 0 }]);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.qty || 0) * (item.price || 0), 0);
  const gst = subtotal * 0.089;
  const grandTotal = subtotal + gst;

  const fmt = (num) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(num);

  return (
    <div className="section-card">
      <h2>Commercial Offer</h2>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '1rem' }}>
        Amount = Qty × Unit Price. GST (8.9%) is auto-calculated.
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table className="dynamic-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Specification</th>
              <th>Qty</th>
              <th>Per Watt (₹)</th>
              <th>Unit Price (₹)</th>
              <th>Amount (₹)</th>
              <th style={{ width: '50px' }}>Del</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>
                  <input
                    className="form-control"
                    value={item.desc}
                    onChange={(e) => handleItemChange(i, 'desc', e.target.value)}
                    placeholder="Item name"
                  />
                </td>
                <td>
                  <input
                    className="form-control"
                    value={item.spec || ''}
                    onChange={(e) => handleItemChange(i, 'spec', e.target.value)}
                    placeholder="e.g. 620 Wp Future"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.qty}
                    onChange={(e) => handleItemChange(i, 'qty', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.perWatt || 0}
                    onChange={(e) => handleItemChange(i, 'perWatt', e.target.value)}
                    step="0.01"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.price}
                    onChange={(e) => handleItemChange(i, 'price', e.target.value)}
                  />
                </td>
                <td>
                  <strong>{fmt((item.qty || 0) * (item.price || 0))}</strong>
                </td>
                <td>
                  <button onClick={() => removeItem(i)} className="btn btn-danger icon-btn">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addItem} className="btn btn-secondary" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
        <Plus size={16} /> Add Item
      </button>

      <div className="summary-card" style={{ maxWidth: '420px', marginLeft: 'auto' }}>
        <h3>Calculated Totals</h3>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{fmt(subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>GST (8.9%)</span>
          <span>{fmt(gst)}</span>
        </div>
        <div className="summary-row summary-total">
          <span>Grand Total</span>
          <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{fmt(grandTotal)}</span>
        </div>
      </div>
    </div>
  );
}
