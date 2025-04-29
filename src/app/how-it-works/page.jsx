"use client"
import { motion } from "framer-motion"
import { Typography, Container, Grid, Paper, Box, Button, Stepper, Step, StepLabel, StepContent } from "@mui/material"
import Link from "next/link"
import AssignmentIcon from "@mui/icons-material/Assignment"
import PeopleIcon from "@mui/icons-material/People"
import ChatIcon from "@mui/icons-material/Chat"
import HandshakeIcon from "@mui/icons-material/Handshake"
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline"

export default function HowItWorks() {
  const steps = [
    {
      label: "File Your Case",
      description:
        "Create an account and submit your case details through our simple online form. Upload any relevant documents to support your case.",
      icon: <AssignmentIcon className="text-indigo-600" />,
    },
    {
      label: "Invite the Other Party",
      description:
        "We'll send an invitation to the other party to join the platform. Once they accept, you can begin the resolution process.",
      icon: <PeopleIcon className="text-indigo-600" />,
    },
    {
      label: "Negotiate or Mediate",
      description:
        "Start with direct negotiation through our secure platform. If needed, a professional mediator can be assigned to help facilitate a resolution.",
      icon: <ChatIcon className="text-indigo-600" />,
    },
    {
      label: "Reach a Resolution",
      description:
        "Once an agreement is reached, both parties can sign the settlement document electronically. The case is then closed and the resolution is documented.",
      icon: <HandshakeIcon className="text-indigo-600" />,
    },
  ]

  const features = [
    {
      title: "Direct Negotiation",
      description:
        "Our platform provides a structured environment for parties to communicate directly and work toward a resolution without third-party intervention.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Professional Mediation",
      description:
        "When direct negotiation isn't enough, our certified mediators help facilitate discussions and guide parties toward a mutually acceptable solution.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Binding Arbitration",
      description:
        "For cases requiring a definitive decision, our arbitrators review evidence and arguments from both sides and issue a binding decision.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

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
              How It Works
            </Typography>
            <Typography variant="h5" className="mb-6 max-w-3xl mx-auto">
              Our platform makes dispute resolution simple, efficient, and accessible for everyone.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              href="/register"
              className="mt-4 px-8 py-3"
            >
              Get Started
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* Process Steps Section */}
      <section className="py-16">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Typography variant="h3" component="h2" className="text-3xl font-bold mb-4">
              The Dispute Resolution Process
            </Typography>
            <Typography variant="body1" className="max-w-2xl mx-auto text-gray-700">
              Our streamlined process guides you from filing to resolution in just four simple steps.
            </Typography>
          </motion.div>

          <Box className="max-w-3xl mx-auto">
            <Stepper orientation="vertical">
              {steps.map((step, index) => (
                <Step active={true} key={index}>
                  <StepLabel
                    StepIconComponent={() => (
                      <Box className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center">
                        {step.icon}
                      </Box>
                    )}
                  >
                    <Typography variant="h6" className="font-bold">
                      {step.label}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body1" className="text-gray-700 mb-4">
                      {step.description}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Container>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white">
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Typography variant="h3" component="h2" className="text-3xl font-bold mb-4">
                  See Our Platform in Action
                </Typography>
                <Typography variant="body1" className="mb-6 text-gray-700">
                  Watch this short video to see how our platform works and how it can help you resolve your dispute
                  quickly and efficiently.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={<PlayCircleOutlineIcon />}
                  className="px-6 py-2"
                >
                  Watch Demo
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Paper elevation={3} className="relative aspect-video">
                  <Box className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
                    <PlayCircleOutlineIcon fontSize="large" className="text-indigo-600" />
                    <Typography variant="body2" className="ml-2">
                      Video Demo
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Resolution Methods Section */}
      <section className="py-16">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Typography variant="h3" component="h2" className="text-3xl font-bold mb-4">
              Our Resolution Methods
            </Typography>
            <Typography variant="body1" className="max-w-2xl mx-auto text-gray-700">
              We offer multiple approaches to dispute resolution, allowing you to choose the method that best fits your
              needs.
            </Typography>
          </motion.div>

          <Grid container spacing={6}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper elevation={2} className="h-full overflow-hidden rounded-lg">
                    <img
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      className="w-full h-48 object-cover"
                    />
                    <Box className="p-6">
                      <Typography variant="h5" className="font-bold mb-2">
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
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
              Have questions about our process? Here are some common questions and answers.
            </Typography>
          </motion.div>

          <Box className="max-w-3xl mx-auto">
            <Paper elevation={2} className="p-6 mb-4 rounded-lg">
              <Typography variant="h6" className="font-bold mb-2">
                How long does the dispute resolution process take?
              </Typography>
              <Typography variant="body2" className="text-gray-700">
                The timeline varies depending on the complexity of the case and the cooperation of the parties involved.
                Simple disputes can be resolved in as little as 1-2 weeks, while more complex cases might take 4-8
                weeks. Our process is significantly faster than traditional court proceedings, which can take months or
                years.
              </Typography>
            </Paper>

            <Paper elevation={2} className="p-6 mb-4 rounded-lg">
              <Typography variant="h6" className="font-bold mb-2">
                Is the dispute resolution process legally binding?
              </Typography>
              <Typography variant="body2" className="text-gray-700">
                It depends on the process you choose. Mediation results in an agreement that becomes binding once signed
                by all parties. Arbitration decisions are typically legally binding and enforceable in court. Our
                platform ensures all agreements comply with relevant laws and regulations to maximize enforceability.
              </Typography>
            </Paper>

            <Paper elevation={2} className="p-6 rounded-lg">
              <Typography variant="h6" className="font-bold mb-2">
                How much does it cost to use your platform?
              </Typography>
              <Typography variant="body2" className="text-gray-700">
                Our fee structure is transparent and typically much lower than traditional litigation costs. We charge a
                case filing fee plus mediator/arbitrator fees based on the complexity and duration of the case. Detailed
                pricing information is available during the case submission process, and costs are often split between
                the parties.
              </Typography>
            </Paper>

            <Box className="text-center mt-8">
              <Button variant="contained" color="primary" component={Link} href="/faq" className="px-6 py-2">
                View All FAQs
              </Button>
            </Box>
          </Box>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-700 text-white">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Typography variant="h3" component="h2" className="text-3xl font-bold mb-4">
              Ready to Resolve Your Dispute?
            </Typography>
            <Typography variant="body1" className="mb-8 max-w-2xl mx-auto">
              Join thousands of users who have successfully resolved their disputes through our platform. Get started
              today and find a fair resolution without the hassle of court proceedings.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              href="/register"
              className="px-8 py-3"
            >
              Start Your Case Now
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
