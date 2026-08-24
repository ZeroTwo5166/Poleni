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

    const { error: sendError } = await resend.emails.send({
      from:     "Poleni Kontakt <kontakt@poleni.dk>",
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

    // resend's SDK resolves { data, error } instead of throwing on API-level
    // failures (e.g. sandbox sender restrictions) — without this check a
    // rejected send still falls through as a false "success".
    if (sendError) {
      console.error("Resend API error:", sendError)
      // TEMP: surfacing the real Resend error for debugging — remove before shipping
      return NextResponse.json(
        { error: "Failed to send message", debug: sendError },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
}