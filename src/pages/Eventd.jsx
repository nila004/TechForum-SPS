import React from "react";
import "./Eventd.css";
import { useNavigate } from "react-router-dom";

function Eventd() {
  const volunteerEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("volunteerEmail");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, Volunteer 👋</h2>
      <p className="email-text">Logged in as: {volunteerEmail}</p>

      <div className="button-section">
        <button className="dash-btn" onClick={() => navigate("/participants")}>
          Participant Info
        </button>
        <button className="dash-btn" onClick={() => navigate("/mess-details")}>
          Mess Details
        </button>
        <button className="dash-btn" onClick={() => navigate("/bill-section")}>
          Bill Section
        </button>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Eventd;
