import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send('Missing payment token');
  }

  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('ni_app');
    const collection = db.collection('applications');

    const application = await collection.findOne({ paymentToken: token });

    if (!application) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invalid Payment Link</title>
          <style>
            body { font-family: Arial; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f0f4fa; }
            .error { background: white; padding: 40px; border-radius: 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="error">
            <h2>❌ Invalid Payment Link</h2>
            <p>This payment link is invalid or has expired.</p>
            <a href="/">Return to Home</a>
          </div>
        </body>
        </html>
      `);
    }

    // Check if already paid
    if (application.paymentStatus === 'paid') {
      return res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Already Paid</title>
          <style>
            body { font-family: Arial; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f0f4fa; }
            .success { background: white; padding: 40px; border-radius: 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="success">
            <h2>✅ Payment Already Completed</h2>
            <p>Your application has already been paid and submitted.</p>
            <a href="/">Return to Home</a>
          </div>
        </body>
        </html>
      `);
    }

    // Show payment page
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'text/html');
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Payment - NI Number Application</title>
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
            .payment-card {
              background: white;
              max-width: 500px;
              width: 100%;
              border-radius: 24px;
              padding: 40px;
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
            h2 { color: #1e3a5f; margin-bottom: 20px; }
            .user-info {
              background: #f8fafc;
              padding: 20px;
              border-radius: 16px;
              margin: 20px 0;
            }
            .amount {
              font-size: 48px;
              color: #059669;
              font-weight: bold;
              text-align: center;
              margin: 20px 0;
            }
            .form-group { margin-bottom: 20px; }
            label { display: block; margin-bottom: 8px; font-weight: 600; color: #0f172a; }
            input {
              width: 100%;
              padding: 12px;
              border: 1.5px solid #e2edf7;
              border-radius: 12px;
              font-size: 16px;
            }
            button {
              width: 100%;
              background: #059669;
              color: white;
              border: none;
              padding: 14px;
              border-radius: 50px;
              font-size: 18px;
              font-weight: 600;
              cursor: pointer;
              margin-top: 20px;
            }
            button:hover { background: #047857; transform: translateY(-2px); }
            .secure { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="payment-card">
            <h2>💰 Complete Your Payment</h2>
            <div class="user-info">
              <p><strong>Name:</strong> ${application.firstName} ${application.lastName}</p>
              <p><strong>Email:</strong> ${application.email}</p>
              <p><strong>Application ID:</strong> ${application.paymentToken.substring(0, 8)}</p>
            </div>
            <div class="amount">£29.99</div>
            
            <form id="paymentForm" method="POST" action="/api/confirm-payment?token=${token}">
              <div class="form-group">
                <label>Cardholder Name</label>
                <input type="text" id="cardName" name="cardName" placeholder="John Smith" required>
              </div>
              <div class="form-group">
                <label>Card Number</label>
                <input type="text" id="cardNumber" name="cardNumber" placeholder="4242 4242 4242 4242" maxlength="19" required>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div class="form-group">
                  <label>Expiry (MM/YY)</label>
                  <input type="text" id="expiry" name="expiry" placeholder="12/28" required>
                </div>
                <div class="form-group">
                  <label>CVV</label>
                  <input type="text" id="cvv" name="cvv" placeholder="123" maxlength="4" required>
                </div>
              </div>
              <button type="submit">Pay £29.99 →</button>
            </form>
            <div class="secure">
              🔒 Secure payment processing
            </div>
          </div>
          <script>
            document.getElementById('cardNumber')?.addEventListener('input', function(e) {
              let v = e.target.value.replace(/\\s/g,'');
              if(v.length > 16) v = v.slice(0,16);
              let fmt = '';
              for(let i = 0; i < v.length; i++) {
                if(i > 0 && i % 4 === 0) fmt += ' ';
                fmt += v[i];
              }
              e.target.value = fmt;
            });
            
            document.getElementById('expiry')?.addEventListener('input', function(e) {
              let v = e.target.value.replace(/[^\\d]/g, '');
              if(v.length >= 2) {
                v = v.slice(0,2) + '/' + v.slice(2,4);
              }
              e.target.value = v;
            });
          </script>
        </body>
        </html>
      `);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  } finally {
    await client.close();
  }
}
