"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  Chip,
  CircularProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
  Rating,
  Grid,
  Card,
  CardContent,
} from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { format } from "date-fns"

export default function AgreementPage() {
  const { id } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [caseDetails, setCaseDetails] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [agreementText, setAgreementText] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [signature, setSignature] = useState("")
  const [feedback, setFeedback] = useState({
    rating: 0,
    comments: "",
  })
  const [agreementComplete, setAgreementComplete] = useState(false)

  // Mock user data (in a real app, this would come from authentication context)
  const currentUser = {
    id: "user123",
    name: "John Doe",
    role: "disputant",
  }

  const steps = ["Review Agreement", "Sign Agreement", "Provide Feedback", "Complete"]

  useEffect(() => {
    // Fetch case details
    const fetchCaseData = async () => {
      try {
        setLoading(true)

        // In a real app, this would be an API call
        // const response = await fetch(`/api/cases/${id}`);
        // if (!response.ok) throw new Error('Failed to fetch case data');
        // const data = await response.json();

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
          acceptedProposal: {
            type: "Compromise",
            description: "50% refund and expedited shipping of the product within 2 days.",
            amount: 30.0,
          },
        }

        setCaseDetails(caseData)

        // Generate agreement text based on the accepted proposal
        const generatedText = `
SETTLEMENT AGREEMENT

Case ID: ${id}
Date: ${format(new Date(), "MMMM d, yyyy")}

PARTIES:
1. ${caseData.createdBy.name} ("Party A")
2. ${caseData.participants[0].name} ("Party B")

RECITALS:
WHEREAS, Party A filed a dispute regarding "${caseData.title}" on ${format(new Date(caseData.createdAt), "MMMM d, yyyy")};
WHEREAS, the parties have engaged in negotiation and mediation to resolve their dispute;
WHEREAS, the parties wish to settle all claims related to this dispute;

NOW, THEREFORE, in consideration of the mutual promises contained herein, the parties agree as follows:

1. SETTLEMENT TERMS:
   ${caseData.acceptedProposal.type}: ${caseData.acceptedProposal.description}
   ${caseData.acceptedProposal.amount ? `Amount: $${caseData.acceptedProposal.amount}` : ""}

2. PERFORMANCE:
   Party B agrees to fulfill the settlement terms within 7 days of the execution of this agreement.

3. RELEASE:
   Upon full performance of the settlement terms, Party A releases and forever discharges Party B from any and all claims related to this dispute.

4. CONFIDENTIALITY:
   The parties agree to keep the terms of this settlement confidential, except as required by law.

5. ENTIRE AGREEMENT:
   This agreement constitutes the entire understanding between the parties concerning the subject matter hereof.

6. GOVERNING LAW:
   This agreement shall be governed by the laws of [Jurisdiction].

IN WITNESS WHEREOF, the parties have executed this agreement as of the date first written above.
`
        setAgreementText(generatedText)
      } catch (err) {
        console.error("Error fetching case data:", err)
        setError("Failed to load case data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchCaseData()
  }, [id])

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleSignAgreement = async () => {
    if (!signature) {
      setError("Please enter your signature to proceed.")
      return
    }

    try {
      // In a real app, this would be an API call to sign the agreement
      // const response = await fetch(`/api/cases/${id}/sign`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ signature }),
      // });

      // if (!response.ok) throw new Error('Failed to sign agreement');

      // Mock successful signing
      handleNext()
    } catch (err) {
      console.error("Error signing agreement:", err)
      setError("Failed to sign agreement. Please try again.")
    }
  }

  const handleSubmitFeedback = async () => {
    try {
      // In a real app, this would be an API call to submit feedback
      // const response = await fetch(`/api/cases/${id}/feedback`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(feedback),
      // });

      // if (!response.ok) throw new Error('Failed to submit feedback');

      // Mock successful feedback submission
      handleNext()
      setAgreementComplete(true)
    } catch (err) {
      console.error("Error submitting feedback:", err)
      setError("Failed to submit feedback. Please try again.")
    }
  }

  const handleComplete = () => {
    // Redirect to dashboard
    router.push("/dashboard")
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
      <Paper elevation={2} className="p-6 mb-6">
        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h5" component="h1" className="font-bold">
            Settlement Agreement - Case #{id}
          </Typography>
          <Chip
            label={agreementComplete ? "Resolved" : "In Progress"}
            color={agreementComplete ? "success" : "primary"}
          />
        </Box>

        <Stepper activeStep={activeStep} className="mb-6">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider className="mb-6" />

        {activeStep === 0 && (
          <Box>
            <Typography variant="h6" className="mb-4">
              Review the Settlement Agreement
            </Typography>
            <Paper variant="outlined" className="p-4 mb-4 bg-gray-50">
              <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
                {agreementText}
              </Typography>
            </Paper>
            <FormControlLabel
              control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
              label="I have read and agree to the terms of this settlement agreement."
            />
            <Box className="flex justify-between mt-4">
              <Button variant="outlined" onClick={() => router.push(`/cases/${id}`)}>
                Back to Case
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} disabled={!termsAccepted}>
                Next
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="h6" className="mb-4">
              Sign the Agreement
            </Typography>
            <Typography variant="body1" className="mb-4">
              Please type your full name below to electronically sign this agreement.
            </Typography>
            <TextField
              label="Your Signature"
              variant="outlined"
              fullWidth
              required
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="mb-4"
              placeholder="Type your full legal name"
            />
            <Typography variant="body2" color="textSecondary" className="mb-4">
              By typing your name above, you are electronically signing this agreement and acknowledging that you
              understand and agree to its terms.
            </Typography>
            <Box className="flex justify-between mt-4">
              <Button variant="outlined" onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleSignAgreement} disabled={!signature}>
                Sign Agreement
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" className="mb-4">
              Provide Feedback
            </Typography>
            <Typography variant="body1" className="mb-4">
              Please rate your experience with our dispute resolution process and provide any comments or suggestions.
            </Typography>
            <Box className="mb-4">
              <Typography variant="subtitle1" className="mb-1">
                How would you rate your overall experience?
              </Typography>
              <Rating
                name="feedback-rating"
                value={feedback.rating}
                onChange={(event, newValue) => {
                  setFeedback({ ...feedback, rating: newValue })
                }}
                size="large"
              />
            </Box>
            <TextField
              label="Comments (Optional)"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={feedback.comments}
              onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
              className="mb-4"
              placeholder="Please share any comments or suggestions about your experience"
            />
            <Box className="flex justify-between mt-4">
              <Button variant="outlined" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitFeedback}
                disabled={feedback.rating === 0}
              >
                Submit Feedback
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 3 && (
          <Box className="text-center">
            <CheckCircleIcon color="success" style={{ fontSize: 80 }} className="mb-4" />
            <Typography variant="h5" className="mb-2">
              Agreement Complete!
            </Typography>
            <Typography variant="body1" className="mb-6">
              Your dispute has been successfully resolved. Thank you for using our platform.
            </Typography>
            <Grid container spacing={3} className="mb-6">
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" className="mb-2">
                      Case Summary
                    </Typography>
                    <Typography variant="body2">
                      <strong>Case ID:</strong> {id}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Title:</strong> {caseDetails.title}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Filed On:</strong> {format(new Date(caseDetails.createdAt), "MMMM d, yyyy")}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Resolved On:</strong> {format(new Date(), "MMMM d, yyyy")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" className="mb-2">
                      Resolution Terms
                    </Typography>
                    <Typography variant="body2">
                      <strong>Type:</strong> {caseDetails.acceptedProposal.type}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Description:</strong> {caseDetails.acceptedProposal.description}
                    </Typography>
                    {caseDetails.acceptedProposal.amount && (
                      <Typography variant="body2">
                        <strong>Amount:</strong> ${caseDetails.acceptedProposal.amount}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={handleComplete} size="large">
              Return to Dashboard
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  )
}
