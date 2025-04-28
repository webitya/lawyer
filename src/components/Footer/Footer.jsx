import Link from "next/link"
import { Typography, Grid, Container, Box, IconButton } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import InstagramIcon from "@mui/icons-material/Instagram"
import BalanceIcon from "@mui/icons-material/Balance"

export default function Footer() {
  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "How It Works", href: "/how-it-works" },
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Team", href: "/team" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Guides", href: "/guides" },
        { name: "Help Center", href: "/help" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Dispute Policy", href: "/dispute-policy" },
      ],
    },
  ]

  return (
    <Box component="footer" className="bg-gray-100 pt-12 pb-6">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box className="mb-6">
              <Link href="/" className="flex items-center mb-4">
                <BalanceIcon className="mr-2 text-indigo-600" />
                <Typography variant="h6" component="span" className="font-bold text-indigo-600">
                  DisputeResolve
                </Typography>
              </Link>
              <Typography variant="body2" className="text-gray-600 mb-4">
                Providing efficient and fair dispute resolution services online. We connect disputants with mediators
                and arbitrators to resolve conflicts without going to court.
              </Typography>
              <Box className="flex space-x-2">
                <IconButton aria-label="Facebook" className="text-gray-600 hover:text-indigo-600">
                  <FacebookIcon />
                </IconButton>
                <IconButton aria-label="Twitter" className="text-gray-600 hover:text-indigo-600">
                  <TwitterIcon />
                </IconButton>
                <IconButton aria-label="LinkedIn" className="text-gray-600 hover:text-indigo-600">
                  <LinkedInIcon />
                </IconButton>
                <IconButton aria-label="Instagram" className="text-gray-600 hover:text-indigo-600">
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {footerLinks.map((section) => (
            <Grid item xs={6} sm={3} md={2} key={section.title}>
              <Typography variant="subtitle1" className="font-bold mb-4">
                {section.title}
              </Typography>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-600 hover:text-indigo-600 text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>

        <Box className="border-t border-gray-200 mt-8 pt-6 text-center">
          <Typography variant="body2" className="text-gray-500">
            © {new Date().getFullYear()} DisputeResolve. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
