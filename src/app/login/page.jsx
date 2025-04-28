"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { TextField, Button, Typography, Paper, Box, Divider, InputAdornment, IconButton, Alert } from "@mui/material"
import { Google, Facebook, Visibility, VisibilityOff } from "@mui/icons-material"
import { motion } from "framer-motion"

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // In a real app, this would be an API call to your backend
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // if (!response.ok) throw new Error('Login failed');
      // const data = await response.json();

      // Mock successful login
      setTimeout(() => {
        // Redirect to dashboard after successful login
        router.push("/dashboard")
      }, 1500)
    } catch (err) {
      setError(err.message || "Failed to login. Please try again.")
    } finally {
      setLoading(false)
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
              Welcome Back
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sign in to access your account
            </Typography>
          </div>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Box className="flex items-center justify-between">
              <Typography variant="body2">
                <Link href="/forgot-password" className="text-indigo-600 hover:text-indigo-800">
                  Forgot password?
                </Link>
              </Typography>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              className="py-3"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

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

          <Typography variant="body2" className="text-center mt-6">
            Don't have an account?{" "}
            <Link href="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign up
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </div>
  )
}
