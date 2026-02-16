import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Platforms from './pages/Platforms';
import InvestorPortal from './pages/InvestorPortal';
import About from './pages/About';
import Contact from './pages/Contact';
import PasswordAdmin from './pages/PasswordAdmin';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/investor-portal" element={<InvestorPortal />} />
            <Route path="/password-admin" element={<PasswordAdmin />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
