import mongoose from "mongoose"

const CaseSchema = new mongoose.Schema({
  caseId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Contract", "Employment", "Property", "IP", "Consumer", "Family", "Other"],
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "In Negotiation", "In Mediation", "In Arbitration", "Resolved", "Closed"],
    default: "Pending",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedMediator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assignedArbitrator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  documents: [
    {
      name: String,
      url: String,
      uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      uploadedAt: Date,
    },
  ],
  events: [
    {
      title: String,
      description: String,
      startTime: Date,
      endTime: Date,
      type: {
        type: String,
        enum: ["Meeting", "Deadline", "Mediation", "Arbitration", "Other"],
      },
      location: String,
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  resolution: {
    outcome: String,
    agreedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    resolvedAt: Date,
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

export default mongoose.models.Case || mongoose.model("Case", CaseSchema)
