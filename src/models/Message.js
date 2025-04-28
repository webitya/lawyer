import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema({
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  attachments: [
    {
      name: String,
      url: String,
      type: String,
    },
  ],
  isProposal: {
    type: Boolean,
    default: false,
  },
  proposalDetails: {
    type: {
      type: String,
      enum: ["Settlement", "Mediation", "Arbitration", "Other"],
    },
    amount: Number,
    terms: String,
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Countered"],
      default: "Pending",
    },
  },
  readBy: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      readAt: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Message || mongoose.model("Message", MessageSchema)
