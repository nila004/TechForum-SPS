import React, { useEffect, useState } from "react";
import axios from "axios";

const ParticipantInfo = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        console.log("Fetching participants..."); // 🟡 Check if API call starts
        const response = await axios.get("http://localhost:5000/api/participants");
        console.log("API response:", response.data); // 🟢 Log data returned
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error); // 🔴 Show any error
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Participants List</h2>
      {participants.length === 0 ? (
        <p>No participants found.</p>
      ) : (
        <ul>
          {participants.map((p) => (
            <li key={p._id}>
              {p.name} — {p.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ParticipantInfo;
