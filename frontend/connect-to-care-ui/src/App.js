import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Detection from './pages/Detection';
import DetailedAssessment from './pages/DetailedAssessment';
import { Footer } from './components/Footer';
import About from './pages/About';
import Result from './pages/result';
import ADHD from './pages/ADHD';
import Autism from './pages/Autism';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';
  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/detection" element={<Detection/>} />
        <Route path="/detection/detailed" element={<DetailedAssessment/>} />
        <Route path= "/result" element= {<Result/>} />
        <Route path="/ADHD" element={<ADHD/>} />
        <Route path="/autism" element={<Autism/>} />
        <Route path="about" element={<About/>} />
      </Routes>
      <Footer />
    </div>
     
  );
}

export default App;
