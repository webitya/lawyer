"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Box,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import SendIcon from "@mui/icons-material/Send"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "",
  })

  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  const inquiryTypes = [
    "General Inquiry",
    "Platform Support",
    "Dispute Filing Help",
    "Mediator/Arbitrator Application",
    "Partnership Opportunity",
    "Media Inquiry",
    "Other",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, this would be an API call to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // if (!response.ok) throw new Error('Failed to send message');

      // Mock successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSnackbar({
        open: true,
        message: "Your message has been sent successfully! We'll get back to you soon.",
        severity: "success",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "",
      })
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to send message. Please try again later.",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-700 text-white py-20">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Typography variant="h2" component="h1" className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </Typography>
            <Typography variant="h5" className="mb-6 max-w-3xl mx-auto">
              Have questions or need assistance? We're here to help you with your dispute resolution needs.
            </Typography>
          </motion.div>
        </Container>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-16">
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paper elevation={2} className="p-6 md:p-8 rounded-lg">
                  <Typography variant="h4" component="h2" className="font-bold mb-6">
                    Send Us a Message
                  </Typography>

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Your Name"
                          variant="outlined"
                          fullWidth
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email Address"
                          variant="outlined"
                          fullWidth
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Phone Number (Optional)"
                          variant="outlined"
                          fullWidth
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          select
                          label="Inquiry Type"
                          variant="outlined"
                          fullWidth
                          required
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleChange}
                        >
                          {inquiryTypes.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Subject"
                          variant="outlined"
                          fullWidth
                          required
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Message"
                          variant="outlined"
                          fullWidth
                          required
                          multiline
                          rows={6}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          disabled={loading}
                          endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                          className="px-8 py-3"
                        >
                          {loading ? "Sending..." : "Send Message"}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </motion.div>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <Paper elevation={2} className="p-6 rounded-lg">
                  <Typography variant="h5" component="h3" className="font-bold mb-4">
                    Contact Information
                  </Typography>

                  <Box className="space-y-4">
                    <Box className="flex items-start">
                      <EmailIcon className="text-indigo-600 mr-3 mt-1" />
                      <Box>
                        <Typography variant="subtitle2" className="font-bold">
                          Email Us
                        </Typography>
                        <Typography variant="body2" className="text-gray-700">
                          General Inquiries: info@disputeresolve.com
                        </Typography>
                        <Typography variant="body2" className="text-gray-700">
                          Support: support@disputeresolve.com
                        </Typography>
                      </Box>
                    </Box>

                    <Box className="flex items-start">
                      <PhoneIcon className="text-indigo-600 mr-3 mt-1" />
                      <Box>
                        <Typography variant="subtitle2" className="font-bold">
                          Call Us
                        </Typography>
                        <Typography variant="body2" className="text-gray-700">
                          Main Office: (555) 123-4567
                        </Typography>
                        <Typography variant="body2" className="text-gray-700">
                          Support Hotline: (555) 987-6543
                        </Typography>
                      </Box>
                    </Box>

                    <Box className="flex items-start">
                      <LocationOnIcon className="text-indigo-600 mr-3 mt-1" />
                      <Box>
                        <Typography variant="subtitle2" className="font-bold">
                          Visit Us
                        </Typography>
                        <Typography variant="body2" className="text-gray-700">
                          123 Resolution Way
                          <br />
                          Suite 400
                          <br />
                          San Francisco, CA 94105
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>

                <Paper elevation={2} className="p-6 rounded-lg">
                  <Typography variant="h5" component="h3" className="font-bold mb-4">
                    Business Hours
                  </Typography>
                  <Box className="space-y-2">
                    <Box className="flex justify-between">
                      <Typography variant="body2" className="font-medium">
                        Monday - Friday:
                      </Typography>
                      <Typography variant="body2" className="text-gray-700">
                        9:00 AM - 6:00 PM
                      </Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography variant="body2" className="font-medium">
                        Saturday:
                      </Typography>
                      <Typography variant="body2" className="text-gray-700">
                        10:00 AM - 4:00 PM
                      </Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography variant="body2" className="font-medium">
                        Sunday:
                      </Typography>
                      <Typography variant="body2" className="text-gray-700">
                        Closed
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-8">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Paper elevation={2} className="rounded-lg overflow-hidden">
              <Box className="h-96 bg-gray-300 flex items-center justify-center">
                <Typography variant="body1">Interactive Map Would Be Embedded Here</Typography>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-16 bg-indigo-50">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Typography variant="h3" component="h2" className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </Typography>
            <Typography variant="body1" className="max-w-2xl mx-auto text-gray-700">
              Find quick answers to common questions about our platform and services.
            </Typography>
          </motion.div>

          <Grid container spacing={4} className="max-w-4xl mx-auto">
            <Grid item xs={12} md={6}>
              <Paper elevation={2} className="p-6 h-full rounded-lg">
                <Typography variant="h6" className="font-bold mb-2">
                  How do I start a new case?
                </Typography>
                <Typography variant="body2" className="text-gray-700">
                  To start a new case, log in to your account, click on "New Case" in your dashboard, and follow the
                  guided process to submit your case details and invite the other party.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} className="p-6 h-full rounded-lg">
                <Typography variant="h6" className="font-bold mb-2">
                  How long does the dispute resolution process take?
                </Typography>
                <Typography variant="body2" className="text-gray-700">
                  The timeline varies depending on the complexity of the case and the cooperation of the parties
                  involved. Simple disputes can be resolved in as little as 1-2 weeks, while more complex cases might
                  take 4-8 weeks.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box className="text-center mt-8">
            <Button variant="contained" color="primary" href="/faq" className="px-6 py-2">
              View All FAQs
            </Button>
          </Box>
        </Container>
      </section>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
