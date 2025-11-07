import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Participantd.css";

function Participantd() {
  const navigate = useNavigate();

  // ✅ Protect the route — redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "participant") {
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Get user info
  const email = localStorage.getItem("email");

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="participant-dashboard">
      <div className="participant-box">
        <h1>🎉 Welcome Participant!</h1>
        <p>You are logged in as <strong>{email}</strong></p>
        <p>Get ready to participate in the event!</p>

        <div className="participant-actions">
          <button onClick={() => alert("Event details will appear soon!")}>
            View Event Details
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Participantd;
