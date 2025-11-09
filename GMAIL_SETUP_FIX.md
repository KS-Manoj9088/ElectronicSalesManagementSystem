# Fix Gmail Authentication Error

## Error Message
```
❌ Email service verification failed: Invalid login: 535-5.7.8 Username and Password not accepted
```

## Problem
Gmail is rejecting your login credentials. This happens because Gmail requires **App Passwords** instead of your regular password when using SMTP.

## Solution: Generate Gmail App Password

### Step 1: Enable 2-Factor Authentication (Required)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click **2-Step Verification**
3. Follow the prompts to enable 2-Step Verification
   - You'll need to verify your phone number
   - Google will send you a verification code

### Step 2: Generate App Password

1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
   - If you can't find it, go to: Google Account → Security → 2-Step Verification → App passwords
2. You may need to sign in again
3. Under "Select app", choose **Mail**
4. Under "Select device", choose **Other (Custom name)**
5. Type: **Electronics Store** (or any name you prefer)
6. Click **Generate**
7. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)
   - ⚠️ **Important**: You can only see this password once! Copy it immediately.

### Step 3: Update Your .env File

Open `server/.env` and update it with your App Password:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=abcdefghijklmnop
EMAIL_FROM=your_email@gmail.com
```

**Important Notes:**
- Use your **Gmail address** for `EMAIL_USER`
- Use the **16-character App Password** (remove spaces if any) for `EMAIL_PASS`
- Do NOT use your regular Gmail password
- Make sure there are no extra spaces or quotes

### Step 4: Restart Your Server

After updating the `.env` file:
1. Stop your server (Ctrl+C)
2. Start it again: `npm run dev`
3. You should see: `✅ Email service configured and verified successfully`

## Alternative: If You Can't Use App Passwords

If you don't want to enable 2-Factor Authentication, you can use **OAuth2** or switch to a different email provider:

### Option 1: Use Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_outlook_password
```

### Option 2: Use SendGrid (Free tier available)
1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API key
3. Update your `.env`:
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your_sendgrid_api_key
```

## Troubleshooting

### Still Getting Authentication Error?

1. **Double-check the App Password**
   - Make sure you copied all 16 characters
   - Remove any spaces
   - Make sure you're using the App Password, not your regular password

2. **Verify 2FA is Enabled**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Make sure "2-Step Verification" shows as "On"

3. **Check .env File**
   - Make sure there are no quotes around values
   - No extra spaces before or after values
   - File is in the `server/` directory

4. **Restart Server**
   - Always restart after changing `.env` file

5. **Check Email Address**
   - Make sure `EMAIL_USER` matches the Gmail account where you generated the App Password

### Test Email Configuration

After fixing, test by:
1. Placing a test order
2. Checking server logs for email sending status
3. Checking your email inbox (and spam folder)

## Quick Checklist

- [ ] 2-Factor Authentication enabled on Gmail
- [ ] App Password generated from Google Account
- [ ] `.env` file updated with App Password (not regular password)
- [ ] Server restarted after updating `.env`
- [ ] No spaces or quotes in `.env` values

## Still Having Issues?

If you continue to have problems:
1. Generate a new App Password
2. Double-check all `.env` values
3. Try with a different Gmail account
4. Consider using a different email provider (Outlook, SendGrid, etc.)

