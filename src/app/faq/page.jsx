"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Divider,
} from "@mui/material"
import { ExpandMore, Search } from "@mui/icons-material"

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "general", label: "General" },
    { id: "account", label: "Account & Registration" },
    { id: "process", label: "Dispute Process" },
    { id: "payment", label: "Payments & Fees" },
    { id: "technical", label: "Technical Support" },
  ]

  const faqs = [
    {
      id: 1,
      question: "What types of disputes can be resolved on your platform?",
      answer:
        "Our platform can handle a wide range of disputes including contract disagreements, employment issues, property disputes, consumer complaints, intellectual property conflicts, and more. If you're unsure whether your dispute is suitable for our platform, please contact us for guidance.",
      category: "general",
    },
    {
      id: 2,
      question: "How long does the dispute resolution process typically take?",
      answer:
        "The timeline varies depending on the complexity of the case and the cooperation of the parties involved. Simple disputes can be resolved in as little as 1-2 weeks, while more complex cases might take 4-8 weeks. Our process is significantly faster than traditional court proceedings, which can take months or years.",
      category: "process",
    },
    {
      id: 3,
      question: "Who are the mediators and arbitrators on your platform?",
      answer:
        "Our mediators and arbitrators are experienced professionals with relevant qualifications in dispute resolution. Many have legal backgrounds or industry-specific expertise. All undergo a rigorous vetting process and must maintain high ethical standards. You can view detailed profiles of available neutrals before selecting one for your case.",
      category: "general",
    },
    {
      id: 4,
      question: "Is the dispute resolution process legally binding?",
      answer:
        "It depends on the process you choose. Mediation results in an agreement that becomes binding once signed by all parties. Arbitration decisions are typically legally binding and enforceable in court. Our platform ensures all agreements comply with relevant laws and regulations to maximize enforceability.",
      category: "process",
    },
    {
      id: 5,
      question: "How much does it cost to use your platform?",
      answer:
        "Our fee structure is transparent and typically much lower than traditional litigation costs. We charge a case filing fee plus mediator/arbitrator fees based on the complexity and duration of the case. Detailed pricing information is available during the case submission process, and costs are often split between the parties.",
      category: "payment",
    },
    {
      id: 6,
      question: "Is my information kept confidential?",
      answer:
        "Yes, confidentiality is a cornerstone of our platform. All communications and documents shared during the process are protected by strict confidentiality protocols. Our system uses end-to-end encryption, and all participants agree to confidentiality terms before proceeding.",
      category: "general",
    },
    {
      id: 7,
      question: "How do I create an account?",
      answer:
        "Creating an account is simple. Click the 'Register' button in the top right corner of our homepage, fill out the registration form with your basic information, verify your email address, and complete your profile. The entire process takes less than 5 minutes.",
      category: "account",
    },
    {
      id: 8,
      question: "Can I use the platform on my mobile device?",
      answer:
        "Yes, our platform is fully responsive and works on all modern mobile devices. You can access all features through your mobile browser, or download our dedicated mobile app for iOS and Android for an optimized experience.",
      category: "technical",
    },
    {
      id: 9,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and bank transfers. For business accounts, we also offer invoicing options. All payments are processed securely through our payment processor.",
      category: "payment",
    },
    {
      id: 10,
      question: "What if the other party refuses to participate?",
      answer:
        "While we cannot force participation, we have a high acceptance rate due to the benefits of our platform compared to traditional litigation. If the other party declines, we can provide documentation of your good-faith attempt to resolve the dispute, which may be valuable in subsequent proceedings.",
      category: "process",
    },
    {
      id: 11,
      question: "Can I have my lawyer participate in the process?",
      answer:
        "Yes, you can have legal representation throughout the process. Our platform allows you to add your lawyer as a participant in your case, giving them access to all communications and documents. However, many users find they don't need legal representation due to the straightforward nature of our process.",
      category: "process",
    },
    {
      id: 12,
      question: "What technical requirements are needed to use the platform?",
      answer:
        "Our platform works on any modern web browser (Chrome, Firefox, Safari, Edge) with a stable internet connection. For video conferencing features, you'll need a webcam and microphone. We recommend a minimum internet speed of 5 Mbps for the best experience.",
      category: "technical",
    },
  ]

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || faq.category === activeCategory

    return matchesSearch && matchesCategory
  })

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
              Frequently Asked Questions
            </Typography>
            <Typography variant="h5" className="mb-6 max-w-3xl mx-auto">
              Find answers to common questions about our dispute resolution platform and process.
            </Typography>
          </motion.div>
        </Container>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12">
        <Container maxWidth="lg">
          <Box className="max-w-3xl mx-auto">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for questions or keywords..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              className="mb-8"
            />

            <Box className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.label}
                  onClick={() => handleCategoryChange(category.id)}
                  color={activeCategory === category.id ? "primary" : "default"}
                  variant={activeCategory === category.id ? "filled" : "outlined"}
                  className="text-sm"
                />
              ))}
            </Box>

            <Divider className="mb-8" />

            {filteredFaqs.length === 0 ? (
              <Box className="text-center py-12">
                <Typography variant="h6" className="mb-2">
                  No results found
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  Try adjusting your search or filter to find what you're looking for.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("all")
                  }}
                  className="mt-4"
                >
                  Clear filters
                </Button>
              </Box>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {filteredFaqs.map((faq) => (
                  <Accordion key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls={`panel${faq.id}-content`}
                      id={`panel${faq.id}-header`}
                      className="bg-white"
                    >
                      <Typography variant="h6" className="font-medium">
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="bg-gray-50">
                      <Typography variant="body1" className="text-gray-700">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </motion.div>
            )}
          </Box>
        </Container>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 bg-indigo-50">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Typography variant="h3" component="h2" className="text-3xl font-bold mb-4">
              Still Have Questions?
            </Typography>
            <Typography variant="body1" className="mb-8 max-w-2xl mx-auto text-gray-700">
              If you couldn't find the answer you were looking for, our support team is here to help. Contact us and
              we'll get back to you as soon as possible.
            </Typography>
            <Button variant="contained" color="primary" size="large" href="/contact" className="px-8 py-3">
              Contact Support
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
