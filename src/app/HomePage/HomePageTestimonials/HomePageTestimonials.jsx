"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Typography, Paper, Avatar, Box, IconButton } from "@mui/material"
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"

export default function HomePageTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Owner",
      image: null,
      content:
        "The dispute resolution platform helped me resolve a contract issue with a supplier in just two weeks. The mediator was professional and guided us to a fair solution without the need for costly litigation.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "HR Director",
      image: null,
      content:
        "As an HR director, I've used this platform for several employment disputes. The structured negotiation process and professional mediators have saved us time and preserved relationships with former employees.",
    },
    {
      id: 3,
      name: "Rebecca Torres",
      role: "Property Manager",
      image: null,
      content:
        "I was skeptical at first, but this platform helped resolve a complex property dispute that had been ongoing for months. The online mediation was convenient and effective, and the settlement was fair to all parties.",
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Small Business Owner",
      image: null,
      content:
        "When a client refused to pay for services rendered, I turned to this platform instead of going to court. Within three weeks, we reached an agreement that worked for both parties. I highly recommend this service.",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Typography variant="h2" component="h2" className="text-3xl font-bold mb-4">
            What Our Users Say
          </Typography>
          <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
            Hear from individuals and businesses who have successfully resolved their disputes through our platform.
          </Typography>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <IconButton
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-100"
            aria-label="Previous testimonial"
          >
            <ArrowBackIos />
          </IconButton>

          <motion.div
            key={testimonials[activeIndex].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Paper elevation={2} className="p-8 rounded-lg">
              <Box className="flex flex-col items-center text-center">
                <Avatar
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  className="w-20 h-20 mb-4"
                  sx={{ width: 80, height: 80 }}
                >
                  {testimonials[activeIndex].name.charAt(0)}
                </Avatar>
                <Typography variant="h6" component="h3" className="mb-1 font-bold">
                  {testimonials[activeIndex].name}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" className="mb-4">
                  {testimonials[activeIndex].role}
                </Typography>
                <Typography variant="body1" className="italic">
                  "{testimonials[activeIndex].content}"
                </Typography>
              </Box>
            </Paper>
          </motion.div>

          <IconButton
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-100"
            aria-label="Next testimonial"
          >
            <ArrowForwardIos />
          </IconButton>

          <Box className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-indigo-600" : "bg-gray-300"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </Box>
        </div>
      </div>
    </section>
  )
}
