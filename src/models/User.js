import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["disputant", "mediator", "lawyer", "arbitrator", "admin"],
    required: true,
  },
  organization: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  profileImage: {
    type: String,
  },
  bio: {
    type: String,
  },
  expertise: [
    {
      type: String,
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.User || mongoose.model("User", UserSchema)
