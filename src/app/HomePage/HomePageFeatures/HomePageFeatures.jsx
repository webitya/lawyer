"use client"
import { motion } from "framer-motion"
import { Paper, Typography } from "@mui/material"
import GavelIcon from "@mui/icons-material/Gavel"
import ChatIcon from "@mui/icons-material/Chat"
import DescriptionIcon from "@mui/icons-material/Description"
import SecurityIcon from "@mui/icons-material/Security"

export default function HomePageFeatures() {
  const features = [
    {
      icon: <ChatIcon fontSize="large" className="text-indigo-600" />,
      title: "Negotiation",
      description: "Direct communication between parties to resolve disputes quickly and amicably.",
    },
    {
      icon: <GavelIcon fontSize="large" className="text-indigo-600" />,
      title: "Mediation",
      description: "Professional mediators help facilitate discussions and guide parties to a resolution.",
    },
    {
      icon: <DescriptionIcon fontSize="large" className="text-indigo-600" />,
      title: "Document Management",
      description: "Secure storage and sharing of case documents with digital signature capabilities.",
    },
    {
      icon: <SecurityIcon fontSize="large" className="text-indigo-600" />,
      title: "Secure Platform",
      description: "End-to-end encryption and role-based access control to protect sensitive information.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Typography variant="h2" component="h2" className="text-3xl font-bold mb-4">
            Our Platform Features
          </Typography>
          <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive tools to streamline the dispute resolution process from filing to resolution.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Paper elevation={2} className="p-6 h-full flex flex-col items-center text-center rounded-lg">
                <div className="mb-4">{feature.icon}</div>
                <Typography variant="h5" component="h3" className="mb-2 font-bold">
                  {feature.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {feature.description}
                </Typography>
              </Paper>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
