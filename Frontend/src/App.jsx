import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ScannerPage from './pages/ScannerPage';
import HistoryPage from './pages/HistoryPage';
import GuidePage from './pages/GuidePage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
        
        {/* Top Navbar */}
        <Navbar />

        {/* Main Content Viewport */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scan" element={<ScannerPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/guide" element={<GuidePage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </Router>
  );
}
