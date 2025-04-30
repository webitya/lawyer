"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from "@mui/material"
import { AttachFile, Chat, Gavel, Schedule, History, ArrowBack, CheckCircle } from "@mui/icons-material"
import { format } from "date-fns"

export default function CaseDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [caseDetails, setCaseDetails] = useState(null)
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        setLoading(true)

        // In a real app, this would be an API call
        // const response = await fetch(`/api/cases/${id}`);
        // if (!response.ok) throw new Error('Failed to fetch case details');
        // const data = await response.json();

        // Mock data for demonstration
        const mockCaseDetails = {
          id: id,
          title: "Product Not Delivered",
          status: "In Negotiation",
          type: "Consumer",
          description:
            "I ordered a product on May 1st but haven't received it yet. The seller promised delivery within 3 days, but it's been over a week now. I've tried contacting them multiple times but haven't received any response.",
          desiredOutcome: "I would like a full refund or immediate delivery of the product.",
          createdBy: {
            id: "user123",
            name: "John Doe",
            email: "john.doe@example.com",
          },
          opponent: {
            id: "user456",
            name: "Jane Smith",
            email: "jane.smith@example.com",
          },
          createdAt: "2023-05-01T10:00:00Z",
          updatedAt: "2023-05-03T14:30:00Z",
          negotiationDeadline: "2023-05-08T10:00:00Z",
          documents: [
            {
              id: "doc1",
              name: "Order Receipt.pdf",
              url: "#",
              uploadedBy: "user123",
              uploadedAt: "2023-05-01T10:30:00Z",
            },
            {
              id: "doc2",
              name: "Email Communication.pdf",
              url: "#",
              uploadedBy: "user123",
              uploadedAt: "2023-05-02T09:15:00Z",
            },
          ],
          events: [
            {
              id: "event1",
              type: "Case Created",
              description: "Case was filed by John Doe",
              createdAt: "2023-05-01T10:00:00Z",
            },
            {
              id: "event2",
              type: "Opponent Invited",
              description: "Jane Smith was invited to respond to the case",
              createdAt: "2023-05-01T10:05:00Z",
            },
            {
              id: "event3",
              type: "Opponent Joined",
              description: "Jane Smith joined the case",
              createdAt: "2023-05-02T14:30:00Z",
            },
            {
              id: "event4",
              type: "Negotiation Started",
              description: "Negotiation phase has begun",
              createdAt: "2023-05-02T14:35:00Z",
            },
          ],
        }

        setCaseDetails(mockCaseDetails)
      } catch (err) {
        console.error("Error fetching case details:", err)
        setError("Failed to load case details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchCaseDetails()
  }, [id])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "default"
      case "In Negotiation":
        return "primary"
      case "In Mediation":
        return "secondary"
      case "Resolved":
        return "success"
      default:
        return "default"
    }
  }

  const getTimeRemaining = () => {
    if (!caseDetails?.negotiationDeadline) return null

    const deadline = new Date(caseDetails.negotiationDeadline)
    const now = new Date()

    if (now > deadline) return "Expired"

    const diffTime = Math.max(0, deadline - now)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    return `${diffDays}d ${diffHours}h remaining`
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
      <Button variant="outlined" startIcon={<ArrowBack />} component={Link} href="/dashboard" className="mb-4">
        Back to Dashboard
      </Button>

      <Paper elevation={2} className="p-6 mb-6">
        <Box className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <Box>
            <Typography variant="h4" component="h1" className="font-bold">
              Case #{id}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {caseDetails.title}
            </Typography>
          </Box>
          <Box className="mt-2 md:mt-0">
            <Chip label={caseDetails.status} color={getStatusColor(caseDetails.status)} className="font-medium" />
          </Box>
        </Box>

        <Divider className="mb-6" />

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Tabs value={tabValue} onChange={handleTabChange} className="mb-4">
              <Tab label="Details" />
              <Tab label="Documents" />
              <Tab label="Timeline" />
            </Tabs>

            {tabValue === 0 && (
              <Box>
                <Typography variant="h6" className="font-bold mb-2">
                  Description
                </Typography>
                <Typography variant="body1" className="mb-4">
                  {caseDetails.description}
                </Typography>

                <Typography variant="h6" className="font-bold mb-2">
                  Desired Outcome
                </Typography>
                <Typography variant="body1" className="mb-4">
                  {caseDetails.desiredOutcome}
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" className="p-3">
                      <Typography variant="subtitle2" className="font-bold">
                        Filed By
                      </Typography>
                      <Typography variant="body2">{caseDetails.createdBy.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {caseDetails.createdBy.email}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" className="p-3">
                      <Typography variant="subtitle2" className="font-bold">
                        Opponent
                      </Typography>
                      <Typography variant="body2">{caseDetails.opponent.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {caseDetails.opponent.email}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )}

            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" className="font-bold mb-2">
                  Supporting Documents
                </Typography>

                {caseDetails.documents.length > 0 ? (
                  <List>
                    {caseDetails.documents.map((doc) => (
                      <ListItem key={doc.id} divider component={Paper} variant="outlined" className="mb-2">
                        <ListItemIcon>
                          <AttachFile />
                        </ListItemIcon>
                        <ListItemText
                          primary={doc.name}
                          secondary={`Uploaded on ${format(new Date(doc.uploadedAt), "MMM d, yyyy")}`}
                        />
                        <Button variant="outlined" size="small" href={doc.url} target="_blank">
                          View
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="textSecondary" className="italic">
                    No documents uploaded
                  </Typography>
                )}

                <Button variant="outlined" startIcon={<AttachFile />} className="mt-4">
                  Upload New Document
                </Button>
              </Box>
            )}

            {tabValue === 2 && (
              <Box>
                <Typography variant="h6" className="font-bold mb-2">
                  Case Timeline
                </Typography>

                <List>
                  {caseDetails.events.map((event, index) => (
                    <ListItem key={event.id} className="pl-0">
                      <Box className="flex items-start">
                        <Box className="relative mr-4">
                          <Box className="w-3 h-3 rounded-full bg-indigo-600 mt-1.5" />
                          {index < caseDetails.events.length - 1 && (
                            <Box className="absolute top-3 left-1.5 w-0.5 h-full -ml-px bg-gray-300" />
                          )}
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" className="font-bold">
                            {event.type}
                          </Typography>
                          <Typography variant="body2">{event.description}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            {format(new Date(event.createdAt), "MMM d, yyyy h:mm a")}
                          </Typography>
                        </Box>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper variant="outlined" className="p-4 mb-4">
              <Typography variant="h6" className="font-bold mb-2">
                Case Information
              </Typography>
              <Divider className="mb-3" />

              <Box className="mb-2">
                <Typography variant="subtitle2" className="font-bold">
                  Case ID:
                </Typography>
                <Typography variant="body2">{id}</Typography>
              </Box>

              <Box className="mb-2">
                <Typography variant="subtitle2" className="font-bold">
                  Type:
                </Typography>
                <Typography variant="body2">{caseDetails.type}</Typography>
              </Box>

              <Box className="mb-2">
                <Typography variant="subtitle2" className="font-bold">
                  Filed On:
                </Typography>
                <Typography variant="body2">{format(new Date(caseDetails.createdAt), "MMMM d, yyyy")}</Typography>
              </Box>

              <Box className="mb-2">
                <Typography variant="subtitle2" className="font-bold">
                  Last Updated:
                </Typography>
                <Typography variant="body2">{format(new Date(caseDetails.updatedAt), "MMMM d, yyyy")}</Typography>
              </Box>

              {caseDetails.status === "In Negotiation" && (
                <Box className="mb-2">
                  <Typography variant="subtitle2" className="font-bold">
                    Negotiation Deadline:
                  </Typography>
                  <Typography variant="body2">
                    {format(new Date(caseDetails.negotiationDeadline), "MMMM d, yyyy")}
                    <Chip label={getTimeRemaining()} size="small" color="primary" className="ml-2" />
                  </Typography>
                </Box>
              )}
            </Paper>

            <Paper variant="outlined" className="p-4">
              <Typography variant="h6" className="font-bold mb-2">
                Actions
              </Typography>
              <Divider className="mb-3" />

              <Box className="space-y-2">
                {caseDetails.status === "In Negotiation" && (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Chat />}
                    component={Link}
                    href={`/cases/${id}/negotiation`}
                  >
                    Go to Negotiation
                  </Button>
                )}

                {caseDetails.status === "In Mediation" && (
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    startIcon={<Gavel />}
                    component={Link}
                    href={`/cases/${id}/mediation`}
                  >
                    Go to Mediation
                  </Button>
                )}

                {caseDetails.status === "In Negotiation" && (
                  <Button variant="outlined" color="secondary" fullWidth startIcon={<Gavel />}>
                    Request Mediation
                  </Button>
                )}

                {caseDetails.status === "Resolved" && (
                  <Button
                    variant="outlined"
                    color="success"
                    fullWidth
                    startIcon={<CheckCircle />}
                    component={Link}
                    href={`/cases/${id}/agreement`}
                  >
                    View Agreement
                  </Button>
                )}

                <Button variant="outlined" fullWidth startIcon={<Schedule />}>
                  Schedule Meeting
                </Button>

                <Button variant="outlined" fullWidth startIcon={<History />}>
                  View Messages
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
