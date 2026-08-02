// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server"

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Only import resend here inside the function — never at top level in client code
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      // Using Resend's shared sandbox sender for now. Once poleni.dk is
      // verified in the Resend dashboard (Domains → Add Domain → add the
      // DNS records they give you), switch this to something like
      // "Poleni Kontakt <kontakt@poleni.dk>" for better deliverability.
      from:     "Poleni Contact <onboarding@resend.dev>",
      to:       "kontakt@poleni.dk",
      replyTo: email, // hitting "reply" on the notification goes straight to the customer
      subject:  `New message from ${name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
}