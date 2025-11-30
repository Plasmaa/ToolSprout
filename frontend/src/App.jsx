import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import InvoiceGenerator from './pages/InvoiceGenerator';
import CertificateGenerator from './pages/CertificateGenerator';
import About from './pages/About';
import ComingSoon from './pages/ComingSoon';
import ScrollToTop from './components/ScrollToTop';

import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/invoice" element={<InvoiceGenerator />} />
          <Route path="/certificate" element={<CertificateGenerator />} />
          <Route path="/contract" element={<ComingSoon title="Contract Maker" />} />
          <Route path="/salary-slip" element={<ComingSoon title="Salary Slip Generator" />} />
          <Route path="/privacy-policy" element={<ComingSoon title="Privacy Policy Generator" />} />
          <Route path="/schedule" element={<ComingSoon title="Daily Schedule Planner" />} />
          <Route path="/homework" element={<ComingSoon title="Homework Planner" />} />
          <Route path="/rental" element={<ComingSoon title="Rental Agreement" />} />
          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
