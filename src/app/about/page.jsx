"use client"
import { motion } from "framer-motion"
import { Typography, Container, Grid, Paper, Avatar, Box, Divider } from "@mui/material"
import BalanceIcon from "@mui/icons-material/Balance"
import PeopleIcon from "@mui/icons-material/People"
import HistoryIcon from "@mui/icons-material/History"
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects"

export default function AboutUs() {
  // Team members data
  const teamMembers = [
    {
      name: "Jennifer Reynolds",
      role: "Founder & CEO",
      image: null,
      bio: "Former litigation attorney with 15 years of experience in dispute resolution. Founded DisputeResolve to make conflict resolution more accessible and affordable.",
    },
    {
      name: "Michael Chen",
      role: "Chief Mediation Officer",
      image: null,
      bio: "Certified mediator with expertise in commercial and employment disputes. Previously served as a mediator for the American Arbitration Association.",
    },
    {
      name: "Sarah Williams",
      role: "Head of Technology",
      image: null,
      bio: "Technology leader with experience building secure platforms for legal tech companies. Passionate about using technology to improve access to justice.",
    },
    {
      name: "David Rodriguez",
      role: "Director of Operations",
      image: null,
      bio: "Operations expert with background in scaling legal service platforms. Focused on creating efficient processes for dispute resolution.",
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
              About DisputeResolve
            </Typography>
            <Typography variant="h5" className="mb-6 max-w-3xl mx-auto">
              We're on a mission to make dispute resolution accessible, efficient, and fair for everyone.
            </Typography>
          </motion.div>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
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
                  Our Story
                </Typography>
                <Typography variant="body1" className="mb-4 text-gray-700">
                  DisputeResolve was founded in 2020 with a simple but powerful vision: to transform how people resolve
                  disputes. We recognized that traditional litigation is often too expensive, time-consuming, and
                  adversarial for many individuals and businesses.
                </Typography>
                <Typography variant="body1" className="mb-4 text-gray-700">
                  Our founder, Jennifer Reynolds, experienced firsthand the challenges of the traditional legal system
                  during her 15 years as a litigation attorney. She saw clients spend years and significant resources on
                  cases that could have been resolved more efficiently through alternative dispute resolution methods.
                </Typography>
                <Typography variant="body1" className="text-gray-700">
                  Today, DisputeResolve has helped thousands of individuals and businesses resolve disputes quickly,
                  affordably, and amicably through our innovative online platform.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Box className="relative">
                  <Box className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-100 rounded-lg z-0" />
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Team collaboration"
                    className="rounded-lg shadow-lg relative z-10 w-full"
                  />
                  <Box className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-200 rounded-lg z-0" />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-white">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Typography variant="h3" component="h2" className="text-3xl font-bold mb-4">
              Our Values
            </Typography>
            <Typography variant="body1" className="max-w-2xl mx-auto text-gray-700">
              These core principles guide everything we do at DisputeResolve.
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Paper elevation={2} className="p-6 h-full text-center">
                  <Box className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BalanceIcon fontSize="large" className="text-indigo-600" />
                  </Box>
                  <Typography variant="h6" className="font-bold mb-2">
                    Fairness
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    We believe in creating a level playing field where all parties have an equal opportunity to be heard
                    and reach a fair resolution.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Paper elevation={2} className="p-6 h-full text-center">
                  <Box className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PeopleIcon fontSize="large" className="text-indigo-600" />
                  </Box>
                  <Typography variant="h6" className="font-bold mb-2">
                    Accessibility
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    We're committed to making dispute resolution accessible to everyone, regardless of location,
                    resources, or background.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Paper elevation={2} className="p-6 h-full text-center">
                  <Box className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HistoryIcon fontSize="large" className="text-indigo-600" />
                  </Box>
                  <Typography variant="h6" className="font-bold mb-2">
                    Efficiency
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    We strive to resolve disputes quickly and cost-effectively, saving our users time, money, and
                    stress.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Paper elevation={2} className="p-6 h-full text-center">
                  <Box className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <EmojiObjectsIcon fontSize="large" className="text-indigo-600" />
                  </Box>
                  <Typography variant="h6" className="font-bold mb-2">
                    Innovation
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    We continuously explore new technologies and approaches to improve the dispute resolution
                    experience.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Team Section */}
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
              Meet Our Team
            </Typography>
            <Typography variant="body1" className="max-w-2xl mx-auto text-gray-700">
              Our team brings together expertise in law, mediation, technology, and customer service to provide the best
              dispute resolution experience.
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper elevation={2} className="p-6 h-full text-center">
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{ width: 120, height: 120 }}
                      className="mx-auto mb-4"
                    >
                      {member.name.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" className="font-bold mb-1">
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle2" color="primary" className="mb-3">
                      {member.role}
                    </Typography>
                    <Divider className="mb-3" />
                    <Typography variant="body2" className="text-gray-600">
                      {member.bio}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-indigo-700 text-white">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Typography variant="h2" className="text-4xl font-bold mb-2">
                  5,000+
                </Typography>
                <Typography variant="body1">Disputes Resolved</Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Typography variant="h2" className="text-4xl font-bold mb-2">
                  200+
                </Typography>
                <Typography variant="body1">Professional Mediators</Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Typography variant="h2" className="text-4xl font-bold mb-2">
                  92%
                </Typography>
                <Typography variant="body1">Resolution Rate</Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Typography variant="h2" className="text-4xl font-bold mb-2">
                  30 Days
                </Typography>
                <Typography variant="body1">Average Resolution Time</Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  )
}
