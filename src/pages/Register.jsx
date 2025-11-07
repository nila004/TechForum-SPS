import React, { useState } from "react";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    College: "",
    Semester: "",
    contactNumber: "",
    IEEEmember: "",
    membershipId: "",
    foodPreference: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset membershipId if user switches IEEE Member to "No"
    if (name === "IEEEmember" && value === "No") {
      setFormData({ ...formData, IEEEmember: value, membershipId: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/participants/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Registration successful! Try logging in to the event.");
        setFormData({
          name: "",
          email: "",
          password: "",
          College: "",
          Semester: "",
          contactNumber: "",
          IEEEmember: "",
          membershipId: "",
          foodPreference: "",
        });
      } else {
        alert(`⚠️ ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Participant Registration</h2>
        <p className="subtitle">Register Here</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="text"
            name="College"
            placeholder="College Name"
            required
            value={formData.College}
            onChange={handleChange}
          />

          <input
            type="text"
            name="Semester"
            placeholder="Semester"
            required
            value={formData.Semester}
            onChange={handleChange}
          />

          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            required
            value={formData.contactNumber}
            onChange={handleChange}
          />

          <label>IEEE Member:</label>
          <select
            name="IEEEmember"
            required
            value={formData.IEEEmember}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          {formData.IEEEmember === "Yes" && (
            <input
              type="text"
              name="membershipId"
              placeholder="Membership ID"
              required={formData.IEEEmember === "Yes"}
              value={formData.membershipId}
              onChange={handleChange}
            />
          )}

          <label>Food Preference:</label>
          <select
            name="foodPreference"
            required
            value={formData.foodPreference}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
