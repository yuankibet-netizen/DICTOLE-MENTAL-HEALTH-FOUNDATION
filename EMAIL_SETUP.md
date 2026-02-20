# DICTOLE Email Setup Guide

## Quick Setup for Email Functionality

### 1. Get Gmail App Password
1. Go to your Google Account settings
2. Enable 2-factor authentication
3. Go to "App passwords" section
4. Generate a new app password for "DICTOLE Website"
5. Copy the 16-character password

### 2. Update .env File
Replace `your-app-password` in the `.env` file with your actual app password:

```
EMAIL_USER=dictolementalhealthfoundation@gmail.com
EMAIL_PASS=your-actual-16-character-app-password
```

### 3. Restart Server
```bash
npm start
```

### 4. Test Booking
1. Open website
2. Click "Book Appointment"
3. Fill form and submit
4. Should show "Booking request sent successfully!"

## Features
- ✅ Direct email sending (no email client opens)
- ✅ Professional email templates
- ✅ Input validation and sanitization
- ✅ Error handling
- ✅ Success feedback to users

## Email Content Sent
Each booking sends an email to dictolementalhealthfoundation@gmail.com with:
- Client name, email, phone
- Service type requested
- Preferred date and time
- Additional notes
- Clear call-to-action for confirmation
