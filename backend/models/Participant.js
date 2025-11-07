import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  College: { type: String, required: true },
  Semester: { type: String, required: true },
  contactNumber: { type: String, required: true },

  // IEEE Membership
  IEEEmember: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },
  membershipId: {
    type: String,
    default: null,
    validate: {
      validator: function (v) {
        if (this.IEEEmember === "Yes" && (!v || v.trim() === "")) {
          return false;
        }
        return true;
      },
      message: "Membership ID is required when IEEE Member is Yes.",
    },
  },

  // Food Preference
  foodPreference: {
    type: String,
    enum: ["Veg", "Non-Veg"],
    required: true,
  },
  foodStatus: {
    day1: {
      lunch: { type: Boolean, default: false },
      snacks: { type: Boolean, default: false },
    },
  },
});

const Participant = mongoose.model("Participant", participantSchema);

export default Participant;
