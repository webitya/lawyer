"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Divider,
  InputAdornment,
  IconButton,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material"
import { Google, Facebook, Visibility, VisibilityOff } from "@mui/icons-material"
import { motion } from "framer-motion"

export default function Register() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    organization: "",
    phone: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const steps = ["Account Details", "Personal Information", "Confirmation"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate first step
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all required fields")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long")
        return
      }
    } else if (activeStep === 1) {
      // Validate second step
      if (!formData.firstName || !formData.lastName || !formData.role) {
        setError("Please fill in all required fields")
        return
      }
    }

    setError("")
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // In a real app, this would be an API call to your backend
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // if (!response.ok) throw new Error('Registration failed');
      // const data = await response.json();

      // Mock successful registration
      setTimeout(() => {
        // Redirect to login after successful registration
        router.push("/login")
      }, 1500)
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
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

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              required
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              required
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>
        )
      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              required
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />

            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              required
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />

            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select name="role" value={formData.role} label="Role" onChange={handleChange}>
                <MenuItem value="disputant">Disputant (Party in a dispute)</MenuItem>
                <MenuItem value="mediator">Mediator</MenuItem>
                <MenuItem value="lawyer">Lawyer</MenuItem>
                <MenuItem value="arbitrator">Arbitrator</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Organization (Optional)"
              variant="outlined"
              fullWidth
              name="organization"
              value={formData.organization}
              onChange={handleChange}
            />

            <TextField
              label="Phone Number (Optional)"
              variant="outlined"
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </motion.div>
        )
      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <Typography variant="h6" className="font-medium">
              Review Your Information
            </Typography>

            <Box className="bg-gray-50 p-4 rounded-md">
              <Typography variant="body2" className="mb-2">
                <strong>Name:</strong> {formData.firstName} {formData.lastName}
              </Typography>
              <Typography variant="body2" className="mb-2">
                <strong>Email:</strong> {formData.email}
              </Typography>
              <Typography variant="body2" className="mb-2">
                <strong>Role:</strong> {formData.role}
              </Typography>
              {formData.organization && (
                <Typography variant="body2" className="mb-2">
                  <strong>Organization:</strong> {formData.organization}
                </Typography>
              )}
              {formData.phone && (
                <Typography variant="body2">
                  <strong>Phone:</strong> {formData.phone}
                </Typography>
              )}
            </Box>

            <Typography variant="body2" className="text-gray-600">
              By clicking "Complete Registration", you agree to our Terms of Service and Privacy Policy.
            </Typography>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Paper elevation={3} className="p-8 rounded-lg">
          <div className="text-center mb-6">
            <Typography variant="h4" component="h1" className="font-bold text-gray-900">
              Create an Account
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Join our dispute resolution platform
            </Typography>
          </div>

          <Stepper activeStep={activeStep} className="mb-6">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : (e) => e.preventDefault()}>
            {renderStepContent(activeStep)}

            <Box className="flex justify-between mt-6">
              <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                Back
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  {loading ? "Processing..." : "Complete Registration"}
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </form>

          {activeStep === 0 && (
            <>
              <Divider className="my-6">
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </Divider>

              <div className="space-y-3">
                <Button fullWidth variant="outlined" startIcon={<Google />} className="py-2.5">
                  Continue with Google
                </Button>

                <Button fullWidth variant="outlined" startIcon={<Facebook />} className="py-2.5">
                  Continue with Facebook
                </Button>
              </div>
            </>
          )}

          <Typography variant="body2" className="text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign in
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </div>
  )
}
