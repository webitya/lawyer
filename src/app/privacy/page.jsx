"use client"
import { motion } from "framer-motion"
import { Typography, Container, Paper, Box, Divider } from "@mui/material"
import { format } from "date-fns"

export default function PrivacyPolicy() {
  const lastUpdated = "2023-04-15"

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Paper elevation={2} className="p-8 rounded-lg">
            <Typography variant="h3" component="h1" className="text-3xl font-bold mb-2 text-center">
              Privacy Policy
            </Typography>
            <Typography variant="body2" className="text-center text-gray-500 mb-6">
              Last Updated: {format(new Date(lastUpdated), "MMMM d, yyyy")}
            </Typography>

            <Divider className="mb-6" />

            <Box className="space-y-6">
              <section>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                  1. Introduction
                </Typography>
                <Typography variant="body1" className="mb-3 text-gray-700">
                  DisputeResolve ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your information when you use our dispute
                  resolution platform.
                </Typography>
                <Typography variant="body1" className="text-gray-700">
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
                  please do not access the platform.
                </Typography>
              </section>

              <section>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                  2. Information We Collect
                </Typography>
                <Typography variant="body1" className="mb-3 text-gray-700">
                  <strong>Personal Data</strong>
                </Typography>
                <Typography variant="body1" className="mb-3 text-gray-700">
                  We collect personal information that you voluntarily provide to us when you register on the platform,
                  express an interest in obtaining information about us or our services, or otherwise contact us. The
                  personal information we collect may include:
                </Typography>
                <ul className="list-disc pl-6 mb-3 text-gray-700">
                  <li>Name, email address, and contact details</li>
                  <li>Professional information (for mediators and arbitrators)</li>
                  <li>Account login credentials</li>
                  <li>Information related to your dispute</li>
                  <li>Payment information</li>
                  <li>Communications between you and other parties in a dispute</li>
                </ul>
                <Typography variant="body1" className="mb-3 text-gray-700">
                  <strong>Usage Data</strong>
                </Typography>
                <Typography variant="body1" className="text-gray-700">
                  We automatically collect certain information when you visit, use, or navigate the platform. This
                  information does not reveal your specific identity but may include device and usage information, such
                  as your IP address, browser and device characteristics, operating system, language preferences,
                  referring URLs, device name, country, location, information about how and when you use our platform,
                  and other technical information.
                </Typography>
              </section>

              <section>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                  3. How We Use Your Information
                </Typography>
                <Typography variant="body1" className="mb-3 text-gray-700">
                  We use the information we collect or receive:
                </Typography>
                <ul className="list-disc pl-6 mb-3 text-gray-700">
                  <li>To facilitate account creation and authentication</li>
                  <li>To provide and maintain our platform</li>
                  <li>To process your dispute resolution cases</li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To send administrative information, such as updates, security alerts, and support messages</li>
                  <li>To enforce our terms, conditions, and policies</li>
                  <li>To analyze and improve our platform and user experience</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                  4. Disclosure of Your Information
                </Typography>
                <Typography variant="body1" className="mb-3 text-gray-700">
                  We may share your information in the following situations:
                </Typography>
                <ul className="list-disc pl-6 mb-3 text-gray-700">
                  <li>
                    <strong>With Other Users:</strong> Information related to your dispute will be shared with other
                    parties involved in the dispute and assigned mediators or arbitrators.
                  </li>
                  <li>
                    <strong>With Service Providers:</strong> We may share your information with third-party vendors,
                    service providers, contractors, or agents who perform services for us.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> We may share or transfer your information in connection with,
                    or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a
                    portion of our business.
                  </li>
                  <li>
                    <strong>Legal Obligations:</strong> We may disclose your information where required to do so by law
                    or in response to valid requests by public authorities.
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> We may disclose your information for any other purpose with your
                    consent.
                  </li>
                </ul>
              </section>

              <section>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                  5. Data Security
                </Typography>
                <Typography variant="body1" className="mb-3 text-gray-700">
                  We have implemented appropriate technical and organizational security measures designed to protect the
                  security of any personal information we process. However, despite our safeguards and efforts to secure
                  your information, no electronic transmission over the Internet or information storage technology can
                  be guaranteed to be 100% secure.
                </Typography>
              </section>

              <section>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                  6. Data Retention
                </Typography>
                <Typography variant="body1" className="mb-3 text-gray-700">
                  We will retain your personal information only for as long as is necessary for the purposes set out in
                  this Privacy Policy. We will retain and use your information to the extent necessary to comply with
                  our legal obligations, resolve disputes, and enforce our policies.
                </Typography>
              </section>

              <section>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                  7. Your Privacy Rights
                </Typography>
                <Typography variant="body1" className="mb-3 text-gray-700">
                  Depending on your location, you may have certain rights regarding your personal information, such as:
                </Typography>
                <ul className="list-disc pl-6 mb-3 text-gray-700">
                  <li>The right to access personal information we hold about you</li>
                  <li>The right to request correction of your personal information</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to withdraw consent where we rely on consent to process your information</li>
                  <li>The right to object to processing of your personal information</li>
                  <li>The right to data portability</li>
                </ul>
                <Typography variant="body1" className="mb-3 text-gray-700">
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section
                  below.
                </Typography>
              </section>

              <section>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                  8. Cookies Policy
                </Typography>
                <Typography variant="body1" className="mb-3 text-gray-700">
                  We use cookies and similar tracking technologies to track activity on our platform and store certain
                  information. Cookies are files with a small amount of data which may include an anonymous unique
                  identifier.
                </Typography>
                <Typography variant="body1" className="mb-3 text-gray-700">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                  However, if you do not accept cookies, you may not be able to use some portions of our platform.
                </Typography>
              </section>

              <section>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                  9. Changes to This Privacy Policy
                </Typography>
                <Typography variant="body1" className="mb-3 text-gray-700">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last Updated" date.
                </Typography>
                <Typography variant="body1" className="mb-3 text-gray-700">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                  Policy are effective when they are posted on this page.
                </Typography>
              </section>

              <section>
                <Typography variant="h5" component="h2" className="font-bold mb-3">
                  10. Contact Us
                </Typography>
                <Typography variant="body1" className="text-gray-700">
                  If you have any questions about this Privacy Policy, please contact us at privacy@disputeresolve.com.
                </Typography>
              </section>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </div>
  )
}
