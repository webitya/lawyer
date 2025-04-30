# Authentication and API Credentials Guide

This document provides detailed information about all the credentials and API keys needed to set up and run the Dispute Resolution Platform with all core backend features working properly.

## Required Environment Variables

Create a `.env.local` file in the root directory of your project with the following environment variables:

\`\`\`
# Authentication
JWT_SECRET=your_jwt_secret_key
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# Database
MONGODB_URI=your_mongodb_connection_string

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret

# Storage (AWS S3)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_s3_bucket_name

# Payment Processing
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Service
EMAIL_SERVER_HOST=your_smtp_host
EMAIL_SERVER_PORT=your_smtp_port
EMAIL_SERVER_USER=your_smtp_username
EMAIL_SERVER_PASSWORD=your_smtp_password
EMAIL_FROM=your_from_email

# Video Conferencing
ZOOM_API_KEY=your_zoom_api_key
ZOOM_API_SECRET=your_zoom_api_secret
JITSI_APP_ID=your_jitsi_app_id
JITSI_API_KEY=your_jitsi_api_key

# WhatsApp Notifications
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
\`\`\`

## Detailed Setup Instructions for Each Service

### 1. MongoDB Database

- **MONGODB_URI**: Your MongoDB connection string
  - Format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority`
  - How to get:
    1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
    2. Create a new cluster
    3. Click "Connect" and select "Connect your application"
    4. Copy the connection string and replace `<username>`, `<password>`, and `<database>` with your credentials
  - Used in: `lib/db.js` for database connection

### 2. JWT Authentication

- **JWT_SECRET**: Secret key for JWT token generation and verification
  - Format: A strong random string (at least 32 characters)
  - How to get: Generate a secure random string using:
    \`\`\`bash
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    \`\`\`
  - Used in: `lib/auth.js` and API routes for authentication

### 3. NextAuth Authentication

- **NEXTAUTH_SECRET**: Secret key for NextAuth.js
  - Format: A strong random string (at least 32 characters)
  - How to get: Generate a secure random string as shown above
  - Used in: NextAuth configuration

- **NEXTAUTH_URL**: Your application's URL
  - Format: `http://localhost:3000` for development, your domain for production
  - Used in: NextAuth configuration for callback URLs

### 4. OAuth Providers

#### Google OAuth

- **GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET**
  - How to get:
    1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
    2. Create a new project
    3. Navigate to "APIs & Services" > "Credentials"
    4. Create an OAuth client ID
    5. Set the authorized redirect URI to `https://your-domain.com/api/auth/callback/google`
    6. Copy the Client ID and Client Secret
  - Used in: NextAuth configuration for Google provider

#### Facebook OAuth

- **FACEBOOK_CLIENT_ID** and **FACEBOOK_CLIENT_SECRET**
  - How to get:
    1. Go to [Facebook Developers](https://developers.facebook.com/)
    2. Create a new app
    3. Add the Facebook Login product
    4. Configure the OAuth redirect URI to `https://your-domain.com/api/auth/callback/facebook`
    5. Copy the App ID and App Secret
  - Used in: NextAuth configuration for Facebook provider

### 5. Document Storage (AWS S3)

- **AWS_ACCESS_KEY_ID**, **AWS_SECRET_ACCESS_KEY**, **AWS_REGION**, and **AWS_BUCKET_NAME**
  - How to get:
    1. Create an [AWS account](https://aws.amazon.com/)
    2. Create an IAM user with S3 permissions
    3. Create an S3 bucket
    4. Note down the access key, secret key, region, and bucket name
  - Used in: Document upload and storage functionality

### 6. Payment Processing

#### Stripe

- **STRIPE_SECRET_KEY** and **STRIPE_WEBHOOK_SECRET**
  - How to get:
    1. Create a [Stripe account](https://stripe.com/)
    2. Get your API keys from the Dashboard
    3. Set up a webhook endpoint and note the signing secret
  - Used in: Payment processing functionality

#### Razorpay

- **RAZORPAY_KEY_ID** and **RAZORPAY_KEY_SECRET**
  - How to get:
    1. Create a [Razorpay account](https://razorpay.com/)
    2. Get your API keys from the Dashboard
  - Used in: Alternative payment processing for Indian users

### 7. Email Service

- **EMAIL_SERVER_HOST**, **EMAIL_SERVER_PORT**, **EMAIL_SERVER_USER**, **EMAIL_SERVER_PASSWORD**, and **EMAIL_FROM**
  - How to get:
    1. Set up an SMTP server (e.g., Gmail, SendGrid, Amazon SES)
    2. Note down the SMTP credentials
  - Used in: Email notification service

### 8. Video Conferencing

#### Zoom API

- **ZOOM_API_KEY** and **ZOOM_API_SECRET**
  - How to get:
    1. Create a [Zoom Developer account](https://marketplace.zoom.us/)
    2. Create a JWT App
    3. Copy the API Key and API Secret
  - Used in: Video conferencing functionality

#### Jitsi API

- **JITSI_APP_ID** and **JITSI_API_KEY**
  - How to get:
    1. Go to [Jitsi Developer Portal](https://jaas.8x8.vc/)
    2. Create an API key
  - Used in: Alternative video conferencing functionality

### 9. WhatsApp Notifications (via Twilio)

- **TWILIO_ACCOUNT_SID**, **TWILIO_AUTH_TOKEN**, and **TWILIO_PHONE_NUMBER**
  - How to get:
    1. Create a [Twilio account](https://www.twilio.com/)
    2. Enable WhatsApp messaging
    3. Note down the Account SID, Auth Token, and WhatsApp-enabled phone number
  - Used in: WhatsApp notification service

## Implementation Notes for Core Backend Features

### 1. User Authentication & Role Management

The platform supports multiple user roles:
- Disputants (parties in a dispute)
- Lawyers
- Mediators
- Arbitrators
- Administrators

Authentication is handled through NextAuth.js with:
- Email/password authentication
- Social logins (Google, Facebook)
- JWT tokens for session management
- Role-based access control implemented in middleware

### 2. Case Management System

The case management system includes:
- Case filing with document uploads to AWS S3
- Case tracking dashboard for all user types
- Assignment of mediators/arbitrators (manual or algorithm-based)
- Case status tracking and updates
- Notification system for case events

### 3. Online Hearing & Scheduling

The platform integrates:
- Calendar functionality with Google Calendar and Outlook APIs
- Video conferencing through Zoom or Jitsi APIs
- Automated notifications for scheduled events
- Recording and transcription capabilities

### 4. Document Management

Document management features include:
- Secure document storage on AWS S3
- Digital signature capabilities through DocuSign API
- Document version control
- Access control based on user roles and case participation

### 5. Dispute Resolution Workflow Automation

The workflow automation includes:
- Structured negotiation process
- Mediation workflow with mediator tools
- Arbitration process with decision templates
- Automatic case escalation if negotiation/mediation fails
- Settlement agreement generation

### 6. Payments & Invoicing

Payment processing includes:
- Integration with Stripe and Razorpay
- Fee calculation based on case type and complexity
- Automated invoice generation
- Payment tracking and history
- Escrow services for settlements

## Getting Started

1. Create the `.env.local` file with all required credentials
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Access the application at http://localhost:3000

## Troubleshooting Common Issues

### Database Connection Issues

If you encounter database connection issues:
1. Verify your MongoDB URI is correct
2. Ensure your IP address is whitelisted in MongoDB Atlas
3. Check that your database user has the correct permissions

### Authentication Problems

If users cannot log in:
1. Verify JWT_SECRET and NEXTAUTH_SECRET are set correctly
2. Check that OAuth redirect URIs match exactly in your provider settings
3. Ensure your OAuth credentials are correct

### File Upload Issues

If document uploads fail:
1. Verify AWS credentials are correct
2. Check that your S3 bucket has the proper CORS configuration
3. Ensure your IAM user has S3 permissions

### Payment Processing Issues

If payments fail:
1. Verify you're using the correct API keys (test vs. production)
2. Check webhook configurations
3. Ensure your Stripe/Razorpay account is properly set up

## Security Best Practices

1. Never commit your `.env.local` file to version control
2. Rotate your secrets periodically
3. Use environment-specific credentials for development, staging, and production
4. Implement proper input validation and sanitization
5. Use HTTPS for all API endpoints
6. Implement rate limiting for authentication endpoints
