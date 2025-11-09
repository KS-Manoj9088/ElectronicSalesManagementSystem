# Email Service Setup Guide

## Overview

The email service has been configured to send automated emails for:
- **Order Confirmation**: Sent when a customer places an order
- **Order Shipped**: Sent when admin updates order status to "Shipped"
- **Order Delivered**: Sent when admin updates order status to "Delivered"
- **Password Reset**: Sent when a user requests a password reset

## Configuration

### 1. Gmail Setup (Recommended)

#### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification

#### Step 2: Generate App Password
1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Other (Custom name)"
3. Enter "Electronics Store" as the name
4. Click "Generate"
5. Copy the 16-character password (you'll use this in your `.env` file)

#### Step 3: Configure Environment Variables

Add these to your `server/.env` file:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_FROM=your_email@gmail.com
```

**Important Notes:**
- Use your Gmail address for `EMAIL_USER`
- Use the 16-character App Password (not your regular Gmail password) for `EMAIL_PASS`
- `EMAIL_FROM` is optional - if not set, it will use `EMAIL_USER`

### 2. Other Email Providers

#### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
```

#### Yahoo Mail
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your_email@yahoo.com
EMAIL_PASS=your_app_password
```

#### Custom SMTP Server
```env
EMAIL_HOST=your_smtp_server.com
EMAIL_PORT=587
EMAIL_USER=your_username
EMAIL_PASS=your_password
```

## Verification

When you start your server, you should see one of these messages:

**✅ Success:**
```
✅ Email service configured and verified successfully
```

**⚠️ Warning (if credentials are missing):**
```
⚠️  Email configuration is incomplete. Email notifications will not be sent.
Please set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASS in your .env file
```

**❌ Error (if verification fails):**
```
❌ Email service verification failed: [error message]
```

## Testing

### Test Order Confirmation Email
1. Place an order through the website
2. Check the customer's email inbox
3. You should receive an order confirmation email with order details

### Test Shipping Email
1. Log in as admin
2. Go to Admin → Orders
3. Update an order status to "Shipped"
4. Add a tracking number (optional)
5. Check the customer's email inbox

### Test Delivery Email
1. Log in as admin
2. Go to Admin → Orders
3. Update an order status to "Delivered"
4. Check the customer's email inbox

### Test Password Reset Email
1. Go to the login page
2. Click "Forgot Password"
3. Enter your email address
4. Check your email inbox

## Troubleshooting

### Error: "Email service not configured"

**Solution:**
- Check that all required environment variables are set in `server/.env`
- Make sure variable names are exactly: `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`
- Restart your server after updating environment variables

### Error: "Invalid login" or "Authentication failed"

**Possible causes:**
1. **Gmail**: Not using App Password (using regular password instead)
2. **Wrong credentials**: Double-check your email and password
3. **2FA not enabled**: For Gmail, 2-Factor Authentication must be enabled

**Solution:**
- For Gmail: Generate a new App Password and use that instead of your regular password
- Verify your email and password are correct
- Check that 2FA is enabled for Gmail accounts

### Error: "Connection timeout" or "Connection refused"

**Possible causes:**
1. Firewall blocking SMTP port
2. Wrong port number
3. Wrong SMTP host

**Solution:**
- Verify the SMTP host and port are correct for your email provider
- Check firewall settings
- Try port 465 with `secure: true` (requires SSL)

### Emails not being received

**Check:**
1. **Spam folder**: Check the spam/junk folder
2. **Server logs**: Check server console for email sending errors
3. **Email configuration**: Verify all environment variables are correct
4. **Email service status**: Check if email service initialized successfully

**Solution:**
- Check spam folder first
- Review server console logs for detailed error messages
- Verify email configuration in `.env` file
- Test with a different email address

### Emails sent but order creation fails

**Note:** Email sending errors will NOT fail order creation. The system is designed to:
- Log email errors to the console
- Continue with order processing even if email fails
- This ensures orders are not lost due to email issues

## Email Templates

The system includes beautifully designed HTML email templates for:
- Order confirmation with order details and items
- Shipping notification with tracking information
- Delivery confirmation
- Password reset with secure link

All emails are responsive and work on both desktop and mobile devices.

## Security Notes

1. **Never commit `.env` file** to version control
2. **Use App Passwords** for Gmail (not your regular password)
3. **Keep credentials secure** and rotate passwords regularly
4. **Use environment variables** in production (not hardcoded values)

## Production Deployment

For production, consider:
1. Using a dedicated email service (SendGrid, Mailgun, AWS SES)
2. Setting up SPF and DKIM records for better deliverability
3. Monitoring email delivery rates
4. Setting up email bounce handling

## Support

If you continue to experience issues:
1. Check server console logs for detailed error messages
2. Verify your email provider's SMTP settings
3. Test email configuration with a simple test script
4. Check your email provider's documentation for SMTP requirements

