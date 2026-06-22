import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabase';
import { FileText, Plus, Trash2 } from 'lucide-react';

function Dashboard() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotations();
  }, []);

  async function fetchQuotations() {
    try {
      const { data, error } = await supabase
        .from('quotations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setQuotations(data || []);
    } catch (error) {
      console.error('Error fetching quotations:', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteQuotation(id) {
    if (!window.confirm('Are you sure you want to delete this quotation?')) return;
    try {
      const { error } = await supabase.from('quotations').delete().eq('id', id);
      if (error) throw error;
      fetchQuotations();
    } catch (error) {
      console.error('Error deleting:', error.message);
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>ASA EPC Admin Panel</h1>
        <Link to="/edit" className="btn btn-primary">
          <Plus size={18} /> New Quotation
        </Link>
      </header>
      
      {loading ? (
        <p>Loading...</p>
      ) : quotations.length === 0 ? (
        <div className="empty-state">
          <FileText size={48} className="empty-icon" />
          <h2>No quotations found</h2>
          <p>Create your first quotation to get started.</p>
        </div>
      ) : (
        <div className="card-grid">
          {quotations.map(q => (
            <div key={q.id} className="card">
              <h3>{q.title}</h3>
              <p><strong>Client:</strong> {q.client_name}</p>
              <p><strong>Date:</strong> {q.project_date}</p>
              <p><strong>Location:</strong> {q.location}</p>
              <div className="card-actions">
                <Link to={`/edit/${q.id}`} className="btn btn-secondary">Edit</Link>
                <button onClick={() => deleteQuotation(q.id)} className="btn btn-danger icon-btn">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
