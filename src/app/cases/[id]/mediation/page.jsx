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
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import EventIcon from "@mui/icons-material/Event"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from "@mui/icons-material/Cancel"
import { format } from "date-fns"

export default function MediationPage() {
  const { id } = useParams()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [caseDetails, setCaseDetails] = useState(null)
  const [mediator, setMediator] = useState(null)
  const [proposals, setProposals] = useState([])
  const [newProposal, setNewProposal] = useState({
    type: "",
    description: "",
    amount: "",
  })
  const [showProposalForm, setShowProposalForm] = useState(false)
  const [scheduledSessions, setScheduledSessions] = useState([])
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [newSession, setNewSession] = useState({
    date: "",
    time: "",
    duration: 60,
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
    // Fetch case details, messages, and mediator info
    const fetchCaseData = async () => {
      try {
        setLoading(true)

        // In a real app, these would be API calls
        // const caseResponse = await fetch(`/api/cases/${id}`);
        // const messagesResponse = await fetch(`/api/messages?caseId=${id}`);
        // const proposalsResponse = await fetch(`/api/proposals?caseId=${id}`);
        // const sessionsResponse = await fetch(`/api/sessions?caseId=${id}`);

        // Mock data for demonstration
        const caseData = {
          id: id,
          title: "Product Not Delivered",
          status: "In Mediation",
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
          documents: [
            {
              name: "Order Receipt.pdf",
              url: "#",
            },
          ],
        }

        const mediatorData = {
          id: "med789",
          name: "Robert Johnson",
          role: "mediator",
          avatar: null,
          expertise: ["Consumer Disputes", "Contract Issues"],
          experience: "10+ years in dispute resolution",
          bio: "Certified mediator specializing in consumer and contract disputes.",
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
              id: "med789",
              name: "Robert Johnson",
            },
            content:
              "Hello everyone. I'm Robert Johnson, the assigned mediator for this case. I'm here to help both parties reach a fair resolution.",
            createdAt: "2023-05-03T10:00:00Z",
          },
          {
            id: "msg4",
            sender: {
              id: "med789",
              name: "Robert Johnson",
            },
            content:
              "Let's start by understanding both sides of the issue. Jane, could you please explain what happened with the shipping?",
            createdAt: "2023-05-03T10:05:00Z",
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
          {
            id: "prop3",
            createdBy: {
              id: "med789",
              name: "Robert Johnson",
            },
            type: "Compromise",
            description: "I suggest a 50% refund and expedited shipping of the product within 2 days.",
            amount: 30.0,
            status: "Pending",
            createdAt: "2023-05-04T14:20:00Z",
          },
        ]

        const sessionsData = [
          {
            id: "sess1",
            date: "2023-05-05T15:00:00Z",
            duration: 60,
            status: "Scheduled",
            participants: ["user123", "user456", "med789"],
          },
        ]

        setCaseDetails(caseData)
        setMediator(mediatorData)
        setMessages(messagesData)
        setProposals(proposalsData)
        setScheduledSessions(sessionsData)
      } catch (err) {
        console.error("Error fetching case data:", err)
        setError("Failed to load case data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchCaseData()
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

  const handleScheduleSession = async (e) => {
    e.preventDefault()

    if (!newSession.date || !newSession.time) {
      setError("Please select a date and time for the session.")
      return
    }

    try {
      // In a real app, this would be an API call
      // Combine date and time
      const dateTime = new Date(`${newSession.date}T${newSession.time}:00`)

      // Mock response
      const session = {
        id: `sess${scheduledSessions.length + 1}`,
        date: dateTime.toISOString(),
        duration: newSession.duration,
        status: "Scheduled",
        participants: [currentUser.id, "user456", "med789"],
      }

      setScheduledSessions([...scheduledSessions, session])
      setShowScheduleDialog(false)
      setNewSession({
        date: "",
        time: "",
        duration: 60,
      })

      // Add a message about the scheduled session
      const newMsg = {
        id: `msg${messages.length + 1}`,
        sender: currentUser,
        content: `I've scheduled a mediation session for ${format(dateTime, "MMMM d, yyyy")} at ${format(dateTime, "h:mm a")} (${newSession.duration} minutes).`,
        createdAt: new Date().toISOString(),
      }

      setMessages([...messages, newMsg])
    } catch (err) {
      console.error("Error scheduling session:", err)
      setError("Failed to schedule session. Please try again.")
    }
  }

  const handleReachAgreement = async () => {
    try {
      // In a real app, this would be an API call
      // Redirect to agreement page
      window.location.href = `/cases/${id}/agreement`
    } catch (err) {
      console.error("Error reaching agreement:", err)
      setError("Failed to proceed to agreement. Please try again.")
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
                color={caseDetails?.status === "In Mediation" ? "secondary" : "default"}
              />
            </Box>

            <Box className="flex items-center mb-4">
              <Typography variant="body1" className="font-medium">
                Mediator: {mediator?.name}
              </Typography>
              <Chip label="Certified Mediator" color="primary" size="small" className="ml-2" />
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
                          message.sender.id === currentUser.id
                            ? "bg-indigo-100"
                            : message.sender.id === mediator?.id
                              ? "bg-purple-50"
                              : "bg-white"
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
                        {message.sender.name} {message.sender.id === mediator?.id && "(Mediator)"}
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
          {/* Mediator Info */}
          <Paper elevation={2} className="p-4 mb-4">
            <Typography variant="h6" className="font-bold mb-2">
              Mediator
            </Typography>
            <Divider className="mb-3" />
            <Box className="flex items-center mb-3">
              <Avatar alt={mediator?.name} sx={{ width: 64, height: 64 }} className="mr-3">
                {mediator?.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6">{mediator?.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {mediator?.experience}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" className="mb-2">
              {mediator?.bio}
            </Typography>
            <Box>
              <Typography variant="subtitle2" className="font-bold mb-1">
                Expertise:
              </Typography>
              <Box className="flex flex-wrap gap-1">
                {mediator?.expertise.map((skill, index) => (
                  <Chip key={index} label={skill} size="small" />
                ))}
              </Box>
            </Box>
          </Paper>

          {/* Scheduled Sessions */}
          <Paper elevation={2} className="p-4 mb-4">
            <Box className="flex justify-between items-center mb-2">
              <Typography variant="h6" className="font-bold">
                Scheduled Sessions
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<CalendarMonthIcon />}
                onClick={() => setShowScheduleDialog(true)}
              >
                Schedule
              </Button>
            </Box>
            <Divider className="mb-3" />

            {scheduledSessions.length > 0 ? (
              <List>
                {scheduledSessions.map((session) => (
                  <ListItem key={session.id} className="pl-0 pr-0">
                    <ListItemAvatar>
                      <Avatar>
                        <EventIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={format(new Date(session.date), "MMMM d, yyyy")}
                      secondary={`${format(new Date(session.date), "h:mm a")} (${session.duration} minutes)`}
                    />
                    <Chip
                      label={session.status}
                      color={session.status === "Completed" ? "success" : "primary"}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="textSecondary" className="text-center py-4">
                No sessions scheduled yet.
              </Typography>
            )}
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
                          By {proposal.createdBy.name} {proposal.createdBy.id === mediator?.id && "(Mediator)"} on{" "}
                          {format(new Date(proposal.createdAt), "MMM d, yyyy")}
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
                No proposals yet.
              </Typography>
            )}
          </Paper>

          {/* Actions */}
          <Paper elevation={2} className="p-4">
            <Typography variant="h6" className="font-bold mb-2">
              Actions
            </Typography>
            <Divider className="mb-2" />
            <Button variant="contained" color="success" fullWidth className="mb-2" onClick={handleReachAgreement}>
              Reach Agreement
            </Button>
            <Button variant="outlined" color="primary" fullWidth component="a" href={`/cases/${id}`}>
              Back to Case Details
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Schedule Session Dialog */}
      <Dialog open={showScheduleDialog} onClose={() => setShowScheduleDialog(false)}>
        <DialogTitle>Schedule Mediation Session</DialogTitle>
        <form onSubmit={handleScheduleSession}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Date"
                  type="date"
                  fullWidth
                  required
                  value={newSession.date}
                  onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Time"
                  type="time"
                  fullWidth
                  required
                  value={newSession.time}
                  onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Duration</InputLabel>
                  <Select
                    value={newSession.duration}
                    onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
                    label="Duration"
                  >
                    <MenuItem value={30}>30 minutes</MenuItem>
                    <MenuItem value={60}>60 minutes</MenuItem>
                    <MenuItem value={90}>90 minutes</MenuItem>
                    <MenuItem value={120}>120 minutes</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowScheduleDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Schedule
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}
