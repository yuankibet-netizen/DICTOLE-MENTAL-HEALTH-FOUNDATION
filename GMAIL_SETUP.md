# Email Setup Guide for DICTOLE

## Step 1: Enable 2-Factor Authentication
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification if not already enabled

## Step 2: Create App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" for the app
3. Select "Other (Custom name)" and name it "DICTOLE Website"
4. Click "Generate"
5. Copy the 16-character password (without spaces)

## Step 3: Update .env File
Replace `your-actual-app-password` in .env with your generated app password:
```
EMAIL_PASS=the-16-character-password-you-copied
```

## Step 4: Test Email System
1. Start the server: `node server.js`
2. Test contact form on your website
3. Check email at dictolementalhealthfoundation@gmail.com

## Important Notes:
- Use the app password, NOT your regular Gmail password
- Keep the app password secure and don't share it
- The app password only works once per Gmail account

## Troubleshooting:
- If email fails, double-check the app password
- Make sure 2FA is enabled on your Gmail account
- Check spam folder for test emails
