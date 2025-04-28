"use client"
import { motion } from "framer-motion"
import { Button, Typography } from "@mui/material"
import Link from "next/link"

export default function HomePageCTA() {
  return (
    <section className="py-20 bg-indigo-700 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Typography variant="h2" component="h2" className="text-3xl font-bold mb-4">
            Ready to Resolve Your Dispute?
          </Typography>
          <Typography variant="body1" className="mb-8 max-w-2xl mx-auto">
            Join thousands of users who have successfully resolved their disputes through our platform. Get started
            today and find a fair resolution without the hassle of court proceedings.
          </Typography>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              href="/register"
              className="px-8 py-3 rounded-md"
            >
              Sign Up Now
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              component={Link}
              href="/contact"
              className="px-8 py-3 rounded-md border-white"
            >
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
