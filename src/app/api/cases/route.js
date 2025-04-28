import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
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
    const status = searchParams.get("status")
    const userId = session.user.id

    // Build query
    const query = {
      $or: [{ createdBy: userId }, { participants: userId }],
    }

    if (status) {
      query.status = status
    }

    // Fetch cases
    const cases = await Case.find(query)
      .sort({ createdAt: -1 })
      .populate("createdBy", "firstName lastName email")
      .populate("assignedMediator", "firstName lastName email")
      .populate("participants", "firstName lastName email")

    return NextResponse.json(cases)
  } catch (error) {
    console.error("Error fetching cases:", error)
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
    const { title, description, type, participants, documents } = await request.json()

    // Validate input
    if (!title || !description || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Connect to database
    await connectDB()

    // Generate case ID
    const caseCount = await Case.countDocuments()
    const caseId = `CASE-${String(caseCount + 1).padStart(3, "0")}`

    // Create new case
    const newCase = new Case({
      caseId,
      title,
      description,
      type,
      status: "Pending",
      createdBy: session.user.id,
      participants: participants || [],
      documents: documents || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await newCase.save()

    return NextResponse.json({ message: "Case created successfully", case: newCase }, { status: 201 })
  } catch (error) {
    console.error("Error creating case:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
