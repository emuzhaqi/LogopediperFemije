# Deployment Guide - Admin Panel

This guide walks you through deploying the admin panel features for LogopediperFemije.

## Prerequisites

- Supabase CLI installed (`npm install -g supabase`)
- Supabase project already set up
- Resend account with API key
- Access to Supabase Dashboard

## Step-by-Step Deployment

### 1. Deploy Edge Functions

```bash
# Login to Supabase (if not already logged in)
npx supabase login

# Link to your project (if not already linked)
npx supabase link --project-ref vantqwppvpojcerpyanu

# Deploy the admin-auth function
npx supabase functions deploy admin-auth

# Deploy the updated send-appointment-email function
npx supabase functions deploy send-appointment-email
```

Expected output:
```
✓ Deployed Function admin-auth in <time>
✓ Deployed Function send-appointment-email in <time>
```

### 2. Set Environment Variables

Go to Supabase Dashboard: https://supabase.com/dashboard/project/vantqwppvpojcerpyanu

Navigate to: **Settings → Edge Functions → Add new secret**

Add these three environment variables:

#### ADMIN_PASSWORD
- **Value**: Create a strong password (min 12 characters)
- **Example**: `Admin123SecurePassword!`
- **Important**: Remember this password - it's used to login to `/admin`

#### RESEND_API_KEY
- **Value**: Your Resend API key
- **How to get it**:
  1. Go to https://resend.com/api-keys
  2. Create a new API key
  3. Copy the key starting with `re_`
- **Example**: `re_123abc456def`

#### SUPABASE_JWT_SECRET
- **Value**: Your Supabase JWT secret
- **How to find it**:
  1. Go to Project Settings → API
  2. Scroll to "JWT Settings"
  3. Copy the "JWT Secret" value
- **Important**: Keep this secret secure

### 3. Apply Database Security Policies

Go to Supabase SQL Editor: https://supabase.com/dashboard/project/vantqwppvpojcerpyanu/sql

Run this SQL:

```sql
-- Enable Row Level Security on appointments table
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow public (anonymous) inserts for booking appointments
CREATE POLICY "Allow public inserts" ON appointments
  FOR INSERT TO anon WITH CHECK (true);

-- Allow public reads so clients can see available time slots
CREATE POLICY "Allow public reads" ON appointments
  FOR SELECT TO anon USING (true);

-- Allow authenticated users (admin) to update appointments
CREATE POLICY "Allow authenticated updates" ON appointments
  FOR UPDATE TO authenticated USING (true);

-- Prevent all deletes (appointments should not be deleted)
CREATE POLICY "Prevent deletes" ON appointments
  FOR DELETE USING (false);
```

### 4. Configure Email Sender (Optional but Recommended)

#### Verify Your Domain in Resend

1. Go to https://resend.com/domains
2. Add your domain (e.g., `logopediperfemije.com`)
3. Add the DNS records shown
4. Wait for verification (usually 10-30 minutes)

#### Update Email Sender

Edit `/supabase/functions/send-appointment-email/index.ts`:

```typescript
// Line 85 and 141 - Change this:
from: 'onboarding@resend.dev',

// To this (using your verified domain):
from: 'noreply@logopediperfemije.com',
```

Then redeploy:
```bash
npx supabase functions deploy send-appointment-email
```

### 5. Test the Deployment

#### Test 1: Edge Functions are Running

```bash
# Test admin-auth function
curl -X POST https://vantqwppvpojcerpyanu.supabase.co/functions/v1/admin-auth \
  -H "Content-Type: application/json" \
  -d '{"password": "wrongpassword"}'

# Expected: {"error":"Invalid password"}
```

#### Test 2: Admin Login

1. Visit: https://yourdomain.com/admin
2. Enter your `ADMIN_PASSWORD`
3. Should see the admin dashboard

#### Test 3: Appointment Flow

1. Book a test appointment at: https://yourdomain.com/appointments
2. Check Supabase Dashboard → Table Editor → appointments
3. Should see new pending appointment
4. Go to `/admin` and confirm the appointment
5. Check your email for confirmation

### 6. Deploy Frontend

```bash
# Build the Gatsby site
npm run build

# Deploy to your hosting platform
# For GitHub Pages:
npm run deploy

# For other platforms, upload the 'public' folder
```

## Verification Checklist

After deployment, verify:

- [ ] Can access `/admin` page
- [ ] Can login with admin password
- [ ] See list of appointments in dashboard
- [ ] Can filter appointments by status and date
- [ ] Can edit appointment date/time
- [ ] Can confirm appointment and send email
- [ ] Client receives confirmation email
- [ ] Email contains correct appointment details
- [ ] Email contains working payment link
- [ ] Status updates to "confirmed" after email sent
- [ ] Real-time updates work (book from `/appointments`, see in admin)
- [ ] Logout button works
- [ ] Session cleared after browser close

## Troubleshooting

### "Function not found" Error

**Problem**: Admin page shows "Function invoke failed"

**Solution**:
```bash
# Redeploy functions
npx supabase functions deploy admin-auth
npx supabase functions deploy send-appointment-email
```

### "Invalid password" on Correct Password

**Problem**: Login fails even with correct password

**Possible causes**:
1. `ADMIN_PASSWORD` not set in Supabase Dashboard
2. Edge function using different project's env vars

**Solution**:
1. Go to Supabase Dashboard → Edge Functions
2. Verify `ADMIN_PASSWORD` is set
3. Try redeploying: `npx supabase functions deploy admin-auth`

### Emails Not Sending

**Problem**: Confirmation emails not arriving

**Possible causes**:
1. `RESEND_API_KEY` not set or invalid
2. Email going to spam
3. Resend domain not verified

**Solution**:
1. Check Resend dashboard for delivery logs
2. Verify `RESEND_API_KEY` in Supabase env vars
3. Check spam folder
4. Use verified domain instead of `onboarding@resend.dev`

### RLS Policy Errors

**Problem**: "new row violates row-level security policy"

**Solution**:
1. Run the RLS SQL from step 3 again
2. Verify policies exist:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'appointments';
   ```

### JWT Secret Error

**Problem**: "Invalid JWT secret"

**Solution**:
1. Go to Project Settings → API → JWT Settings
2. Copy the correct JWT Secret
3. Update `SUPABASE_JWT_SECRET` in Edge Functions env vars
4. Redeploy functions

## Rollback Plan

If something goes wrong, you can rollback:

### Rollback Edge Functions

```bash
# Revert to previous version (if needed)
# You'll need the previous deployment ID from Supabase dashboard
```

### Disable Admin Panel

To temporarily disable admin access:

1. Remove `ADMIN_PASSWORD` from Supabase env vars
2. Admin login will fail, but appointments continue to work

### Remove RLS Policies

To remove security policies (not recommended):

```sql
DROP POLICY "Allow public inserts" ON appointments;
DROP POLICY "Allow public reads" ON appointments;
DROP POLICY "Allow authenticated updates" ON appointments;
DROP POLICY "Prevent deletes" ON appointments;
ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;
```

## Post-Deployment Tasks

After successful deployment:

1. **Save credentials securely**:
   - Admin password
   - Resend API key
   - Supabase JWT secret

2. **Document for team**:
   - Admin panel URL: `https://yourdomain.com/admin`
   - Admin password (store securely)
   - How to access appointment confirmations

3. **Monitor usage**:
   - Check Supabase dashboard for errors
   - Monitor Resend delivery rates
   - Review appointment confirmations

4. **Set up monitoring** (optional):
   - Add Supabase webhooks for alerts
   - Set up email delivery notifications
   - Monitor edge function usage

## Support

If you encounter issues not covered here:

1. Check Supabase logs: Dashboard → Logs → Edge Functions
2. Check Resend logs: https://resend.com/logs
3. Check browser console for frontend errors
4. Review main README.md for detailed documentation

## Next Steps

Consider these improvements:

- Set up custom domain for admin panel
- Configure SMTP for more reliable email delivery
- Add monitoring and alerting
- Set up automated backups
- Implement appointment reminders
