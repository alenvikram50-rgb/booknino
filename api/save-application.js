import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await client.connect();
    const db = client.db('ni_app');
    const collection = db.collection('applications');

    const data = req.body;
    const paymentToken = uuidv4();

    // Format date of birth
    const dob = `${data.dobYear}-${data.dobMonth}-${data.dobDay}`;

    const application = {
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      houseNumber: data.houseNumber,
      streetName: data.streetName,
      city: data.city,
      postcode: data.postcode,
      dob: dob,
      nationality: data.nationality,
      reason: data.reason,
      gender: data.gender,
      maritalStatus: data.marital,
      working: data.working,
      vatStatus: data.vatStatus,
      paymentToken: paymentToken,
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await collection.insertOne(application);

    // Generate payment link
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
    const paymentLink = `${baseUrl}/api/payment?token=${paymentToken}`;

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // ========== 1. SEND EMAIL TO ADMIN (alenvikram50@gmail.com) ==========
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: #f8fafc; padding: 20px; border-radius: 16px;">
        <h2 style="color: #1e3a5f; border-bottom: 2px solid #1e3a5f; padding-bottom: 10px;">📋 New NI Number Application Received</h2>
        
        <div style="background: #fff; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <h3 style="color: #059669; margin-top: 0;">👤 Personal Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; width: 40%;"><strong>Full Name:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.title} ${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Gender:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.gender || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Date of Birth:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.dobDay}/${data.dobMonth}/${data.dobYear}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Marital Status:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.marital || 'Not specified'}</td>
            </tr>
          </table>
        </div>

        <div style="background: #fff; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <h3 style="color: #059669; margin-top: 0;">📞 Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Email:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Phone:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.phone}</td>
            </tr>
          </table>
        </div>

        <div style="background: #fff; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <h3 style="color: #059669; margin-top: 0;">🏠 Address</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>House/Flat:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.houseNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Street:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.streetName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>City:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.city}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Postcode:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.postcode}</td>
            </tr>
          </table>
        </div>

        <div style="background: #fff; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <h3 style="color: #059669; margin-top: 0;">🌍 Application Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Nationality:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.nationality}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Reason for applying:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.reason}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Currently working:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.working || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>VAT Status:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.vatStatus || 'Not specified'}</td>
            </tr>
          </table>
        </div>

        <div style="background: #fff; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <h3 style="color: #059669; margin-top: 0;">🔗 Payment Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Payment Token:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${paymentToken}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Payment Status:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><span style="background: #fef3c7; padding: 4px 12px; border-radius: 20px;">Pending</span></td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Payment Link:</strong></td>
              <td style="padding: 8px;"><a href="${paymentLink}" style="color: #059669;">${paymentLink}</a></td>
            </tr>
          </table>
        </div>

        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>⏰ Application Date:</strong> ${new Date().toLocaleString('en-GB')}</p>
          <p style="margin: 5px 0 0 0;"><strong>⚠️ Action Required:</strong> Follow up on payment status.</p>
        </div>
      </div>
    `;

    // Send email to ADMIN (alenvikram50@gmail.com)
    await transporter.sendMail({
      from: `"NI Number Application System" <${process.env.EMAIL_USER}>`,
      to: 'alenvikram50@gmail.com',
      subject: `🔴 NEW APPLICATION: ${data.firstName} ${data.lastName} - NI Number Request`,
      html: adminEmailHtml
    });

    // ========== 2. SEND PAYMENT LINK TO USER ==========
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a5f;">Hello ${data.firstName} ${data.lastName},</h2>
        <p>Your National Insurance Number application has been received successfully.</p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #059669; margin: 0 0 10px 0;">💰 Payment Required: £29.99</h3>
          <p>Click the button below to complete your payment:</p>
          <a href="${paymentLink}" style="display: inline-block; background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 50px; margin: 10px 0;">Pay Now →</a>
        </div>
        
        <p>Or copy this link: ${paymentLink}</p>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>⚠️ Important:</strong> Your application will only be processed after payment confirmation.</p>
        </div>
        
        <hr>
        <p style="color: #666; font-size: 12px;">If you didn't submit this application, please ignore this email.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"NI Number Application" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: 'Complete Your NI Number Application Payment',
      html: userEmailHtml
    });

    console.log(`✅ Application saved for ${data.firstName} ${data.lastName}`);
    console.log(`📧 Admin notification sent to alenvikram50@gmail.com`);
    console.log(`📧 User payment link sent to ${data.email}`);

    res.status(200).json({
      success: true,
      message: 'Application saved! Payment link sent to your email.',
      paymentLink: paymentLink,
      applicationId: paymentToken
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  } finally {
    await client.close();
  }
}
