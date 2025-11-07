import React, { useEffect, useState } from "react";
import axios from "axios";

const MessDetails = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all participants on page load
  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/participants");
    setParticipants(res.data);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching participants:", error);
    setLoading(false);
  }
};

// ✅ Handle marking food
const handleMarkFood = async (id, meal) => {
  try {
    await axios.put(`http://localhost:5000/api/participants/${id}/food/${meal}`);
    fetchParticipants(); // refresh list
  } catch (error) {
    if (error.response) alert(error.response.data.message);
    else alert("Server error");
  }
};

  if (loading) return <p className="text-center mt-5">Loading participants...</p>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Mess Details - Day 1</h2>

      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">College</th>
            <th className="p-2 border">Food Preference</th>
            <th className="p-2 border">Lunch</th>
            <th className="p-2 border">Snacks</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <tr key={p._id} className="border-b">
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.College}</td>
              <td className="p-2 border">{p.foodPreference}</td>
              <td className="p-2 border text-center">
                {p.foodStatus?.day1?.lunch ? (
                  "✅"
                ) : (
                  <button
                    onClick={() => handleMarkFood(p._id, "lunch")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Mark Lunch
                  </button>
                )}
              </td>
              <td className="p-2 border text-center">
                {p.foodStatus?.day1?.snacks ? (
                  "✅"
                ) : (
                  <button
                    onClick={() => handleMarkFood(p._id, "snacks")}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Mark Snacks
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default MessDetails;
