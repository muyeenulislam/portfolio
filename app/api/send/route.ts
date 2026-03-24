import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
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

function isValid(payload: Payload) {
  return (
    payload.name &&
    payload.email &&
    payload.subject &&
    payload.message &&
    payload.name.trim().length > 1 &&
    payload.email.includes("@") &&
    payload.subject.trim().length > 2 &&
    payload.message.trim().length > 9
  );
}

export async function POST(request: Request) {
  const body = (await request.json()) as Payload;

  if (!isValid(body)) {
    return NextResponse.json(
      { message: "Please provide valid name, email, subject, and message." },
      { status: 400 },
    );
  }

  try {
    const normalized = {
      name: body.name!.trim(),
      email: body.email!.trim(),
      subject: body.subject!.trim(),
      message: body.message!.trim(),
    };

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
