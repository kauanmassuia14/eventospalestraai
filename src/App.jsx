import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CinematicBackground from './components/CinematicBackground';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

// Simple ScrollToTop component to ensure pages start at top
const ScrollToTopWrapper = () => {
  return <ScrollToTop />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App relative bg-black min-h-screen">
        <CinematicBackground />
        <Header />

        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Carregando...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/termos" element={<TermsOfUse />} />
            <Route path="/privacidade" element={<PrivacyPolicy />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
