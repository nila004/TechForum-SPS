import React from "react";
import eventBg from "./bg.jpg"; // your dark background image
import EventCard from "../components/EventCard";
import eventData from "../data/EventLists";
import "../pages/EventsPage.css";

function EventsPage() {
  return (
    <div className="events-page" style={{ backgroundImage: `url(${eventBg})` }}>
      <h1 className="events-title">Event Highlights</h1>
      <div className="events-grid">
        {eventData.map((item) => (
          <EventCard key={item.id} eventInfo={item} />
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
