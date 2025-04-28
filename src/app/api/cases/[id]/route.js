import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Case from "@/models/Case"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request, { params }) {
  try {
    // Get user from session
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectDB()

    // Get case by ID
    const caseItem = await Case.findOne({ caseId: params.id })
      .populate("createdBy", "firstName lastName email")
      .populate("assignedMediator", "firstName lastName email")
      .populate("participants", "firstName lastName email")

    if (!caseItem) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 })
    }

    // Check if user has access to this case
    const userId = session.user.id
    const isParticipant = caseItem.participants.some((p) => p._id.toString() === userId)
    const isCreator = caseItem.createdBy._id.toString() === userId
    const isMediator = caseItem.assignedMediator && caseItem.assignedMediator._id.toString() === userId

    if (!isParticipant && !isCreator && !isMediator && session.user.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    return NextResponse.json(caseItem)
  } catch (error) {
    console.error("Error fetching case:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    // Get user from session
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectDB()

    // Get case by ID
    const caseItem = await Case.findOne({ caseId: params.id })

    if (!caseItem) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 })
    }

    // Check if user has permission to update this case
    const userId = session.user.id
    const isCreator = caseItem.createdBy.toString() === userId
    const isMediator = caseItem.assignedMediator && caseItem.assignedMediator.toString() === userId

    if (!isCreator && !isMediator && session.user.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Parse request body
    const updates = await request.json()

    // Update case
    Object.keys(updates).forEach((key) => {
      if (key !== "_id" && key !== "caseId" && key !== "createdBy" && key !== "createdAt") {
        caseItem[key] = updates[key]
      }
    })

    caseItem.updatedAt = new Date()
    await caseItem.save()

    return NextResponse.json({ message: "Case updated successfully", case: caseItem })
  } catch (error) {
    console.error("Error updating case:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
