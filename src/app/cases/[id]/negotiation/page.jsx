"use client"
import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  Chip,
  Avatar,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from "@mui/icons-material/Cancel"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { format } from "date-fns"

export default function NegotiationPage() {
  const { id } = useParams()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [caseDetails, setCaseDetails] = useState(null)
  const [proposals, setProposals] = useState([])
  const [newProposal, setNewProposal] = useState({
    type: "",
    description: "",
    amount: "",
  })
  const [showProposalForm, setShowProposalForm] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
  })

  const messagesEndRef = useRef(null)

  // Mock user data (in a real app, this would come from authentication context)
  const currentUser = {
    id: "user123",
    name: "John Doe",
    role: "disputant",
    avatar: null,
  }

  useEffect(() => {
    // Fetch case details and messages
    const fetchCaseData = async () => {
      try {
        setLoading(true)

        // In a real app, these would be API calls
        // const caseResponse = await fetch(`/api/cases/${id}`);
        // const messagesResponse = await fetch(`/api/messages?caseId=${id}`);
        // const proposalsResponse = await fetch(`/api/proposals?caseId=${id}`);

        // if (!caseResponse.ok || !messagesResponse.ok || !proposalsResponse.ok) {
        //   throw new Error('Failed to fetch data');
        // }

        // const caseData = await caseResponse.json();
        // const messagesData = await messagesResponse.json();
        // const proposalsData = await proposalsResponse.json();

        // Mock data for demonstration
        const caseData = {
          id: id,
          title: "Product Not Delivered",
          status: "In Negotiation",
          createdBy: {
            id: "user123",
            name: "John Doe",
          },
          participants: [
            {
              id: "user456",
              name: "Jane Smith",
            },
          ],
          description: "I ordered a product on May 1st but haven't received it yet.",
          createdAt: "2023-05-01T10:00:00Z",
          negotiationDeadline: "2023-05-08T10:00:00Z",
          documents: [
            {
              name: "Order Receipt.pdf",
              url: "#",
            },
          ],
        }

        const messagesData = [
          {
            id: "msg1",
            sender: {
              id: "user123",
              name: "John Doe",
            },
            content: "Hello, I haven't received my order yet. It's been over a week.",
            createdAt: "2023-05-02T14:30:00Z",
          },
          {
            id: "msg2",
            sender: {
              id: "user456",
              name: "Jane Smith",
            },
            content: "I apologize for the inconvenience. Let me check the status of your order.",
            createdAt: "2023-05-02T15:45:00Z",
          },
          {
            id: "msg3",
            sender: {
              id: "user456",
              name: "Jane Smith",
            },
            content:
              "I've checked with our shipping department. There was a delay due to inventory issues. Your order should arrive within 2 days.",
            createdAt: "2023-05-02T16:20:00Z",
          },
        ]

        const proposalsData = [
          {
            id: "prop1",
            createdBy: {
              id: "user123",
              name: "John Doe",
            },
            type: "Refund",
            description: "I would like a full refund since the product hasn't been delivered.",
            amount: 59.99,
            status: "Pending",
            createdAt: "2023-05-03T09:15:00Z",
          },
          {
            id: "prop2",
            createdBy: {
              id: "user456",
              name: "Jane Smith",
            },
            type: "Partial Refund",
            description: "We can offer a 20% discount for the inconvenience while still delivering your product.",
            amount: 12.0,
            status: "Pending",
            createdAt: "2023-05-03T11:30:00Z",
          },
        ]

        setCaseDetails(caseData)
        setMessages(messagesData)
        setProposals(proposalsData)

        // Calculate time remaining for negotiation
        const deadline = new Date(caseData.negotiationDeadline)
        const now = new Date()
        const diffTime = Math.max(0, deadline - now)
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))

        setTimeRemaining({
          days: diffDays,
          hours: diffHours,
          minutes: diffMinutes,
        })
      } catch (err) {
        console.error("Error fetching case data:", err)
        setError("Failed to load case data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchCaseData()

    // Set up a timer to update the time remaining
    const timer = setInterval(() => {
      if (caseDetails) {
        const deadline = new Date(caseDetails.negotiationDeadline)
        const now = new Date()
        const diffTime = Math.max(0, deadline - now)
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))

        setTimeRemaining({
          days: diffDays,
          hours: diffHours,
          minutes: diffMinutes,
        })
      }
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [id])

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/messages', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     caseId: id,
      //     content: newMessage,
      //   }),
      // });

      // if (!response.ok) throw new Error('Failed to send message');
      // const data = await response.json();

      // Mock response
      const newMsg = {
        id: `msg${messages.length + 1}`,
        sender: currentUser,
        content: newMessage,
        createdAt: new Date().toISOString(),
      }

      setMessages([...messages, newMsg])
      setNewMessage("")
    } catch (err) {
      console.error("Error sending message:", err)
      setError("Failed to send message. Please try again.")
    }
  }

  const handleCreateProposal = async (e) => {
    e.preventDefault()

    if (!newProposal.type || !newProposal.description) {
      setError("Please fill in all required fields.")
      return
    }

    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/proposals', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     caseId: id,
      //     ...newProposal,
      //   }),
      // });

      // if (!response.ok) throw new Error('Failed to create proposal');
      // const data = await response.json();

      // Mock response
      const proposal = {
        id: `prop${proposals.length + 1}`,
        createdBy: currentUser,
        ...newProposal,
        status: "Pending",
        createdAt: new Date().toISOString(),
      }

      setProposals([...proposals, proposal])
      setNewProposal({ type: "", description: "", amount: "" })
      setShowProposalForm(false)

      // Also add a message about the proposal
      const newMsg = {
        id: `msg${messages.length + 1}`,
        sender: currentUser,
        content: `I've submitted a proposal: ${newProposal.type} - ${newProposal.description}${newProposal.amount ? ` ($${newProposal.amount})` : ""}`,
        createdAt: new Date().toISOString(),
        isProposal: true,
      }

      setMessages([...messages, newMsg])
    } catch (err) {
      console.error("Error creating proposal:", err)
      setError("Failed to create proposal. Please try again.")
    }
  }

  const handleProposalAction = async (proposalId, action) => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/proposals/${proposalId}/${action}`, {
      //   method: 'POST',
      // });

      // if (!response.ok) throw new Error(`Failed to ${action} proposal`);
      // const data = await response.json();

      // Mock response
      const updatedProposals = proposals.map((p) =>
        p.id === proposalId ? { ...p, status: action === "accept" ? "Accepted" : "Rejected" } : p,
      )

      setProposals(updatedProposals)

      // Add a message about the action
      const proposal = proposals.find((p) => p.id === proposalId)
      const newMsg = {
        id: `msg${messages.length + 1}`,
        sender: currentUser,
        content: `I've ${action === "accept" ? "accepted" : "rejected"} the proposal: ${proposal.type} - ${proposal.description}`,
        createdAt: new Date().toISOString(),
      }

      setMessages([...messages, newMsg])
    } catch (err) {
      console.error(`Error ${action}ing proposal:`, err)
      setError(`Failed to ${action} proposal. Please try again.`)
    }
  }

  const handleExtendDeadline = async () => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/cases/${id}/extend-deadline`, {
      //   method: 'POST',
      // });

      // if (!response.ok) throw new Error('Failed to extend deadline');
      // const data = await response.json();

      // Mock response
      const newDeadline = new Date(caseDetails.negotiationDeadline)
      newDeadline.setDate(newDeadline.getDate() + 7)

      setCaseDetails({
        ...caseDetails,
        negotiationDeadline: newDeadline.toISOString(),
      })

      // Update time remaining
      setTimeRemaining({
        days: 7,
        hours: 0,
        minutes: 0,
      })

      // Add a message about the extension
      const newMsg = {
        id: `msg${messages.length + 1}`,
        sender: currentUser,
        content: "I've extended the negotiation deadline by 7 days.",
        createdAt: new Date().toISOString(),
      }

      setMessages([...messages, newMsg])
    } catch (err) {
      console.error("Error extending deadline:", err)
      setError("Failed to extend deadline. Please try again.")
    }
  }

  const handleRequestMediation = async () => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/cases/${id}/request-mediation`, {
      //   method: 'POST',
      // });

      // if (!response.ok) throw new Error('Failed to request mediation');
      // const data = await response.json();

      // Mock response - redirect to mediation page
      window.location.href = `/cases/${id}/mediation`
    } catch (err) {
      console.error("Error requesting mediation:", err)
      setError("Failed to request mediation. Please try again.")
    }
  }

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="container mx-auto p-4">
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  return (
    <Box className="container mx-auto p-4">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} className="p-4 mb-4">
            <Box className="flex justify-between items-center mb-4">
              <Typography variant="h5" component="h1" className="font-bold">
                Case #{id}: {caseDetails?.title}
              </Typography>
              <Chip
                label={caseDetails?.status}
                color={caseDetails?.status === "In Negotiation" ? "primary" : "default"}
              />
            </Box>

            <Box className="flex items-center mb-4">
              <AccessTimeIcon className="mr-2" />
              <Typography variant="body2">
                Negotiation Time Remaining: {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m
              </Typography>
              <Button size="small" variant="outlined" className="ml-4" onClick={handleExtendDeadline}>
                Extend Deadline
              </Button>
            </Box>

            <Divider className="mb-4" />

            {/* Messages Section */}
            <Box className="bg-gray-50 p-4 rounded-lg mb-4 h-96 overflow-y-auto">
              {messages.map((message) => (
                <Box
                  key={message.id}
                  className={`mb-4 flex ${message.sender.id === currentUser.id ? "justify-end" : "justify-start"}`}
                >
                  <Box className="flex">
                    {message.sender.id !== currentUser.id && (
                      <Avatar className="mr-2" alt={message.sender.name}>
                        {message.sender.name.charAt(0)}
                      </Avatar>
                    )}
                    <Box>
                      <Paper
                        elevation={1}
                        className={`p-3 max-w-md ${
                          message.sender.id === currentUser.id ? "bg-indigo-100" : "bg-white"
                        }`}
                      >
                        <Typography variant="body2" className="mb-1">
                          {message.content}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {format(new Date(message.createdAt), "MMM d, h:mm a")}
                        </Typography>
                      </Paper>
                      <Typography variant="caption" className="ml-2">
                        {message.sender.name}
                      </Typography>
                    </Box>
                    {message.sender.id === currentUser.id && (
                      <Avatar className="ml-2" alt={message.sender.name}>
                        {message.sender.name.charAt(0)}
                      </Avatar>
                    )}
                  </Box>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            {/* Message Input */}
            <form onSubmit={handleSendMessage}>
              <Box className="flex">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="mr-2"
                />
                <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />}>
                  Send
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Case Details */}
          <Paper elevation={2} className="p-4 mb-4">
            <Typography variant="h6" className="font-bold mb-2">
              Case Details
            </Typography>
            <Divider className="mb-2" />
            <Box className="mb-2">
              <Typography variant="subtitle2" className="font-bold">
                Description:
              </Typography>
              <Typography variant="body2">{caseDetails?.description}</Typography>
            </Box>
            <Box className="mb-2">
              <Typography variant="subtitle2" className="font-bold">
                Filed By:
              </Typography>
              <Typography variant="body2">{caseDetails?.createdBy.name}</Typography>
            </Box>
            <Box className="mb-2">
              <Typography variant="subtitle2" className="font-bold">
                Filed On:
              </Typography>
              <Typography variant="body2">{format(new Date(caseDetails?.createdAt), "MMMM d, yyyy")}</Typography>
            </Box>
            <Box className="mb-2">
              <Typography variant="subtitle2" className="font-bold">
                Documents:
              </Typography>
              <Box>
                {caseDetails?.documents.map((doc, index) => (
                  <Button
                    key={index}
                    size="small"
                    startIcon={<AttachFileIcon />}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {doc.name}
                  </Button>
                ))}
              </Box>
            </Box>
          </Paper>

          {/* Proposals Section */}
          <Paper elevation={2} className="p-4 mb-4">
            <Box className="flex justify-between items-center mb-2">
              <Typography variant="h6" className="font-bold">
                Proposals
              </Typography>
              <Button variant="outlined" size="small" onClick={() => setShowProposalForm(!showProposalForm)}>
                {showProposalForm ? "Cancel" : "New Proposal"}
              </Button>
            </Box>
            <Divider className="mb-2" />

            {showProposalForm && (
              <Box className="mb-4">
                <form onSubmit={handleCreateProposal}>
                  <TextField
                    select
                    label="Proposal Type"
                    fullWidth
                    required
                    value={newProposal.type}
                    onChange={(e) => setNewProposal({ ...newProposal, type: e.target.value })}
                    className="mb-2"
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="">Select Type</option>
                    <option value="Refund">Refund</option>
                    <option value="Partial Refund">Partial Refund</option>
                    <option value="Replacement">Replacement</option>
                    <option value="Exchange">Exchange</option>
                    <option value="Other">Other</option>
                  </TextField>
                  <TextField
                    label="Description"
                    fullWidth
                    required
                    multiline
                    rows={2}
                    value={newProposal.description}
                    onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                    className="mb-2"
                  />
                  <TextField
                    label="Amount (if applicable)"
                    fullWidth
                    type="number"
                    value={newProposal.amount}
                    onChange={(e) => setNewProposal({ ...newProposal, amount: e.target.value })}
                    className="mb-2"
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit Proposal
                  </Button>
                </form>
              </Box>
            )}

            {proposals.length > 0 ? (
              <Box>
                {proposals.map((proposal) => (
                  <Card key={proposal.id} className="mb-2" variant="outlined">
                    <CardContent className="p-3">
                      <Box className="flex justify-between items-start">
                        <Typography variant="subtitle2" className="font-bold">
                          {proposal.type}
                          {proposal.amount && ` ($${proposal.amount})`}
                        </Typography>
                        <Chip
                          label={proposal.status}
                          color={
                            proposal.status === "Accepted"
                              ? "success"
                              : proposal.status === "Rejected"
                                ? "error"
                                : "default"
                          }
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" className="mb-1">
                        {proposal.description}
                      </Typography>
                      <Box className="flex justify-between items-center">
                        <Typography variant="caption" color="textSecondary">
                          By {proposal.createdBy.name} on {format(new Date(proposal.createdAt), "MMM d, yyyy")}
                        </Typography>

                        {proposal.status === "Pending" && proposal.createdBy.id !== currentUser.id && (
                          <Box>
                            <Button
                              size="small"
                              color="success"
                              onClick={() => handleProposalAction(proposal.id, "accept")}
                              startIcon={<CheckCircleIcon />}
                            >
                              Accept
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              onClick={() => handleProposalAction(proposal.id, "reject")}
                              startIcon={<CancelIcon />}
                            >
                              Reject
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary" className="text-center py-4">
                No proposals yet. Create one to start negotiating.
              </Typography>
            )}
          </Paper>

          {/* Actions */}
          <Paper elevation={2} className="p-4">
            <Typography variant="h6" className="font-bold mb-2">
              Actions
            </Typography>
            <Divider className="mb-2" />
            <Button variant="contained" color="secondary" fullWidth className="mb-2" onClick={handleRequestMediation}>
              Request Mediation
            </Button>
            <Button variant="outlined" color="primary" fullWidth component="a" href={`/cases/${id}`}>
              Back to Case Details
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
