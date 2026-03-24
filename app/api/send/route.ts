import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

type NormalizedPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP environment variables are not configured.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function normalizePayload(payload: Payload): NormalizedPayload {
  return {
    name: payload.name?.trim() ?? "",
    email: payload.email?.trim() ?? "",
    subject: payload.subject?.trim() ?? "",
    message: payload.message?.trim() ?? "",
  };
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getValidationMessage(payload: NormalizedPayload) {
  if (payload.name.length < 2) return "Please provide a valid name.";
  if (!isValidEmail(payload.email)) return "Please provide a valid email.";
  if (payload.subject.length < 1) return "Please provide a subject.";
  if (payload.message.length < 1) return "Please provide a message.";
  return null;
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request body. Please refresh and try again." },
      { status: 400 },
    );
  }

  const normalized = normalizePayload(body);
  const validationMessage = getValidationMessage(normalized);

  if (validationMessage) {
    return NextResponse.json({ message: validationMessage }, { status: 400 });
  }

  try {
    const transporter = getTransporter();
    const to = process.env.MAIL_TO ?? "muyeenulislamsakif@gmail.com";
    const from = process.env.MAIL_FROM ?? process.env.SMTP_USER;

    await transporter.sendMail({
      from,
      to,
      replyTo: normalized.email,
      subject: `[Portfolio] ${normalized.subject}`,
      text: `Name: ${normalized.name}\nEmail: ${normalized.email}\n\n${normalized.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Portfolio Contact Message</h2>
          <p><strong>Name:</strong> ${normalized.name}</p>
          <p><strong>Email:</strong> ${normalized.email}</p>
          <p><strong>Subject:</strong> ${normalized.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${normalized.message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Message sent successfully." });
  } catch {
    return NextResponse.json(
      { message: "Unable to send message right now. Please try again later." },
      { status: 500 },
    );
  }
}
