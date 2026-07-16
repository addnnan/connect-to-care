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
import AIresult from './pages/AIresult';
import Dashboard from './pages/Dashboard';
import AssessmentSelection from './pages/AssessmentSelection';
import CareGuidance from './pages/CareGuidance';
import MChatFollowUp from './pages/MChartFollowUp';
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from './pages/Profile';
import EmotionMatchingGame from './pages/EmotionMatchingGame';
import SocialStoryPractice from './pages/SocialStoryPractice';
import FocusTimer from './pages/FocusTimer';
import TaskBreakdownExercise from './pages/TaskBreakdownExc';
import PaymentSuccess from './pages/PaymentSuccess';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';


function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';
  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        {/* <Route path="/detection" element={<Detection/>} /> */}
        <Route path="/detection/detailed" element={<ProtectedRoute><DetailedAssessment/></ProtectedRoute>} />
        <Route path= "/result/:id" element= {<ProtectedRoute><Result/></ProtectedRoute>} />
        <Route path="/ADHD" element={<ADHD/>} />
        <Route path="/autism" element={<Autism/>} />
        <Route path="about" element={<About/>} />
        <Route path="detailed-result" element={<AIresult/>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
{/* <<<<<<< HEAD
        <Route path="/assessments" element={<AssessmentSelection />} />
        <Route path="/assessment/mchat-followup" element={<MChatFollowUp />} />
        <Route path="/assessment/:type" element={<Detection />}/>
======= */}
        <Route path="/assessments" element={<ProtectedRoute><AssessmentSelection /></ProtectedRoute>} />
       <Route path="/assessment/mchat-followup" element={<ProtectedRoute><MChatFollowUp /></ProtectedRoute>} />
        <Route path="/assessment/:type" element={<ProtectedRoute><Detection /></ProtectedRoute>}/>
{/* >>>>>>> 09d083126cfdc1dde722113b74f32cde92558338 */}
        <Route path="/care-guidance/:type" element={<CareGuidance />}/>
        <Route path="/autism/social-story" element={<SocialStoryPractice />} />
        <Route path="/autism/emotion-matching" element={<EmotionMatchingGame />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/adhd/focus-timer" element={<FocusTimer />} />
        <Route path="/adhd/task-breakdown" element={<TaskBreakdownExercise />} />
        <Route path="/success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </div>
     
  );
}

export default App;
