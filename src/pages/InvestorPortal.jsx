import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, FileText, Presentation, DollarSign, Mail } from 'lucide-react';
import { platforms } from '../data/platforms';
import './InvestorPortal.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const InvestorPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if already authenticated (stored in sessionStorage)
  useEffect(() => {
    const authStatus = sessionStorage.getItem('investorAuth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/verify-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('investorAuth', 'authenticated');
        setPassword('');
      } else {
        setError(data.message || 'Incorrect password. Please try again.');
        setPassword('');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
      setError('Unable to connect to server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('investorAuth');
    setPassword('');
    setError('');
  };

  if (!isAuthenticated) {
    return (
      <div className="investor-portal-page">
        <section className="investor-login-section">
          <div className="hero-background">
            <div className="gradient-orb orb-1"></div>
            <div className="gradient-orb orb-2"></div>
          </div>
          <div className="container">
            <motion.div
              className="login-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="login-title">INVESTOR PORTAL</h1>
              <p className="login-subtitle">
                This portal provides access to confidential materials for RL AI Media Group and its operating companies.
              </p>
              <div className="confidential-notice">
                <div className="notice-header">
                  <Lock size={20} className="notice-icon" />
                  <p>Confidential Notice</p>
                </div>
                <p>Materials are proprietary and intended for qualified investors only.</p>
              </div>
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Enter Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    className={`form-input ${error ? 'error' : ''}`}
                    placeholder="Password"
                    required
                    autoFocus
                    disabled={isLoading}
                  />
                  {error && <p className="error-message">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="login-button"
                  disabled={isLoading || !password.trim()}
                >
                  {isLoading ? 'Verifying...' : 'Access Portal'}
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <main id="main" className="investor-portal-page">
      {/* Hero Section */}
      <section className="investor-hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
        </div>
        <motion.div
          className="investor-hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Investor Portal</h1>
          <p className="hero-subtitle">
            Confidential access to business plans, financials, and strategic materials for RL AI Media Group and its operating companies.
          </p>
          <div className="confidential-badge">
            <Lock size={18} className="badge-icon" />
            <span className="badge-text">Confidential Materials – Qualified Investors Only</span>
          </div>
          <button onClick={handleLogout} className="logout-button-hero" aria-label="Logout">
            Logout
          </button>
        </motion.div>
      </section>

      {/* Platform Access Grid */}
      <section className="platform-materials">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Platform Materials</h2>
            <div className="accent-line" />
            <p className="section-intro">
              Select a platform below to access business plans, pitch decks, financial models, and strategic documents.
            </p>
          </motion.div>

          <div className="platform-grid">
            {platforms.map((platform, i) => (
              <motion.div
                key={platform.id}
                className="platform-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div className="platform-card-header">
                  <img src={platform.logo} alt={`${platform.name} logo`} className="platform-logo" />
                  <h3>{platform.name}</h3>
                </div>
                <p className="platform-description">{platform.description}</p>
                <div className="platform-materials-list">
                  <div className="material-item">
                    <FileText size={18} className="material-icon" />
                    <span>Business Plan</span>
                  </div>
                  <div className="material-item">
                    <Presentation size={18} className="material-icon" />
                    <span>Pitch Deck</span>
                  </div>
                  <div className="material-item">
                    <DollarSign size={18} className="material-icon" />
                    <span>Financial Models</span>
                  </div>
                </div>
                <a
                  href={platform.dropboxLink || '#'}
                  className="view-materials-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!platform.dropboxLink || platform.dropboxLink === '#') {
                      e.preventDefault();
                      alert('Dropbox link will be configured for ' + platform.name);
                    }
                  }}
                >
                  View Materials →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="investor-support">
        <div className="section-container">
          <motion.div
            className="support-box"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3>Need Assistance?</h3>
            <p>
              For access issues, additional materials, or to schedule an investor meeting, please contact our investor relations team.
            </p>
            <div className="support-contact">
              <Mail size={20} className="support-icon" />
              <a href="mailto:investors@rlaimediagroup.com">investors@rlaimediagroup.com</a>
            </div>
            <p className="support-note">We typically respond within 24 business hours.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default InvestorPortal;

