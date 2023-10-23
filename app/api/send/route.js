import { NextResponse } from "next/server";
import { mailOptions, transporter } from "../../../config/nodemailer";

export async function POST(req, res) {
  if (req.method === "POST") {
    const { email, subject, message } = await req.json();

    if (!email || !subject || !message) {
      return NextResponse.json({ message: "Internal server error" });
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: subject,
        text: message,
      });

      return NextResponse.json({ success: true });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: err.message });
    }
  }
  return NextResponse.json({ message: "Bad request" });
}
