import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { WhatWeDoSecret } from './pages/WhatWeDoSecret';
import { OurValues } from './pages/OurValues';
import { Leadership } from './pages/Leadership';
import { Perspectives } from './pages/Perspectives';
import { Contact } from './pages/Contact';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/what-we-do" element={<WhatWeDoSecret />} />
        <Route path="/our-values" element={<OurValues />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/perspectives" element={<Perspectives />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
