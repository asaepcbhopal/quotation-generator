import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabase';
import { FileText, Plus, Trash2, Search, Calendar, MapPin, User, FileBarChart } from 'lucide-react';

function Dashboard() {
  const [quotations, setQuotations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredQuotations = useMemo(() => {
    return quotations.filter(q => 
      q.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [quotations, searchQuery]);

  return (
    <div className="container">
      <header className="dashboard-header">
        <div>
          <h1>Quotation Generator</h1>
          <p className="subtitle">Manage and generate professional proposals</p>
        </div>
        <Link to="/edit" className="btn btn-primary btn-lg">
          <Plus size={20} /> Create New Quotation
        </Link>
      </header>

      <div className="dashboard-stats-bar">
        <div className="stat-card">
          <div className="stat-icon"><FileBarChart size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Total Quotations</span>
            <span className="stat-value">{quotations.length}</span>
          </div>
        </div>
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by client or title..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : quotations.length === 0 ? (
        <div className="empty-state">
          <FileText size={48} className="empty-icon" />
          <h2>No quotations found</h2>
          <p>Create your first quotation to get started.</p>
        </div>
      ) : filteredQuotations.length === 0 ? (
        <div className="empty-state">
          <Search size={48} className="empty-icon" />
          <h2>No matching quotations found</h2>
          <p>Try adjusting your search query.</p>
        </div>
      ) : (
        <div className="card-grid">
          {filteredQuotations.map(q => (
            <div key={q.id} className="card quotation-card">
              <div className="card-header">
                <h3>{q.title || "Untitled Proposal"}</h3>
                <span className="date-badge">{new Date(q.created_at).toLocaleDateString()}</span>
              </div>
              <div className="card-body">
                <p><User size={16} className="card-icon" /> <strong>{q.client_name || "Unknown Client"}</strong></p>
                <p><Calendar size={16} className="card-icon" /> {q.project_date || "No date set"}</p>
                <p><MapPin size={16} className="card-icon" /> {q.location || "No location"}</p>
              </div>
              <div className="card-actions">
                <Link to={`/edit/${q.id}`} className="btn btn-secondary">Open Editor</Link>
                <button onClick={() => deleteQuotation(q.id)} className="btn btn-danger icon-btn" title="Delete Quotation">
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
