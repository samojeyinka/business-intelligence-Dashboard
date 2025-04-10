import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, code } = req.body;

  // Configure your email service
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "samuelojeyinka@gmail.com",
      pass: "teir bvqp ijrx rijl",
    },
  });

  try {
    await transporter.sendMail({
      from: '"Your App" <yourapp@example.com>',
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}`,
      html: `<p>Your verification code is: <strong>${code}</strong></p>`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}