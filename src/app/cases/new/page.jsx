"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material"
import { CloudUpload, Delete } from "@mui/icons-material"

export default function NewCasePage() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    desiredOutcome: "",
    opponentEmail: "",
    opponentName: "",
    documents: [],
  })

  const steps = ["Case Details", "Opponent Information", "Supporting Documents", "Review & Submit"]

  const handleNext = () => {
    if (activeStep === 0) {
      if (!formData.title || !formData.type || !formData.description || !formData.desiredOutcome) {
        setError("Please fill in all required fields")
        return
      }
      if (formData.description.split(" ").length > 500) {
        setError("Description must be 500 words or less")
        return
      }
    } else if (activeStep === 1) {
      if (!formData.opponentEmail) {
        setError("Please provide the opponent's email address")
        return
      }
      if (!/\S+@\S+\.\S+/.test(formData.opponentEmail)) {
        setError("Please provide a valid email address")
        return
      }
    }

    setError(null)
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)

    // Check file size (max 5MB)
    const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      setError(`Some files exceed the 5MB limit: ${oversizedFiles.map((f) => f.name).join(", ")}`)
      return
    }

    // Add files to form data
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, ...files],
    }))

    // Reset file input
    e.target.value = null
  }

  const handleRemoveFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      setError(null)

      // In a real app, this would be an API call
      // const formDataToSend = new FormData();
      // Object.keys(formData).forEach(key => {
      //   if (key !== 'documents') {
      //     formDataToSend.append(key, formData[key]);
      //   }
      // });
      // formData.documents.forEach(file => {
      //   formDataToSend.append('documents', file);
      // });

      // const response = await fetch('/api/cases', {
      //   method: 'POST',
      //   body: formDataToSend,
      // });

      // if (!response.ok) throw new Error('Failed to submit case');
      // const data = await response.json();

      // Mock successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccess(true)

      // Redirect to the new case page after a delay
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (err) {
      console.error("Error submitting case:", err)
      setError("Failed to submit case. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" className="mb-4">
              Case Details
            </Typography>
            <TextField
              label="Case Title"
              variant="outlined"
              fullWidth
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mb-4"
              placeholder="e.g., Product Not Delivered, Refund Issue"
            />
            <FormControl fullWidth required className="mb-4">
              <InputLabel>Dispute Type</InputLabel>
              <Select name="type" value={formData.type} label="Dispute Type" onChange={handleChange}>
                <MenuItem value="Consumer">Consumer Dispute</MenuItem>
                <MenuItem value="Contract">Contract Dispute</MenuItem>
                <MenuItem value="Employment">Employment Dispute</MenuItem>
                <MenuItem value="Property">Property Dispute</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={6}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mb-4"
              placeholder="Describe your dispute in detail (max 500 words)"
              helperText={`${formData.description.split(" ").length}/500 words`}
            />
            <TextField
              label="Desired Outcome"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={3}
              name="desiredOutcome"
              value={formData.desiredOutcome}
              onChange={handleChange}
              placeholder="e.g., Full refund, Product replacement, Specific performance"
            />
          </Box>
        )
      case 1:
        return (
          <Box>
            <Typography variant="h6" className="mb-4">
              Opponent Information
            </Typography>
            <Alert severity="info" className="mb-4">
              We'll invite the other party to join the platform and respond to your dispute.
            </Alert>
            <TextField
              label="Opponent's Email"
              variant="outlined"
              fullWidth
              required
              type="email"
              name="opponentEmail"
              value={formData.opponentEmail}
              onChange={handleChange}
              className="mb-4"
              placeholder="email@example.com"
            />
            <TextField
              label="Opponent's Name (Optional)"
              variant="outlined"
              fullWidth
              name="opponentName"
              value={formData.opponentName}
              onChange={handleChange}
              placeholder="Individual or Company Name"
            />
          </Box>
        )
      case 2:
        return (
          <Box>
            <Typography variant="h6" className="mb-4">
              Supporting Documents
            </Typography>
            <Alert severity="info" className="mb-4">
              Upload any documents that support your case (receipts, contracts, communications, etc.).
              <br />
              Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max 5MB per file)
            </Alert>

            <Button variant="outlined" component="label" startIcon={<CloudUpload />} className="mb-4">
              Upload Files
              <input type="file" hidden multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={handleFileChange} />
            </Button>

            {formData.documents.length > 0 ? (
              <List>
                {formData.documents.map((file, index) => (
                  <ListItem key={index} divider>
                    <ListItemText primary={file.name} secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleRemoveFile(index)}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="textSecondary" className="italic">
                No documents uploaded yet
              </Typography>
            )}
          </Box>
        )
      case 3:
        return (
          <Box>
            <Typography variant="h6" className="mb-4">
              Review & Submit
            </Typography>
            <Alert severity="info" className="mb-4">
              Please review your case details before submitting.
            </Alert>

            <Paper variant="outlined" className="p-4 mb-4">
              <Typography variant="subtitle1" className="font-bold">
                Case Details
              </Typography>
              <Divider className="my-2" />
              <Box className="mb-2">
                <Typography variant="subtitle2" className="font-bold">
                  Title:
                </Typography>
                <Typography variant="body2">{formData.title}</Typography>
              </Box>
              <Box className="mb-2">
                <Typography variant="subtitle2" className="font-bold">
                  Type:
                </Typography>
                <Typography variant="body2">{formData.type}</Typography>
              </Box>
              <Box className="mb-2">
                <Typography variant="subtitle2" className="font-bold">
                  Description:
                </Typography>
                <Typography variant="body2">{formData.description}</Typography>
              </Box>
              <Box className="mb-2">
                <Typography variant="subtitle2" className="font-bold">
                  Desired Outcome:
                </Typography>
                <Typography variant="body2">{formData.desiredOutcome}</Typography>
              </Box>
            </Paper>

            <Paper variant="outlined" className="p-4 mb-4">
              <Typography variant="subtitle1" className="font-bold">
                Opponent Information
              </Typography>
              <Divider className="my-2" />
              <Box className="mb-2">
                <Typography variant="subtitle2" className="font-bold">
                  Email:
                </Typography>
                <Typography variant="body2">{formData.opponentEmail}</Typography>
              </Box>
              {formData.opponentName && (
                <Box className="mb-2">
                  <Typography variant="subtitle2" className="font-bold">
                    Name:
                  </Typography>
                  <Typography variant="body2">{formData.opponentName}</Typography>
                </Box>
              )}
            </Paper>

            <Paper variant="outlined" className="p-4">
              <Typography variant="subtitle1" className="font-bold">
                Supporting Documents
              </Typography>
              <Divider className="my-2" />
              {formData.documents.length > 0 ? (
                <List dense>
                  {formData.documents.map((file, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={file.name} secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary" className="italic">
                  No documents uploaded
                </Typography>
              )}
            </Paper>
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Box className="container mx-auto p-4">
      <Paper elevation={2} className="p-6">
        <Typography variant="h4" component="h1" className="font-bold mb-6">
          File a New Case
        </Typography>

        <Stepper activeStep={activeStep} className="mb-8" alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {success ? (
          <Box className="text-center">
            <Alert severity="success" className="mb-4">
              Your case has been submitted successfully! You will be redirected to your dashboard.
            </Alert>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {error && (
              <Alert severity="error" className="mb-4">
                {error}
              </Alert>
            )}

            {renderStepContent(activeStep)}

            <Box className="flex justify-between mt-6">
              <Button variant="outlined" onClick={activeStep === 0 ? () => router.push("/dashboard") : handleBack}>
                {activeStep === 0 ? "Cancel" : "Back"}
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}
                >
                  {loading ? "Submitting..." : "Submit Case"}
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </>
        )}
      </Paper>
    </Box>
  )
}
