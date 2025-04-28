"use client"
import emailjs from "@emailjs/browser"

const SERVICE_ID = "service1234"
const TEMPLATE_ID = "temp1234"
const PUBLIC_KEY = "12345afhd"

export const sendEmail = async (templateParams) => {
  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

    return {
      success: true,
      message: "Email sent successfully",
      response,
    }
  } catch (error) {
    console.error("Email sending failed:", error)
    return {
      success: false,
      message: "Failed to send email",
      error,
    }
  }
}

export const sendNotification = async (to, subject, message, caseId = null) => {
  const templateParams = {
    to_email: to,
    to_name: to.split("@")[0],
    subject,
    message,
    case_id: caseId,
  }

  return await sendEmail(templateParams)
}

export const sendCaseCreationNotification = async (caseData, recipientEmail) => {
  const templateParams = {
    to_email: recipientEmail,
    to_name: recipientEmail.split("@")[0],
    subject: `New Case Created: ${caseData.caseId}`,
    message: `A new case "${caseData.title}" has been created and you have been added as a participant. Please log in to view the details.`,
    case_id: caseData.caseId,
    case_title: caseData.title,
    case_type: caseData.type,
  }

  return await sendEmail(templateParams)
}

export const sendMediationInvitation = async (caseData, mediatorEmail) => {
  const templateParams = {
    to_email: mediatorEmail,
    to_name: mediatorEmail.split("@")[0],
    subject: `Mediation Request: ${caseData.caseId}`,
    message: `You have been invited to mediate case "${caseData.title}". Please log in to accept or decline this invitation.`,
    case_id: caseData.caseId,
    case_title: caseData.title,
    case_type: caseData.type,
  }

  return await sendEmail(templateParams)
}
