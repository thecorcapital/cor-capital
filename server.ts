import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Resend lazily
  const getResend = () => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY is not set. Emails will only be logged to console.");
      return null;
    }
    return new Resend(apiKey);
  };

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    
    console.log("--- Contact Form Submission ---");
    console.log(`To: michael@thecorcapital.com`);
    console.log(`From: ${name} <${email}>`);
    if (phone) console.log(`Phone: ${phone}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log("-------------------------------");

    const resend = getResend();
    if (resend) {
      try {
        const fromAddress = process.env.RESEND_FROM_EMAIL || 'Cor Capital <onboarding@resend.dev>';
        const result = await resend.emails.send({
          from: fromAddress,
          to: 'michael@thecorcapital.com',
          subject: `Cor Capital Inquiry: ${subject} - ${name}`,
          replyTo: email,
          html: `
            <div style="font-family: Arial, sans-serif; color: #0a1628; max-width: 600px; line-height: 1.6;">
              <h2 style="color: #0a1628; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">New Cor Capital Inquiry</h2>
              <p><strong>Full Name:</strong> ${name}</p>
              <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p><strong>Inquiry Type:</strong> ${subject}</p>
              <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #2563eb;">
                <p style="margin: 0; font-weight: bold; color: #475569;">Message:</p>
                <p style="margin-top: 8px; white-space: pre-wrap;">${message}</p>
              </div>
              <p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">Delivered via Cor Capital Direct Inquiry Router</p>
            </div>
          `
        });

        if (result.error) {
          console.warn("Resend returned error:", result.error);
          throw new Error(result.error.message || "Resend send failed");
        }

        return res.json({ success: true, message: "Your inquiry has been submitted successfully." });
      } catch (error: any) {
        console.error("Error sending email via Resend:", error?.message || error);
        // Fallback to FormSubmit server-side relay
        try {
          const relayRes = await fetch("https://formsubmit.co/ajax/michael@thecorcapital.com", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              name,
              email,
              phone: phone || "N/A",
              _subject: `Cor Capital Inquiry: ${subject} - ${name}`,
              inquiry_type: subject,
              message,
              _captcha: "false"
            })
          });
          const relayData = await relayRes.json();
          if (relayRes.ok) {
            return res.json({ success: true, relayed: true, message: "Inquiry delivered successfully via backup routing." });
          }
        } catch (relayErr) {
          console.error("Server relay error:", relayErr);
        }
      }
    }

    // Attempt direct FormSubmit relay if Resend is not configured
    try {
      const relayRes = await fetch("https://formsubmit.co/ajax/michael@thecorcapital.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone: phone || "N/A",
          _subject: `Cor Capital Inquiry: ${subject} - ${name}`,
          inquiry_type: subject,
          message,
          _captcha: "false"
        })
      });
      if (relayRes.ok) {
        return res.json({ success: true, relayed: true, message: "Inquiry delivered successfully to michael@thecorcapital.com." });
      }
    } catch (e) {
      console.warn("Serverless formsubmit relay attempt:", e);
    }

    // If both failed or unavailable, inform client to proceed with client-side fallback
    res.status(503).json({ 
      success: false, 
      error: "SERVER_ROUTING_UNAVAILABLE",
      message: "Server delivery unconfigured. Client fallback available." 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
