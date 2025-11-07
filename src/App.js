import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventsPage from "./pages/EventsPage";
import Eventd from "./pages/Eventd";
import Participantd from "./pages/Participantd";
import ProtectedRoute from "./components/ProtectedRoute";
import ParticipantInfo from "./pages/ParticipantInfo";
import MessDetails from "./pages/MessDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
              <Route
                  path="/eventd"
                  element={
                    <ProtectedRoute>
                   <Eventd />
                    </ProtectedRoute>
                  }
                  
                 />
              <Route
                  path="/participantd"
                  element={
                    <ProtectedRoute>
                   <Participantd />
                    </ProtectedRoute>
                  }
                  />
          <Route path="/participants" element={<ParticipantInfo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/eventlist" element={<EventsPage />} />
          <Route path="/messdetails" element={<MessDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
