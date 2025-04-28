"use client"
import { motion } from "framer-motion"
import { Button } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import Link from "next/link"

export default function HomePageHero() {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Resolve Disputes Online, Efficiently and Fairly</h1>
            <p className="text-xl mb-8">
              Our platform connects disputants with mediators and arbitrators to resolve conflicts without going to
              court.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={Link}
                href="/register"
                endIcon={<ArrowForwardIcon />}
                className="px-6 py-3 rounded-md"
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                component={Link}
                href="/how-it-works"
                className="px-6 py-3 rounded-md border-white"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="/placeholder.svg?height=400&width=500"
              alt="Dispute Resolution Illustration"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
