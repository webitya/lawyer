"use client"
import { motion } from "framer-motion"
import { Typography, Container, Grid, Paper, Box, Button } from "@mui/material"
import GavelIcon from "@mui/icons-material/Gavel"
import ChatIcon from "@mui/icons-material/Chat"
import DescriptionIcon from "@mui/icons-material/Description"
import SecurityIcon from "@mui/icons-material/Security"
import VideoCallIcon from "@mui/icons-material/VideoCall"
import PaymentIcon from "@mui/icons-material/Payment"
import Link from "next/link"

export default function Services() {
  const services = [
    {
      icon: <ChatIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Negotiation",
      description:
        "Our platform provides a structured environment for direct communication between parties to resolve disputes quickly and amicably without third-party intervention.",
      features: [
        "Real-time messaging system",
        "Document sharing capabilities",
        "Settlement proposal tools",
        "Automated reminders and deadlines",
      ],
      price: "$99",
      period: "per case",
    },
    {
      icon: <GavelIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Mediation",
      description:
        "Professional mediators help facilitate discussions and guide parties to a resolution. Our mediators are certified and experienced in various dispute types.",
      features: [
        "Mediator matching algorithm",
        "Video conferencing tools",
        "Private and group communication channels",
        "Legally binding agreement templates",
      ],
      price: "$299",
      period: "per case",
      featured: true,
    },
    {
      icon: <DescriptionIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Document Management",
      description:
        "Secure storage and sharing of case documents with digital signature capabilities. Keep all your case-related documents organized in one place.",
      features: [
        "Secure document storage",
        "Version control system",
        "Digital signature integration",
        "Document access controls",
      ],
      price: "$49",
      period: "per month",
    },
    {
      icon: <VideoCallIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Virtual Hearings",
      description:
        "Conduct hearings and meetings online with our integrated video conferencing system. Record sessions and share screens for effective communication.",
      features: [
        "HD video conferencing",
        "Screen sharing capabilities",
        "Session recording",
        "Integrated scheduling system",
      ],
      price: "$149",
      period: "per session",
    },
    {
      icon: <SecurityIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Secure Platform",
      description:
        "End-to-end encryption and role-based access control to protect sensitive information. Our platform meets the highest security standards.",
      features: [
        "End-to-end encryption",
        "Role-based access control",
        "Audit logs and activity tracking",
        "Compliance with data protection regulations",
      ],
      price: "Included",
      period: "with all plans",
    },
    {
      icon: <PaymentIcon fontSize="large" style={{ color: "#7c3aed" }} />,
      title: "Payment Processing",
      description:
        "Secure payment processing for fees, settlements, and escrow services. Transparent fee structure with no hidden costs.",
      features: ["Multiple payment methods", "Escrow services", "Automated invoicing", "Payment tracking and history"],
      price: "2.5%",
      period: "transaction fee",
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
              Our Services
            </Typography>
            <Typography variant="h5" className="mb-6 max-w-3xl mx-auto">
              Comprehensive dispute resolution services tailored to your needs
            </Typography>
          </motion.div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={service.featured ? 8 : 2}
                    className={`p-6 h-full flex flex-col rounded-lg ${
                      service.featured ? "border-2 border-indigo-500" : ""
                    }`}
                    style={{ height: "100%" }}
                  >
                    {service.featured && (
                      <Box
                        className="absolute top-0 right-0 px-4 py-1 rounded-bl-lg rounded-tr-lg font-medium text-sm"
                        style={{ backgroundColor: "#7c3aed", color: "white" }}
                      >
                        Most Popular
                      </Box>
                    )}
                    <Box className="mb-4">{service.icon}</Box>
                    <Typography variant="h5" component="h3" className="mb-2 font-bold">
                      {service.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-4 flex-grow">
                      {service.description}
                    </Typography>
                    <Box className="mb-4">
                      <Typography variant="h4" component="p" className="font-bold">
                        {service.price}
                        <Typography variant="body2" component="span" className="text-gray-500 ml-1">
                          {service.period}
                        </Typography>
                      </Typography>
                    </Box>
                    <Box className="mb-6">
                      <Typography variant="subtitle2" className="font-bold mb-2">
                        Features:
                      </Typography>
                      <ul className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2 text-green-500">✓</span>
                            <Typography variant="body2">{feature}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                    <Button
                      variant={service.featured ? "contained" : "outlined"}
                      fullWidth
                      component={Link}
                      href="/register"
                      sx={{
                        backgroundColor: service.featured ? "#7c3aed" : "transparent",
                        borderColor: "#7c3aed",
                        color: service.featured ? "white" : "#7c3aed",
                        "&:hover": {
                          backgroundColor: service.featured ? "#6d28d9" : "rgba(124, 58, 237, 0.04)",
                        },
                        marginTop: "auto",
                      }}
                    >
                      Get Started
                    </Button>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Custom Solutions Section */}
      <section className="py-16 bg-gray-100">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Typography variant="h3" component="h2" className="text-3xl font-bold mb-4">
              Need a Custom Solution?
            </Typography>
            <Typography variant="body1" className="max-w-2xl mx-auto text-gray-700">
              We understand that every dispute is unique. Contact us to discuss how we can tailor our services to meet
              your specific needs.
            </Typography>
          </motion.div>

          <Box className="text-center">
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/contact"
              sx={{
                backgroundColor: "#1a365d",
                "&:hover": {
                  backgroundColor: "#0f2744",
                },
                padding: "12px 32px",
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </section>

      {/* Testimonials Preview */}
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
              What Our Clients Say
            </Typography>
          </motion.div>

          <Paper elevation={2} className="p-8 rounded-lg">
            <Box className="flex flex-col items-center text-center">
              <Typography variant="body1" className="italic mb-4 text-gray-700">
                "The dispute resolution platform helped me resolve a contract issue with a supplier in just two weeks.
                The mediator was professional and guided us to a fair solution without the need for costly litigation."
              </Typography>
              <Typography variant="h6" component="p" className="font-bold">
                Sarah Johnson
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Business Owner
              </Typography>
            </Box>
          </Paper>

          <Box className="text-center mt-8">
            <Button
              variant="outlined"
              component={Link}
              href="/testimonials"
              sx={{
                borderColor: "#7c3aed",
                color: "#7c3aed",
                "&:hover": {
                  borderColor: "#6d28d9",
                  backgroundColor: "rgba(124, 58, 237, 0.04)",
                },
              }}
            >
              Read More Testimonials
            </Button>
          </Box>
        </Container>
      </section>
    </div>
  )
}
