# Authentication and API Credentials Guide

This document provides information about all the credentials and API keys needed to set up and run the Dispute Resolution Platform.

## Required Credentials

### 1. MongoDB Database

- **MONGODB_URI**: Your MongoDB connection string
  - Format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority`
  - How to get: Create a MongoDB Atlas account, set up a cluster, and get the connection string from the dashboard
  - Used in: `lib/db.js` for database connection

### 2. JWT Authentication

- **JWT_SECRET**: Secret key for JWT token generation and verification
  - Format: A strong random string (at least 32 characters)
  - How to get: Generate a secure random string (you can use tools like `openssl rand -base64 32`)
  - Used in: `lib/auth.js` and API routes for authentication

### 3. NextAuth Authentication

- **NEXTAUTH_SECRET**: Secret key for NextAuth.js
  - Format: A strong random string (at least 32 characters)
  - How to get: Generate a secure random string (you can use tools like `openssl rand -base64 32`)
  - Used in: NextAuth configuration

### 4. Google OAuth

- **GOOGLE_CLIENT_ID**: Client ID for Google OAuth
  - How to get: 
    1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
    2. Create a new project
    3. Navigate to "APIs & Services" > "Credentials"
    4. Create an OAuth client ID
    5. Set the authorized redirect URI to `https://your-domain.com/api/auth/callback/google`
  - Used in: NextAuth configuration for Google provider

- **GOOGLE_CLIENT_SECRET**: Client Secret for Google OAuth
  - How to get: Obtained along with the Client ID in the Google Cloud Console
  - Used in: NextAuth configuration for Google provider

### 5. Facebook OAuth

- **FACEBOOK_CLIENT_ID**: App ID for Facebook OAuth
  - How to get:
    1. Go to [Facebook Developers](https://developers.facebook.com/)
    2. Create a new app
    3. Add the Facebook Login product
    4. Configure the OAuth redirect URI to `https://your-domain.com/api/auth/callback/facebook`
  - Used in: NextAuth configuration for Facebook provider

- **FACEBOOK_CLIENT_SECRET**: App Secret for Facebook OAuth
  - How to get: Obtained from the Facebook Developers dashboard
  - Used in: NextAuth configuration for Facebook provider

### 6. AWS S3 (for Document Storage)

- **AWS_ACCESS_KEY_ID**: Access key for AWS S3
  - How to get: Create an IAM user in AWS with S3 permissions
  - Used in: Document upload and storage functionality

- **AWS_SECRET_ACCESS_KEY**: Secret key for AWS S3
  - How to get: Created along with the access key for the IAM user
  - Used in: Document upload and storage functionality

- **AWS_REGION**: AWS region for S3 bucket
  - Example: `us-east-1`
  - Used in: Document upload and storage functionality

- **AWS_BUCKET_NAME**: Name of the S3 bucket for document storage
  - How to get: Create an S3 bucket in the AWS console
  - Used in: Document upload and storage functionality

### 7. Stripe (for Payment Processing)

- **STRIPE_SECRET_KEY**: Secret key for Stripe API
  - How to get: Create a Stripe account and get the key from the dashboard
  - Used in: Payment processing functionality

- **STRIPE_WEBHOOK_SECRET**: Secret for Stripe webhooks
  - How to get: Set up a webhook in the Stripe dashboard
  - Used in: Webhook handler for payment events

### 8. Email Service (for Notifications)

- **EMAIL_SERVER_HOST**: SMTP server host
  - Example: `smtp.gmail.com`
  - Used in: Email notification service

- **EMAIL_SERVER_PORT**: SMTP server port
  - Example: `587`
  - Used in: Email notification service

- **EMAIL_SERVER_USER**: SMTP server username
  - Used in: Email notification service

- **EMAIL_SERVER_PASSWORD**: SMTP server password
  - Used in: Email notification service

- **EMAIL_FROM**: Default sender email address
  - Example: `noreply@disputeresolve.com`
  - Used in: Email notification service

### 9. Video Conferencing (Zoom API)

- **ZOOM_API_KEY**: API key for Zoom integration
  - How to get: Create a Zoom Developer account and register an app
  - Used in: Video conferencing functionality

- **ZOOM_API_SECRET**: API secret for Zoom integration
  - How to get: Obtained along with the API key when registering a Zoom app
  - Used in: Video conferencing functionality

## Environment Variables Setup

Create a `.env.local` file in the root directory of the project with the following variables:

\`\`\`
# Authentication
JWT_SECRET=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Database
MONGODB_URI=your_mongodb_connection_string

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret

# Storage
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_s3_bucket_name

# Payment Processing
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Email
EMAIL_SERVER_HOST=your_smtp_host
EMAIL_SERVER_PORT=your_smtp_port
EMAIL_SERVER_USER=your_smtp_username
EMAIL_SERVER_PASSWORD=your_smtp_password
EMAIL_FROM=your_from_email

# Video Conferencing
ZOOM_API_KEY=your_zoom_api_key
ZOOM_API_SECRET=your_zoom_api_secret
\`\`\`

Replace all placeholder values with your actual credentials.

## Security Notes

1. Never commit your `.env.local` file to version control
2. Rotate your secrets periodically
3. Use environment-specific credentials for development, staging, and production
4. Consider using a secrets manager for production environments
\`\`\`

Now, let's create a tailwind.config.js file with the hard-coded colors:
