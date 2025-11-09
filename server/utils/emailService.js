import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter
let transporter = null;

// Initialize email transporter
const initTransporter = () => {
  const emailHost = process.env.EMAIL_HOST;
  const emailPort = process.env.EMAIL_PORT;
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailHost || !emailPort || !emailUser || !emailPass) {
    console.warn('⚠️  Email configuration is incomplete. Email notifications will not be sent.');
    console.warn('Please set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASS in your .env file');
    return null;
  }

  try {
    transporter = nodemailer.createTransport({
      host: emailHost,
      port: parseInt(emailPort),
      secure: emailPort === '465', // true for 465, false for other ports
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    // Verify connection (async, don't block)
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email service verification failed:', error.message);
        if (error.message.includes('Invalid login') || error.message.includes('BadCredentials')) {
          console.error('\n💡 TIP: For Gmail, you need to:');
          console.error('   1. Enable 2-Factor Authentication');
          console.error('   2. Generate an App Password (not your regular password)');
          console.error('   3. Use the App Password in EMAIL_PASS');
          console.error('   See GMAIL_SETUP_FIX.md for detailed instructions\n');
        }
      } else {
        console.log('✅ Email service configured and verified successfully');
      }
    });

    return transporter;
  } catch (error) {
    console.error('❌ Error configuring email service:', error.message);
    return null;
  }
};

// Initialize on module load
if (!transporter) {
  transporter = initTransporter();
}

// Verify email configuration
export const verifyEmailConfig = async () => {
  if (!transporter) {
    return false;
  }

  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Email configuration verification failed:', error.message);
    return false;
  }
};

// Send email function
export const sendEmail = async ({ to, subject, html, text }) => {
  if (!transporter) {
    console.warn('Email service not configured. Email not sent to:', to);
    return { success: false, error: 'Email service not configured' };
  }

  const emailFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER;

  try {
    const info = await transporter.sendMail({
      from: `"Electronics Store" <${emailFrom}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    });

    console.log('✅ Email sent successfully to:', to);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email to', to, ':', error.message);
    return { success: false, error: error.message };
  }
};

// Email templates
export const emailTemplates = {
  // Order confirmation email
  orderConfirmation: (order, user) => {
    const orderItemsHtml = order.orderItems
      .map(
        (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <img src="${item.image || ''}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;" />
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `
      )
      .join('');

    return {
      subject: `Order Confirmation - Order #${order._id.toString().slice(-8)}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .order-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { background: #f5f5f5; padding: 10px; text-align: left; font-weight: bold; }
            .total { font-size: 18px; font-weight: bold; color: #667eea; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmed! 🎉</h1>
            </div>
            <div class="content">
              <p>Dear ${user.name},</p>
              <p>Thank you for your order! We've received your order and are preparing it for shipment.</p>
              
              <div class="order-info">
                <h2>Order Details</h2>
                <p><strong>Order ID:</strong> #${order._id.toString().slice(-8)}</p>
                <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Status:</strong> ${order.orderStatus}</p>
              </div>

              <h3>Order Items</h3>
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderItemsHtml}
                </tbody>
              </table>

              <div class="order-info">
                <p><strong>Subtotal:</strong> $${order.itemsPrice.toFixed(2)}</p>
                <p><strong>Tax:</strong> $${order.taxPrice.toFixed(2)}</p>
                <p><strong>Shipping:</strong> $${order.shippingPrice.toFixed(2)}</p>
                <p class="total">Total: $${order.totalPrice.toFixed(2)}</p>
              </div>

              <div class="order-info">
                <h3>Shipping Address</h3>
                <p>${order.shippingAddress.fullName}</p>
                <p>${order.shippingAddress.addressLine1}${order.shippingAddress.addressLine2 ? ', ' + order.shippingAddress.addressLine2 : ''}</p>
                <p>${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.pincode}</p>
                <p>${order.shippingAddress.phone ? 'Phone: ' + order.shippingAddress.phone : ''}</p>
              </div>

              <p>We'll send you another email when your order ships. You can track your order status in your account.</p>
              
              <div class="footer">
                <p>Thank you for shopping with us!</p>
                <p>Electronics Store Team</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };
  },

  // Order shipped email
  orderShipped: (order, user, trackingNumber) => {
    return {
      subject: `Your Order Has Shipped - Order #${order._id.toString().slice(-8)}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
            .tracking { font-size: 18px; font-weight: bold; color: #667eea; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your Order Has Shipped! 📦</h1>
            </div>
            <div class="content">
              <p>Dear ${user.name},</p>
              <p>Great news! Your order has been shipped and is on its way to you.</p>
              
              <div class="info-box">
                <h2>Shipping Information</h2>
                <p><strong>Order ID:</strong> #${order._id.toString().slice(-8)}</p>
                ${trackingNumber ? `<p class="tracking"><strong>Tracking Number:</strong> ${trackingNumber}</p>` : ''}
                <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
              </div>

              <div class="info-box">
                <h3>Shipping Address</h3>
                <p>${order.shippingAddress.fullName}</p>
                <p>${order.shippingAddress.addressLine1}${order.shippingAddress.addressLine2 ? ', ' + order.shippingAddress.addressLine2 : ''}</p>
                <p>${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.pincode}</p>
                <p>${order.shippingAddress.phone ? 'Phone: ' + order.shippingAddress.phone : ''}</p>
              </div>

              <p>You can track your order status in your account dashboard.</p>
              
              <div class="footer">
                <p>Thank you for shopping with us!</p>
                <p>Electronics Store Team</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };
  },

  // Order delivered email
  orderDelivered: (order, user) => {
    return {
      subject: `Your Order Has Been Delivered - Order #${order._id.toString().slice(-8)}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Delivered! ✅</h1>
            </div>
            <div class="content">
              <p>Dear ${user.name},</p>
              <p>Your order has been successfully delivered!</p>
              
              <div class="info-box">
                <h2>Delivery Confirmation</h2>
                <p><strong>Order ID:</strong> #${order._id.toString().slice(-8)}</p>
                <p><strong>Delivered On:</strong> ${new Date(order.deliveredAt).toLocaleDateString()}</p>
              </div>

              <p>We hope you're happy with your purchase! If you have any questions or concerns, please don't hesitate to contact us.</p>
              
              <p>We'd love to hear your feedback. Please consider leaving a review for the products you purchased.</p>
              
              <div class="footer">
                <p>Thank you for shopping with us!</p>
                <p>Electronics Store Team</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };
  },
};

// Export transporter for direct use if needed
export { transporter };
export default { sendEmail, emailTemplates, verifyEmailConfig };

