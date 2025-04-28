"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Typography, Accordion, AccordionSummary, AccordionDetails, Box } from "@mui/material"
import { ExpandMore } from "@mui/icons-material"

export default function HomePageFAQ() {
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const faqs = [
    {
      id: "panel1",
      question: "What types of disputes can be resolved on your platform?",
      answer:
        "Our platform can handle a wide range of disputes including contract disagreements, employment issues, property disputes, consumer complaints, intellectual property conflicts, and more. If you're unsure whether your dispute is suitable for our platform, please contact us for guidance.",
    },
    {
      id: "panel2",
      question: "How long does the dispute resolution process typically take?",
      answer:
        "The timeline varies depending on the complexity of the case and the cooperation of the parties involved. Simple disputes can be resolved in as little as 1-2 weeks, while more complex cases might take 4-8 weeks. Our process is significantly faster than traditional court proceedings, which can take months or years.",
    },
    {
      id: "panel3",
      question: "Who are the mediators and arbitrators on your platform?",
      answer:
        "Our mediators and arbitrators are experienced professionals with relevant qualifications in dispute resolution. Many have legal backgrounds or industry-specific expertise. All undergo a rigorous vetting process and must maintain high ethical standards. You can view detailed profiles of available neutrals before selecting one for your case.",
    },
    {
      id: "panel4",
      question: "Is the dispute resolution process legally binding?",
      answer:
        "It depends on the process you choose. Mediation results in an agreement that becomes binding once signed by all parties. Arbitration decisions are typically legally binding and enforceable in court. Our platform ensures all agreements comply with relevant laws and regulations to maximize enforceability.",
    },
    {
      id: "panel5",
      question: "How much does it cost to use your platform?",
      answer:
        "Our fee structure is transparent and typically much lower than traditional litigation costs. We charge a case filing fee plus mediator/arbitrator fees based on the complexity and duration of the case. Detailed pricing information is available during the case submission process, and costs are often split between the parties.",
    },
    {
      id: "panel6",
      question: "Is my information kept confidential?",
      answer:
        "Yes, confidentiality is a cornerstone of our platform. All communications and documents shared during the process are protected by strict confidentiality protocols. Our system uses end-to-end encryption, and all participants agree to confidentiality terms before proceeding.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Typography variant="h2" component="h2" className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our dispute resolution platform and process.
          </Typography>
        </motion.div>

        <Box className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Accordion
                expanded={expanded === faq.id}
                onChange={handleChange(faq.id)}
                className="mb-4 shadow-sm border border-gray-200 rounded-lg overflow-hidden"
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`${faq.id}-content`}
                  id={`${faq.id}-header`}
                  className="bg-gray-50"
                >
                  <Typography variant="h6" className="font-medium">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" className="text-gray-700">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>
      </div>
    </section>
  )
}
