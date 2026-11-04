# 📧 Email Verification Setup Guide

## Current Status
✅ Email verification system is fully implemented and working in **development mode**.

## How It Works in Development

When you sign up or log in, a **6-digit verification code is generated** and:
1. **Logged to the server console** (visible in the terminal)
2. **Stored in the database** with a 10-minute expiration
3. You enter this code on the `/verify-code` page

### Steps to Test:
1. Go to `/signup` or `/login`
2. Enter your email and password
3. You'll be redirected to `/verify-code`
4. **Check the terminal/console output** for the code (looks like):
   ```
   ========================================
   📧 VERIFICATION CODE EMAIL
   ========================================
   To: your-email@example.com
   Code: 404279
   Expires in: 10 minutes
   ========================================
   ```
5. Enter the 6-digit code (e.g., `404279`)
6. Click "Verify Code" to complete authentication

---

## For Production: Real Email Service

### Option 1: Using Resend (Recommended)
Resend is the easiest and most modern email service.

#### Setup:
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Get your API key
4. Add to `.env.local`:
   ```
   RESEND_API_KEY=your_api_key_here
   ```

The code will automatically:
- Attempt to send via Resend API if the key exists
- Fall back to console logging if it fails
- Send beautiful formatted emails with your verification code

#### Email Template:
The email includes:
- Gradient background with code
- 10-minute expiration notice
- Professional HTML formatting

### Option 2: Using SendGrid
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Update `/src/lib/email.ts` to use SendGrid API instead of Resend

### Option 3: Using AWS SES
Similar integration available with AWS SES

### Option 4: Using Nodemailer
For Gmail or other SMTP services, update the email.ts file to use Nodemailer.

---

## Code Structure

### Files Involved:

**Database Models** (`/prisma/schema.prisma`):
- `VerificationCode` - stores codes with user reference and expiration

**Email Logic** (`/src/lib/email.ts`):
- `generateVerificationCode()` - creates 6-digit code
- `sendVerificationEmail()` - sends email (console in dev, Resend in prod)

**API Endpoints**:
- `POST /api/auth/send-code` - generates and sends verification code
- `POST /api/auth/verify-code` - validates code and returns user

**Pages**:
- `/login` - modified to send code after credentials validation
- `/signup` - modified to send code after account creation
- `/verify-code` - new page for code entry and verification

---

## Security Features

✅ **6-digit codes** - random and unpredictable  
✅ **10-minute expiration** - codes auto-expire  
✅ **Single use** - codes deleted after verification  
✅ **One code per user** - old codes replaced by new ones  
✅ **Database storage** - codes not in URLs or memory  

---

## Testing Checklist

- [x] Development code logging works
- [x] Verification page displays correctly
- [x] Code validation works
- [x] Code expiration works
- [x] Resend integration ready (just add API key)
- [x] Fallback to console logging if email fails
- [ ] Production email service activated

---

## Next Steps for Production

1. **Choose email service** (Resend recommended)
2. **Add API key** to environment variables
3. **Test with real email** 
4. **Update sender address** in `/src/lib/email.ts`
5. **Consider adding**: 
   - Email rate limiting
   - IP-based abuse detection
   - Email bouncing handling
   - Analytics/logging

---

## Troubleshooting

**Code not appearing in console?**
- Check server logs in terminal
- Ensure `/api/auth/send-code` was called (should see POST request)
- Check for errors in the response

**Verification code not working?**
- Code must be exactly 6 digits
- Code expires after 10 minutes
- Each login generates a new code
- Check database for expired codes

**Want to integrate real email service?**
1. Add API key to `.env.local`
2. Uncomment the email service code in `/src/lib/email.ts`
3. Test with real email address
4. Adjust email template as needed
