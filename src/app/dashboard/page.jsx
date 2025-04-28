"use client"
import { useState } from "react"
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Tabs,
  Tab,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material"
import { Add, Gavel, Chat, Description, CalendarMonth, MoreVert, ArrowUpward, ArrowDownward } from "@mui/icons-material"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock data for cases
const mockCases = [
  {
    id: "CASE-001",
    title: "Contract Dispute with Supplier",
    status: "In Negotiation",
    type: "Contract",
    opponent: "ABC Suppliers Ltd.",
    dateCreated: "2023-04-15",
    nextAction: "Mediation Session",
    nextActionDate: "2023-05-10",
  },
  {
    id: "CASE-002",
    title: "Employment Termination Dispute",
    status: "In Mediation",
    type: "Employment",
    opponent: "John Smith",
    dateCreated: "2023-03-22",
    nextAction: "Document Submission",
    nextActionDate: "2023-05-05",
  },
  {
    id: "CASE-003",
    title: "Property Damage Claim",
    status: "Resolved",
    type: "Property",
    opponent: "XYZ Insurance",
    dateCreated: "2023-02-10",
    nextAction: "None",
    nextActionDate: null,
  },
  {
    id: "CASE-004",
    title: "Intellectual Property Infringement",
    status: "Pending",
    type: "IP",
    opponent: "Tech Innovations Inc.",
    dateCreated: "2023-04-28",
    nextAction: "Initial Meeting",
    nextActionDate: "2023-05-15",
  },
]

// Mock data for upcoming events
const mockEvents = [
  {
    id: 1,
    title: "Mediation Session - CASE-001",
    date: "2023-05-10T14:00:00",
    type: "Mediation",
  },
  {
    id: 2,
    title: "Document Submission Deadline - CASE-002",
    date: "2023-05-05T23:59:59",
    type: "Deadline",
  },
  {
    id: 3,
    title: "Initial Meeting - CASE-004",
    date: "2023-05-15T10:30:00",
    type: "Meeting",
  },
]

export default function Dashboard() {
  const [tabValue, setTabValue] = useState(0)
  const [sortField, setSortField] = useState("dateCreated")
  const [sortDirection, setSortDirection] = useState("desc")

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedCases = [...mockCases].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1
    } else {
      return a[sortField] < b[sortField] ? 1 : -1
    }
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "In Negotiation":
        return "primary"
      case "In Mediation":
        return "secondary"
      case "Resolved":
        return "success"
      case "Pending":
        return "warning"
      default:
        return "default"
    }
  }

  const getEventTypeColor = (type) => {
    switch (type) {
      case "Mediation":
        return "secondary"
      case "Deadline":
        return "error"
      case "Meeting":
        return "primary"
      default:
        return "default"
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Box className="container mx-auto px-4 py-8">
      <Box className="flex justify-between items-center mb-8">
        <Typography variant="h4" component="h1" className="font-bold">
          Dashboard
        </Typography>
        <Button variant="contained" color="primary" startIcon={<Add />} component={Link} href="/cases/new">
          New Case
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Stats Cards */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Paper elevation={2} className="p-4 h-full">
                  <Box className="flex items-center">
                    <Box className="bg-indigo-100 p-3 rounded-full mr-4">
                      <Gavel className="text-indigo-600" />
                    </Box>
                    <Box>
                      <Typography variant="h5" className="font-bold">
                        {mockCases.length}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Total Cases
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Paper elevation={2} className="p-4 h-full">
                  <Box className="flex items-center">
                    <Box className="bg-green-100 p-3 rounded-full mr-4">
                      <Chat className="text-green-600" />
                    </Box>
                    <Box>
                      <Typography variant="h5" className="font-bold">
                        {mockCases.filter((c) => c.status === "In Negotiation").length}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        In Negotiation
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Paper elevation={2} className="p-4 h-full">
                  <Box className="flex items-center">
                    <Box className="bg-purple-100 p-3 rounded-full mr-4">
                      <Description className="text-purple-600" />
                    </Box>
                    <Box>
                      <Typography variant="h5" className="font-bold">
                        {mockCases.filter((c) => c.status === "In Mediation").length}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        In Mediation
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Paper elevation={2} className="p-4 h-full">
                  <Box className="flex items-center">
                    <Box className="bg-blue-100 p-3 rounded-full mr-4">
                      <CalendarMonth className="text-blue-600" />
                    </Box>
                    <Box>
                      <Typography variant="h5" className="font-bold">
                        {mockEvents.length}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Upcoming Events
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>

        {/* Cases Table */}
        <Grid item xs={12} lg={8}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Paper elevation={2} className="p-4">
              <Box className="mb-4">
                <Typography variant="h6" className="font-bold mb-2">
                  My Cases
                </Typography>
                <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                  <Tab label="All Cases" />
                  <Tab label="In Negotiation" />
                  <Tab label="In Mediation" />
                  <Tab label="Resolved" />
                </Tabs>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Box className="flex items-center cursor-pointer" onClick={() => handleSort("id")}>
                          Case ID
                          {sortField === "id" &&
                            (sortDirection === "asc" ? (
                              <ArrowUpward fontSize="small" />
                            ) : (
                              <ArrowDownward fontSize="small" />
                            ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className="flex items-center cursor-pointer" onClick={() => handleSort("title")}>
                          Title
                          {sortField === "title" &&
                            (sortDirection === "asc" ? (
                              <ArrowUpward fontSize="small" />
                            ) : (
                              <ArrowDownward fontSize="small" />
                            ))}
                        </Box>
                      </TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>
                        <Box className="flex items-center cursor-pointer" onClick={() => handleSort("dateCreated")}>
                          Date Created
                          {sortField === "dateCreated" &&
                            (sortDirection === "asc" ? (
                              <ArrowUpward fontSize="small" />
                            ) : (
                              <ArrowDownward fontSize="small" />
                            ))}
                        </Box>
                      </TableCell>
                      <TableCell>Next Action</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedCases
                      .filter((caseItem) => {
                        if (tabValue === 0) return true
                        if (tabValue === 1) return caseItem.status === "In Negotiation"
                        if (tabValue === 2) return caseItem.status === "In Mediation"
                        if (tabValue === 3) return caseItem.status === "Resolved"
                        return true
                      })
                      .map((caseItem) => (
                        <TableRow key={caseItem.id} hover>
                          <TableCell>{caseItem.id}</TableCell>
                          <TableCell>
                            <Link href={`/cases/${caseItem.id}`} className="text-indigo-600 hover:underline">
                              {caseItem.title}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Chip label={caseItem.status} color={getStatusColor(caseItem.status)} size="small" />
                          </TableCell>
                          <TableCell>{formatDate(caseItem.dateCreated)}</TableCell>
                          <TableCell>
                            {caseItem.nextAction !== "None" ? (
                              <Box>
                                <Typography variant="body2">{caseItem.nextAction}</Typography>
                                <Typography variant="caption" color="textSecondary">
                                  {formatDate(caseItem.nextActionDate)}
                                </Typography>
                              </Box>
                            ) : (
                              "None"
                            )}
                          </TableCell>
                          <TableCell>
                            <IconButton size="small">
                              <MoreVert />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </motion.div>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} lg={4}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Paper elevation={2} className="p-4">
              <Typography variant="h6" className="font-bold mb-4">
                Upcoming Events
              </Typography>

              <Box className="space-y-4">
                {mockEvents.map((event) => (
                  <Paper key={event.id} variant="outlined" className="p-3">
                    <Box className="flex items-start">
                      <Chip
                        label={event.type}
                        color={getEventTypeColor(event.type)}
                        size="small"
                        className="mr-2 mt-1"
                      />
                      <Box>
                        <Typography variant="body1" className="font-medium">
                          {event.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {formatDateTime(event.date)}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                ))}

                {mockEvents.length === 0 && (
                  <Typography variant="body2" color="textSecondary" className="text-center py-4">
                    No upcoming events
                  </Typography>
                )}

                <Button variant="outlined" fullWidth component={Link} href="/calendar">
                  View Calendar
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  )
}
