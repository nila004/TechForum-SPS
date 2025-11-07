import React, { useState } from "react";
import "./EventCard.css";
import { useNavigate } from "react-router-dom";

function EventCard({ eventInfo = {} }) {
  const [flipped, setFlipped] = useState(false);

  const {
    title = "Untitled Event",
    description = "No description available for this event.",
    date = "Date to be announced",
    image = "https://via.placeholder.com/300x400.png?text=Event+Poster",
  } = eventInfo;

  const handleFlip = () => {
    setFlipped(!flipped);
  };
   const navigate = useNavigate();

  const handleLoginClick = (e) => {
    e.stopPropagation(); // Prevents the card from flipping
    navigate("/login");
  };

  return (
    <div className="event-card fade-up" onClick={handleFlip}>
      <div className={`card-inner ${flipped ? "flipped" : ""}`}>
        {/* Front Side */}
        <div className="card-front">
          <img src={image} alt={title} className="event-poster" />
        </div>

        {/* Back Side */}
        <div className="card-back">
          <h2>{title}</h2>
          <p>{description}</p>
          <p className="event-date">📅 {date}</p>
          <div className="event-actions">
            <button className="register-btn" onClick={handleLoginClick}>Login</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
