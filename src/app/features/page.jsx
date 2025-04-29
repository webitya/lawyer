"use client"
import { motion } from "framer-motion"
import { Typography, Container, Grid, Paper, Box, Button } from "@mui/material"
import Link from "next/link"
import GavelIcon from "@mui/icons-material/Gavel"
import ChatIcon from "@mui/icons-material/Chat"
import DescriptionIcon from "@mui/icons-material/Description"
import SecurityIcon from "@mui/icons-material/Security"
import VideoCallIcon from "@mui/icons-material/VideoCall"
import PaymentIcon from "@mui/icons-material/Payment"
import PeopleIcon from "@mui/icons-material/People"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"
import AnalyticsIcon from "@mui/icons-material/Analytics"
import DevicesIcon from "@mui/icons-material/Devices"
import TranslateIcon from "@mui/icons-material/Translate"

export default function Features() {
  const features = [
    {
      icon: <ChatIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Negotiation Module",
      description:
        "Direct communication between parties to resolve disputes quickly and amicably through our secure platform.",
      details: [
        "Real-time messaging system",
        "Document sharing capabilities",
        "Settlement proposal tools",
        "Automated reminders and deadlines",
      ],
    },
    {
      icon: <GavelIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Mediation Module",
      description:
        "Professional mediators help facilitate discussions and guide parties to a resolution through our structured mediation process.",
      details: [
        "Mediator matching algorithm",
        "Video conferencing tools",
        "Private and group communication channels",
        "Legally binding agreement templates",
      ],
    },
    {
      icon: <PeopleIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "User Authentication & Role Management",
      description: "Comprehensive user management system with multiple roles and secure authentication methods.",
      details: [
        "Multiple user roles (disputants, lawyers, mediators, arbitrators, admins)",
        "Secure login with 2FA and social logins",
        "Role-based access control (RBAC)",
        "Detailed user profiles",
      ],
    },
    {
      icon: <DescriptionIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Document Management",
      description:
        "Secure storage and sharing of case documents with digital signature capabilities and version control.",
      details: [
        "Secure document storage",
        "Digital signature integration",
        "Document access controls",
        "Version history tracking",
      ],
    },
    {
      icon: <CalendarMonthIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Online Hearing & Scheduling",
      description:
        "Integrated calendar and scheduling system for hearings, meetings, and deadlines with automated reminders.",
      details: [
        "Calendar integration (Google Calendar, Outlook)",
        "Scheduling tool for mediation sessions",
        "Automated reminders",
        "Conflict detection",
      ],
    },
    {
      icon: <VideoCallIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Video Conferencing",
      description: "Built-in video conferencing capabilities for virtual hearings, mediation sessions, and meetings.",
      details: [
        "HD video conferencing",
        "Screen sharing capabilities",
        "Session recording",
        "Breakout rooms for private discussions",
      ],
    },
    {
      icon: <NotificationsActiveIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Notifications & Alerts",
      description: "Comprehensive notification system to keep all parties informed about case updates and deadlines.",
      details: [
        "Email notifications",
        "In-app alerts",
        "SMS notifications (optional)",
        "Customizable notification preferences",
      ],
    },
    {
      icon: <PaymentIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Payments & Invoicing",
      description:
        "Secure payment processing for platform fees, mediator services, and settlements with automated invoicing.",
      details: ["Multiple payment methods", "Escrow services", "Automated invoicing", "Payment tracking and history"],
    },
    {
      icon: <SecurityIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Security & Compliance",
      description:
        "Enterprise-grade security features to protect sensitive data and ensure compliance with regulations.",
      details: [
        "End-to-end encryption",
        "Role-based access control",
        "Audit logs and activity tracking",
        "Compliance with data protection regulations",
      ],
    },
    {
      icon: <AnalyticsIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Analytics & Reporting",
      description:
        "Comprehensive analytics and reporting tools to track case progress, resolution rates, and platform usage.",
      details: [
        "Case analytics dashboard",
        "Resolution rate tracking",
        "User activity reports",
        "Custom report generation",
      ],
    },
    {
      icon: <DevicesIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Multi-Device Support",
      description:
        "Access the platform from any device with a responsive design that works on desktop, tablet, and mobile.",
      details: [
        "Responsive web design",
        "Progressive web app capabilities",
        "Offline mode for document access",
        "Synchronized data across devices",
      ],
    },
    {
      icon: <TranslateIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Language Support",
      description: "Support for multiple languages to facilitate dispute resolution across international boundaries.",
      details: [
        "Interface translation",
        "Document translation assistance",
        "Multi-language mediator matching",
        "Cultural context awareness",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section style={{ backgroundColor: "#1a365d" }} className="text-white py-20">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Typography variant="h2" component="h1" className="text-4xl md:text-5xl font-bold mb-4">
              Platform Features
            </Typography>
            <Typography variant="h5" className="mb-6 max-w-3xl mx-auto">
              Comprehensive tools to streamline the dispute resolution process from filing to resolution
            </Typography>
          </motion.div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper elevation={2} className="p-6 h-full flex flex-col rounded-lg" style={{ height: "100%" }}>
                    <Box className="mb-4">{feature.icon}</Box>
                    <Typography variant="h5" component="h3" className="mb-2 font-bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-4">
                      {feature.description}
                    </Typography>
                    <Box className="mt-auto">
                      <Typography variant="subtitle2" className="font-bold mb-2">
                        Key Capabilities:
                      </Typography>
                      <ul className="space-y-1">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2 text-green-500">✓</span>
                            <Typography variant="body2">{detail}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: "#7c3aed" }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <Typography variant="h3" component="h2" className="text-3xl font-bold mb-4">
              Ready to Experience These Features?
            </Typography>
            <Typography variant="body1" className="mb-8 max-w-2xl mx-auto">
              Join thousands of users who have successfully resolved their disputes through our platform. Get started
              today and find a fair resolution without the hassle of court proceedings.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/register"
              sx={{
                backgroundColor: "white",
                color: "#7c3aed",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
                padding: "12px 32px",
              }}
            >
              Sign Up Now
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* Comparison Section */}
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
              Why Choose Our Platform?
            </Typography>
            <Typography variant="body1" className="max-w-2xl mx-auto text-gray-700">
              See how our platform compares to traditional litigation and other dispute resolution methods.
            </Typography>
          </motion.div>

          <Box className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b text-left">Feature</th>
                  <th className="py-3 px-4 border-b text-center">Our Platform</th>
                  <th className="py-3 px-4 border-b text-center">Traditional Litigation</th>
                  <th className="py-3 px-4 border-b text-center">Other Online Services</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b">Average Resolution Time</td>
                  <td className="py-3 px-4 border-b text-center text-green-600 font-medium">2-4 weeks</td>
                  <td className="py-3 px-4 border-b text-center text-red-600">6-18 months</td>
                  <td className="py-3 px-4 border-b text-center">1-3 months</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b">Cost</td>
                  <td className="py-3 px-4 border-b text-center text-green-600 font-medium">$99-$499</td>
                  <td className="py-3 px-4 border-b text-center text-red-600">$10,000+</td>
                  <td className="py-3 px-4 border-b text-center">$500-$2,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b">Professional Mediators</td>
                  <td className="py-3 px-4 border-b text-center text-green-600 font-medium">✓</td>
                  <td className="py-3 px-4 border-b text-center">Varies</td>
                  <td className="py-3 px-4 border-b text-center">Limited</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b">Document Management</td>
                  <td className="py-3 px-4 border-b text-center text-green-600 font-medium">✓</td>
                  <td className="py-3 px-4 border-b text-center">Manual</td>
                  <td className="py-3 px-4 border-b text-center">Basic</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b">Video Conferencing</td>
                  <td className="py-3 px-4 border-b text-center text-green-600 font-medium">✓</td>
                  <td className="py-3 px-4 border-b text-center">Limited</td>
                  <td className="py-3 px-4 border-b text-center">Varies</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b">Relationship Preservation</td>
                  <td className="py-3 px-4 border-b text-center text-green-600 font-medium">High</td>
                  <td className="py-3 px-4 border-b text-center text-red-600">Low</td>
                  <td className="py-3 px-4 border-b text-center">Medium</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Container>
      </section>
    </div>
  )
}
