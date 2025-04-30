"use client"
import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material"
import { Search, MoreVert, CheckCircle, People, Gavel, AccessTime } from "@mui/icons-material"
import { format } from "date-fns"
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [cases, setCases] = useState([])
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [analytics, setAnalytics] = useState({
    totalCases: 0,
    resolvedCases: 0,
    activeCases: 0,
    totalUsers: 0,
    mediators: 0,
    disputants: 0,
    resolutionRate: 0,
    avgResolutionTime: 0,
    casesByStatus: [],
    casesByType: [],
    resolutionTimeByType: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // In a real app, these would be API calls
        // const casesResponse = await fetch('/api/admin/cases');
        // const usersResponse = await fetch('/api/admin/users');
        // const analyticsResponse = await fetch('/api/admin/analytics');
        
        // Mock data for demonstration
        const casesData = [
          {
            id: "CASE-001",
            title: "Product Not Delivered",
            status: "In Negotiation",
            type: "Consumer",
            createdBy: {
              id: "user123",
              name: "John Doe",
            },
            createdAt: "2023-05-01T10:00:00Z",
            updatedAt: "2023-05-03T14:30:00Z",
          },
          {
            id: "CASE-002",
            title: "Contract Dispute",
            status: "In Mediation",
            type: "Contract",
            createdBy: {
              id: "user456",
              name: "Jane Smith",
            },
            createdAt: "2023-04-28T09:15:00Z",
            updatedAt: "2023-05-02T11:20:00Z",
          },
          {
            id: "CASE-003",
            title: "Refund Request",
            status: "Resolved",
            type: "Consumer",
            createdBy: {
              id: "user789",
              name: "Mike Johnson",
            },
            createdAt: "2023-04-20T15:45:00Z",
            updatedAt: "2023-04-30T16:10:00Z",
            resolvedAt: "2023-04-30T16:10:00Z",
          },
          {
            id: "CASE-004",
            title: "Employment Dispute",
            status: "In Mediation",
            type: "Employment",
            createdBy: {
              id: "user101",
              name: "Sarah Williams",
            },
            createdAt: "2023-04-25T11:30:00Z",
            updatedAt: "2023-05-01T09:45:00Z",
          },
          {
            id: "CASE-005",
            title: "Property Damage",
            status: "Resolved",
            type: "Property",
            createdBy: {
              id: "user202",
              name: "Robert Brown",
            },
            createdAt: "2023-04-15T14:20:00Z",
            updatedAt: "2023-04-28T10:30:00Z",
            resolvedAt: "2023-04-28T10:30:00Z",
          },
        ]
        
        const usersData = [
          {
            id: "user123",
            name: "John Doe",
            email: "john.doe@example.com",
            role: "disputant",
            status: "active",
            createdAt: "2023-03-15T10:00:00Z",
            casesCount: 2,
          },
          {
            id: "user456",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            role: "disputant",
            status: "active",
            createdAt: "2023-03-20T14:30:00Z",
            casesCount: 1,
          },
          {
            id: "med789",
            name: "Robert Johnson",
            email: "robert.johnson@example.com",
            role: "mediator",
            status: "active",
            createdAt: "2023-02-10T09:15:00Z",
            casesCount: 3,
          },
          {
            id: "user101",
            name: "Sarah Williams",
            email: "sarah.williams@example.com",
            role: "disputant",
            status: "active",
            createdAt: "2023-04-05T11:45:00Z",
            casesCount: 1,
          },
          {
            id: "med202",
            name: "Michael Brown",
            email: "michael.brown@example.com",
            role: "mediator",
            status: "pending",
            createdAt: "2023-04-12T16:20:00Z",
            casesCount: 0,
          },
        ]
        
        const analyticsData = {
          totalCases: 25,
          resolvedCases: 15,
          activeCases: 10,
          totalUsers: 42,
          mediators: 8,
          disputants: 34,
          resolutionRate: 75,
          avgResolutionTime: 8.5,
          casesByStatus: [
            { name: "In Negotiation", value: 6 },
            { name: "In Mediation", value: 4 },
            { name: "Resolved", value: 15 },
          ],
          casesByType: [
            { name: "Consumer", value: 12 },
            { name: "Contract", value: 5 },
            { name: "Employment", value: 3 },
            { name: "Property", value: 5 },
          ],
          resolutionTimeByType: [
            { name: "Consumer", days: 7 },
            { name: "Contract", days: 12 },
            { name: "Employment", days: 14 },
            { name: "Property", days: 9 },
          ],
        }
        
        setCases(casesData)
        setUsers(usersData)
        setAnalytics(analyticsData)
        
      } catch (err) {
        console.error("Error fetching admin data:", err)
        setError("Failed to load admin dashboard data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setPage(0)
  }

  const handleFilterChange = (status) => {
    setFilterStatus(status)
    setPage(0)
  }

  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget)
    setSelectedItem(item)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedItem(null)
  }

  const handleApproveUser = async (userId) => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/users/${userId}/approve`, {
      //   method: 'POST',
      // });
      
      // Mock response
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'active' } : user
      ))
      
      handleMenuClose()
    } catch (err) {
      console.error("Error approving user:", err)
      setError("Failed to approve user. Please try again.")
    }
  }

  const handleBlockUser = async (userId) => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/users/${userId}/block`, {
      //   method: 'POST',
      // });
      
      // Mock response
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'blocked' } : user
      ))
      
      handleMenuClose()
    } catch (err) {
      console.error("Error blocking user:", err)
      setError("Failed to block user. Please try again.")
    }
  }

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          caseItem.id.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || caseItem.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const filteredUsers = users.filter(user => {
    return user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           user.email.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

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
      <Typography variant="h4" component="h1" className="font-bold mb-6">
        Admin Dashboard
      </Typography>
      
      {/* Analytics Cards */}
      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} className="p-4 h-full">
            <Box className="flex items-center">
              <Box className="bg-indigo-100 p-3 rounded-full mr-4">
                <Gavel className="text-indigo-600" />
              </Box>
              <Box>
                <Typography variant="h5" className="font-bold">
                  {analytics.totalCases}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Cases
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} className="p-4 h-full">
            <Box className="flex items-center">
              <Box className="bg-green-100 p-3 rounded-full mr-4">
                <CheckCircle className="text-green-600" />
              </Box>
              <Box>
                <Typography variant="h5" className="font-bold">
                  {analytics.resolutionRate}%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Resolution Rate
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} className="p-4 h-full">
            <Box className="flex items-center">
              <Box className="bg-purple-100 p-3 rounded-full mr-4">
                <People className="text-purple-600" />
              </Box>
              <Box>
                <Typography variant="h5" className="font-bold">
                  {analytics.totalUsers}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Users
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} className="p-4 h-full">
            <Box className="flex items-center">
              <Box className="bg-blue-100 p-3 rounded-full mr-4">
                <AccessTime className="text-blue-600" />
              </Box>
              <Box>
                <Typography variant="h5" className="font-bold">
                  {analytics.avgResolutionTime} days
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Avg. Resolution Time
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Tabs */}
      <Paper elevation={2} className="p-4 mb-6">
        <Tabs value={tabValue} onChange={handleTabChange} className="mb-4">
          <Tab label="Cases" />
          <Tab label="Users" />
          <Tab label="Analytics" />
        </Tabs>
        
        {/* Cases Tab */}
        {tabValue === 0 && (
          <Box>
            <Box className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
              <TextField
                placeholder="Search cases..."
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                className="w-full sm:w-auto"
              />
              
              <Box className="flex gap-2">
                <Button 
                  variant={filterStatus === 'all' ? "contained" : "outlined"} 
                  size="small"
                  onClick={() => handleFilterChange('all')}
                >
                  All
                </Button>
                <Button 
                  variant={filterStatus === 'In Negotiation' ? "contained" : "outlined"} 
                  size="small"
                  onClick={() => handleFilterChange('In Negotiation')}
                >
                  Negotiation
                </Button>
                <Button 
                  variant={filterStatus === 'In Mediation' ? "contained" : "outlined"} 
                  size="small"
                  onClick={() => handleFilterChange('In Mediation')}
                >
                  Mediation
                </Button>
                <Button 
                  variant={filterStatus === 'Resolved' ? "contained" : "outlined"} 
                  size="small"
                  onClick={() => handleFilterChange('Resolved')}
                >
                  Resolved
                </Button>
              </Box>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Case ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Created By</TableCell>
                    <TableCell>Created On</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCases
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((caseItem) => (
                      <TableRow key={caseItem.id} hover>
                        <TableCell>{caseItem.id}</TableCell>
                        <TableCell>{caseItem.title}</TableCell>
                        <TableCell>
                          <Chip 
                            label={caseItem.status} 
                            color={
                              caseItem.status === 'Resolved' 
                                ? 'success' 
                                : caseItem.status === 'In Mediation' 
                                  ? 'secondary' 
                                  : 'primary'
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{caseItem.type}</TableCell>
                        <TableCell>{caseItem.createdBy.name}</TableCell>
                        <TableCell>{format(new Date(caseItem.createdAt), 'MMM d, yyyy')}</TableCell>
                        <TableCell>
                          <IconButton 
                            size="small"
                            onClick={(e) => handleMenuOpen(e, caseItem)}
                          >
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredCases.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        )}
        
        {/* Users Tab */}
        {tabValue === 1 && (
          <Box>
            <Box className="flex justify-between items-center mb-4">
              <TextField
                placeholder="Search users..."
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Cases</TableCell>
                    <TableCell>Joined On</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <TableRow key={user.id} hover>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip 
                            label={user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
                            color={user.role === 'mediator' ? 'secondary' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={user.status.charAt(0).toUpperCase() + user.status.slice(1)} 
                            color={
                              user.status === 'active' 
                                ? 'success' 
                                : user.status === 'pending' 
                                  ? 'warning' 
                                  : 'error'
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{user.casesCount}</TableCell>
                        <TableCell>{format(new Date(user.createdAt), 'MMM d, yyyy')}</TableCell>
                        <TableCell>
                          <IconButton 
                            size="small"
                            onClick={(e) => handleMenuOpen(e, user)}
                          >
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        )}
        
        {/* Analytics Tab */}
        {tabValue === 2 && (
          <Box>
            <Grid container spacing={4}>
              {/* Cases by Status */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" className="h-full">
                  <CardContent>
                    <Typography variant="h6" className="font-bold mb-4">
                      Cases by Status
                    </Typography>
                    <Box className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={analytics.casesByStatus}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {analytics.casesByStatus.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Cases by Type */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" className="h-full">
                  <CardContent>
                    <Typography variant="h6" className="font-bold mb-4">
                      Cases by Type
                    </Typography>
                    <Box className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={analytics.casesByType}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {analytics.casesByType.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Resolution Time by Type */}
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" className="font-bold mb-4">
                      Average Resolution Time by Case Type (Days)
                    </Typography>
                    <Box className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={analytics.resolutionTimeByType}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="days" fill="#8884d8" name="Days to Resolution" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
      
      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {selectedItem && 'role' in selectedItem ? (
          // User actions
          <>
            <MenuItem onClick={() => window.location.href = `/admin/users/${selectedItem.id}`}>
              View Details
            </MenuItem>
            {selectedItem.status === 'pending' && (
              <MenuItem onClick={() => handleApproveUser(selectedItem.id)
