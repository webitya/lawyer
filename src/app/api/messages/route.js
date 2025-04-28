import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Message from "@/models/Message"
import Case from "@/models/Case"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request) {
  try {
    // Get user from session
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectDB()

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const caseId = searchParams.get("caseId")

    if (!caseId) {
      return NextResponse.json({ error: "Case ID is required" }, { status: 400 })
    }

    // Get case
    const caseItem = await Case.findOne({ caseId })

    if (!caseItem) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 })
    }

    // Check if user has access to this case
    const userId = session.user.id
    const isParticipant = caseItem.participants.includes(userId)
    const isCreator = caseItem.createdBy.toString() === userId
    const isMediator = caseItem.assignedMediator && caseItem.assignedMediator.toString() === userId

    if (!isParticipant && !isCreator && !isMediator && session.user.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Fetch messages
    const messages = await Message.find({ caseId: caseItem._id })
      .sort({ createdAt: 1 })
      .populate("sender", "firstName lastName email role")

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    // Get user from session
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const { caseId, content, attachments } = await request.json()

    // Validate input
    if (!caseId || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Connect to database
    await connectDB()

    // Get case
    const caseItem = await Case.findOne({ caseId })

    if (!caseItem) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 })
    }

    // Check if user has access to this case
    const userId = session.user.id
    const isParticipant = caseItem.participants.includes(userId)
    const isCreator = caseItem.createdBy.toString() === userId
    const isMediator = caseItem.assignedMediator && caseItem.assignedMediator.toString() === userId

    if (!isParticipant && !isCreator && !isMediator && session.user.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Create new message
    const newMessage = new Message({
      caseId: caseItem._id,
      sender: userId,
      content,
      attachments: attachments || [],
      createdAt: new Date(),
    })

    await newMessage.save()

    // Populate sender info
    await newMessage.populate("sender", "firstName lastName email role")

    return NextResponse.json({ message: "Message sent successfully", data: newMessage }, { status: 201 })
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
