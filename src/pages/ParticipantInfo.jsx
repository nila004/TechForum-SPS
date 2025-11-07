import React, { useEffect, useState } from "react";
import axios from "axios";

const ParticipantInfo = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        console.log("Fetching participants...");
        const response = await axios.get("http://localhost:5000/api/participants");
        console.log("API response:", response.data);
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
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
        <table className="participants-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>College</th>
              <th>Semester</th>
              <th>Contact</th>
              <th>IEEE Member</th>
              <th>Membership ID</th>
              <th>Food Preference</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.College}</td>
                <td>{p.Semester}</td>
                <td>{p.contactNumber}</td>
                <td>{p.IEEEmember}</td>
                <td>{p.membershipId || "—"}</td>
                <td>{p.foodPreference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <style jsx>{`
        .container {
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          padding: 10px;
          text-align: center;
          border: 1px solid #ddd;
        }
        th {
          background-color: #007bff;
          color: white;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
      `}</style>
    </div>
  );
};

export default ParticipantInfo;
