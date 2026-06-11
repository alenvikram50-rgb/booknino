import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  const { token } = req.query;

  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('ni_app');
    const collection = db.collection('applications');

    // Update payment status
    const result = await collection.updateOne(
      { paymentToken: token },
      { 
        $set: { 
          paymentStatus: 'paid',
          paidAt: new Date(),
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send('Application not found');
    }

    // Get updated application
    const application = await collection.findOne({ paymentToken: token });

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // ========== 1. SEND CONFIRMATION TO ADMIN ==========
    const adminConfirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">✅ PAYMENT RECEIVED!</h2>
        <p><strong>Application from:</strong> ${application.firstName} ${application.lastName}</p>
        <p><strong>Email:</strong> ${application.email}</p>
        <p><strong>Phone:</strong> ${application.phone}</p>
        <p><strong>Amount:</strong> £29.99</p>
        <p><strong>Payment Status:</strong> <span style="color: #059669;">PAID ✅</span></p>
        <p><strong>Payment Date:</strong> ${new Date().toLocaleString('en-GB')}</p>
        <hr>
        <p>This application is now ready for processing.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"NI Number Payment System" <${process.env.EMAIL_USER}>`,
      to: 'alenvikram50@gmail.com',
      subject: `💰 PAYMENT CONFIRMED: ${application.firstName} ${application.lastName} - £29.99`,
      html: adminConfirmationHtml
    });

    // ========== 2. SEND CONFIRMATION TO USER ==========
    const userConfirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">✅ Payment Successful!</h2>
        <p>Dear ${application.firstName},</p>
        <p>Your payment of <strong>£29.99</strong> has been confirmed successfully.</p>
        <p>Your National Insurance Number application is now being processed.</p>
        <p>You will receive your NI number confirmation within 5-7 working days.</p>
        <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Application Reference:</strong> ${application.paymentToken.substring(0, 8)}</p>
          <p><strong>Payment Date:</strong> ${new Date().toLocaleString('en-GB')}</p>
        </div>
        <p>Thank you for using our service.</p>
        <hr>
        <p style="color: #666; font-size: 12px;">If you have any questions, please contact support.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"NI Number Application" <${process.env.EMAIL_USER}>`,
      to: application.email,
      subject: 'Payment Confirmed - NI Number Application',
      html: userConfirmationHtml
    });

    // Show success page
    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Payment Successful - NI Number Application</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
            background: linear-gradient(135deg, #f0f4fa 0%, #e6edf4 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }
          .success-card {
            background: white;
            max-width: 500px;
            width: 100%;
            border-radius: 24px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
          .checkmark {
            font-size: 80px;
            color: #059669;
            margin-bottom: 20px;
          }
          h2 { color: #059669; margin-bottom: 20px; }
          .btn {
            display: inline-block;
            background: #1e3a5f;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 50px;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="success-card">
          <div class="checkmark">✅</div>
          <h2>Payment Successful!</h2>
          <p>Your NI Number application has been submitted successfully.</p>
          <p>A confirmation email has been sent to <strong>${application.email}</strong></p>
          <p>You will receive your NI number within 5-7 working days.</p>
          <a href="/" class="btn">Return to Home</a>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send('Payment confirmation failed');
  } finally {
    await client.close();
  }
}
