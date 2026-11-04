# 🔐 Email Verification System - User Guide

## What Happened?

You've set up a **two-factor authentication system** for your SAT prep app! When users sign up or log in, they receive a **verification code** to confirm their identity.

## 📍 Current Status: Development Mode

In **development mode**, the verification code appears in your **terminal/server logs** instead of being emailed (since email services require paid accounts and API keys).

## 🎯 How to Test Right Now

### Step 1: Watch the Terminal
Keep your terminal/console visible while testing:
```bash
npm run dev
```

### Step 2: Try Signing Up
1. Go to `http://localhost:3000/signup`
2. Enter an email and password
3. Click "Sign Up"

### Step 3: Look for the Code
Your terminal will show:
```
========================================
📧 VERIFICATION CODE EMAIL
========================================
To: yourname@example.com
Code: 404279
Expires in: 10 minutes

This is a development simulation.
In production, integrate with SendGrid, Resend, AWS SES, etc.
========================================
```

### Step 4: Enter the Code
1. You'll be redirected to the **Verify Code** page
2. Copy the **6-digit code** from the terminal
3. Paste it in the code input field
4. Click "Verify Code"

### Step 5: Success! 🎉
You'll be logged in and redirected to `/practice`

## 📧 For Real Email (Production)

When you're ready to send **real emails**, follow the guide in `EMAIL_SETUP.md`:

### Quick Setup with Resend (Recommended):
1. Go to https://resend.com and sign up (free tier available)
2. Get your API key
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=your_key_here
   ```
4. Restart the server - emails will now be sent automatically!

## 🔒 What's Secure About This?

✅ **Codes expire in 10 minutes** - can't be used forever  
✅ **Random 6-digit codes** - can't be guessed easily  
✅ **Single-use codes** - deleted after verification  
✅ **One code per user** - requesting new code replaces old one  
✅ **Database-backed** - not in URLs or cookies  

## 📝 Test Accounts

You can use any email for testing:
- `test@example.com`
- `user@test.com`
- Your own email address

The password can be anything (e.g., `password123`)

## ❓ Troubleshooting

**Q: I don't see the code in the terminal**
- Make sure you're looking at the right terminal where `npm run dev` is running
- Check that the POST request appeared (`POST /api/auth/send-code 200`)

**Q: The code expired**
- Codes expire after 10 minutes
- Click "Resend Code" button to get a new one

**Q: Error saying "User not found"**
- Make sure you signed up first (go to `/signup`)
- The verification code can only be sent for existing accounts

## 🚀 Next Steps

1. **Test the flow** - sign up, verify code, access practice
2. **When ready for production**:
   - Set up Resend or another email service
   - Add API key to environment variables
   - Real emails will automatically start working!

## 📚 More Information

See `EMAIL_SETUP.md` for detailed setup instructions for production email services.

---

**Questions?** Check the server logs or look at the API endpoints in `/src/app/api/auth/`
