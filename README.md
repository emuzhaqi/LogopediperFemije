# LogopediperFemije - Speech Therapy Appointment Booking System

A professional appointment booking and management system for speech therapy services, built with Gatsby, React, and Supabase.

## Features

### Client-Facing Features
- **Appointment Booking**: Intuitive calendar interface for booking speech therapy appointments
- **Multiple Service Types**: Support for in-person consultations, online consultations, and mentoring meetings
- **Real-time Availability**: Live updates showing available time slots; blocked dates are hidden automatically
- **Bilingual Support**: English and Albanian language options
- **Responsive Design**: Mobile-first design that works on all devices

### Admin Features
- **Password-Protected Admin Panel**: Secure access to appointment management
- **Appointments Dashboard**: View and filter all appointments by status and date range
- **Inline Editing**: Edit appointment date and time directly from the table
- **One-Click Confirmation**: Send confirmation emails with payment links
- **Real-time Updates**: Appointments update automatically without page refresh
- **Email Notifications**: Automated emails to clients with payment instructions
- **PayPal Payment Integration**: Generate PayPal payment orders per appointment; webhook marks payments as paid
- **Blocked Dates Management**: Block specific days from the admin panel so clients cannot book them

## Tech Stack

- **Frontend**: Gatsby (React), React Context API
- **Backend**: Supabase (PostgreSQL, Edge Functions, Real-time)
- **Email**: Resend API
- **Payments**: PayPal Orders API (via Supabase Edge Functions)
- **Authentication**: JWT-based admin authentication
- **Hosting**: GitHub Pages (or any static site host)

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── admin/                       # Admin panel components
│   │   │   ├── AdminDashboard.js        # Main admin interface
│   │   │   ├── AppointmentsTable.js     # Appointments list with filters
│   │   │   ├── AppointmentRow.js        # Individual appointment row with editing & payment status
│   │   │   ├── BlockedDates.js          # Calendar UI for blocking/unblocking dates
│   │   │   ├── ConfirmationModal.js     # Email confirmation dialog with PayPal link
│   │   │   ├── LoginForm.js             # Admin login form
│   │   │   ├── NotificationToast.js     # Success/error notifications
│   │   │   ├── PaymentLinkGenerator.js  # Standalone PayPal link generator tool
│   │   │   └── ProtectedRoute.js        # Auth wrapper component
│   │   ├── appointments/                # Public booking components
│   │   │   └── CalendlyStyle.js         # Booking calendar interface (respects blocked dates)
│   │   ├── Design1.js                   # Homepage design component
│   │   ├── Layout.js                    # Page layout wrapper
│   │   └── Navigation.js               # Site navigation
│   ├── context/
│   │   ├── AdminAuthContext.js          # Admin authentication state
│   │   └── LanguageContext.js           # i18n language state
│   ├── pages/
│   │   ├── admin.js                     # Admin panel page (/admin)
│   │   ├── appointments.js              # Booking page (/appointments)
│   │   └── index.js                     # Homepage
│   └── utils/
│       ├── adminEmailService.js         # Email API wrapper
│       ├── paypalService.js             # PayPal payment link helpers
│       └── supabase.js                  # Supabase client configuration
├── supabase/
│   ├── functions/
│   │   ├── admin-auth/                  # Password validation edge function
│   │   │   ├── index.ts
│   │   │   └── deno.json
│   │   ├── create-paypal-payment/       # Creates PayPal order and returns approval URL
│   │   │   ├── index.ts
│   │   │   └── deno.json
│   │   ├── paypal-webhook/              # Handles PayPal webhook; marks appointment as paid
│   │   │   ├── index.ts
│   │   │   └── deno.json
│   │   └── send-appointment-email/      # Email sending edge function
│   │       ├── index.ts
│   │       └── deno.json
│   ├── migrations/
│   │   ├── 20260208_enable_rls.sql      # Row Level Security policies
│   │   ├── 20260223_add_payment_fields.sql  # Payment columns on appointments table
│   │   ├── 20260224_add_blocked_dates.sql   # blocked_dates table + nullable appointment_time
│   │   └── 20260225_fix_rls_policies.sql    # RLS fixes for anon admin writes
│   └── config.toml                     # Supabase configuration
└── README.md
```

## Database Schema

### `appointments` Table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key (auto-generated) |
| appointment_date | date | Appointment date (YYYY-MM-DD) |
| appointment_time | text | Time slot (HH:MM format) — nullable; admin may assign after booking |
| appointment_type | text | Type: `in-person-consultation`, `online-consultation`, `mentoring-meeting` |
| client_name | text | Client's full name |
| client_email | text | Client's email address |
| client_phone | text | Client's phone number |
| details | text | Additional notes/concerns (optional) |
| status | text | `pending` or `confirmed` |
| payment_link | text | PayPal (or manual) payment link sent to client |
| payment_amount | numeric | Amount charged (default: 35) |
| payment_status | text | `unpaid` or `paid` |
| paypal_order_id | text | PayPal order ID for webhook reconciliation |
| created_at | timestamp | Auto-generated creation timestamp |

### `blocked_dates` Table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key (auto-generated) |
| blocked_date | date | Date that is blocked for bookings (unique) |
| created_at | timestamp | Auto-generated creation timestamp |

### Row Level Security (RLS) Policies

- **Public Inserts**: Anonymous users can book appointments
- **Public Reads**: Anyone can view appointments (for availability checking)
- **Anon Updates**: Admin (using anon key + JWT) can update appointments
- **No Deletes**: Appointments cannot be deleted (data preservation)
- **Blocked Dates — Public Reads**: Anyone can read blocked dates (booking page hides them)
- **Blocked Dates — Anon Inserts/Deletes**: Admin can add or remove blocked dates

## Environment Variables

### Required Environment Variables (Supabase Dashboard)

Set these in: **Supabase Dashboard → Project Settings → Edge Functions → Environment Variables**

| Variable | Description | Example |
|----------|-------------|---------|
| `ADMIN_PASSWORD` | Admin panel password (min 12 characters recommended) | `MySecurePassword123!` |
| `RESEND_API_KEY` | Resend API key for sending emails | `re_xxxxxxxxxxxxx` |
| `SUPABASE_JWT_SECRET` | JWT signing secret (found in Supabase project settings) | Auto-generated by Supabase |
| `PAYPAL_CLIENT_ID` | PayPal REST API client ID | `AaBbCc...` |
| `PAYPAL_CLIENT_SECRET` | PayPal REST API client secret | `EeFfGg...` |
| `PAYPAL_MODE` | `sandbox` for testing, `live` for production | `sandbox` |

### Frontend Environment Variables

Create `.env.production` or configure in your hosting platform:

```bash
GATSBY_SUPABASE_URL=https://your-project.supabase.co
GATSBY_SUPABASE_ANON_KEY=your-anon-key
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd LogopediperFemije
npm install
```

### 2. Set Up Supabase

#### Create the Database Tables

In Supabase SQL Editor, run the migrations in order:

```bash
# Apply all migrations
cat supabase/migrations/20260208_enable_rls.sql
cat supabase/migrations/20260223_add_payment_fields.sql
cat supabase/migrations/20260224_add_blocked_dates.sql
cat supabase/migrations/20260225_fix_rls_policies.sql
```

Or run them manually in the Supabase SQL Editor one by one.

The base `appointments` table schema:

```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_date DATE NOT NULL,
  appointment_time TEXT,
  appointment_type TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  details TEXT,
  status TEXT DEFAULT 'pending',
  payment_link TEXT,
  payment_amount NUMERIC DEFAULT 35,
  payment_status TEXT DEFAULT 'unpaid',
  paypal_order_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocked_date DATE NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Deploy Edge Functions

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
npx supabase login

# Link your project
npx supabase link --project-ref your-project-ref

# Deploy all functions
npx supabase functions deploy admin-auth
npx supabase functions deploy send-appointment-email
npx supabase functions deploy create-paypal-payment
npx supabase functions deploy paypal-webhook
```

### 4. Configure Environment Variables

In Supabase Dashboard:
1. Go to **Project Settings → Edge Functions**
2. Add environment variables:
   - `ADMIN_PASSWORD`: Your secure admin password
   - `RESEND_API_KEY`: Get from [resend.com](https://resend.com)
   - `SUPABASE_JWT_SECRET`: Found in Project Settings → API → JWT Settings
   - `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET`: From [developer.paypal.com](https://developer.paypal.com)
   - `PAYPAL_MODE`: `sandbox` for testing, `live` for production

### 5. Set Up Email Sender

1. Sign up at [Resend](https://resend.com)
2. Verify your sending domain (or use `onboarding@resend.dev` for testing)
3. Update email sender in `/supabase/functions/send-appointment-email/index.ts`:
   ```typescript
   from: 'noreply@yourdomain.com'  // Update this line
   ```

### 6. Configure PayPal Webhook

1. In the PayPal Developer Dashboard, create a webhook pointing to:
   ```
   https://<your-supabase-project>.supabase.co/functions/v1/paypal-webhook
   ```
2. Subscribe to the `PAYMENT.CAPTURE.COMPLETED` event.
3. The webhook will automatically mark the appointment `payment_status` as `paid`.

### 7. Build and Deploy

```bash
# Development
npm run develop

# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Usage Guide

### For Clients (Public)

1. Visit `/appointments` page
2. Select a date from the calendar (weekdays only; blocked dates are hidden)
3. Choose an available time slot
4. Select appointment type
5. Fill in contact details and concerns
6. Submit the booking
7. Wait for confirmation email with payment link

### For Admin

#### Accessing the Admin Panel

1. Navigate to `/admin` (not visible in navigation)
2. Enter admin password
3. Session remains active until browser is closed

#### Managing Appointments

**View Appointments:**
- Use filters to view by status (All/Pending/Confirmed)
- Filter by date range for specific periods
- Appointments update in real-time

**Edit Appointment:**
1. Click "Edit" button on any appointment
2. Modify date and/or time
3. Click "Save" to update
4. Validation prevents past dates and weekends

**Confirm Appointment:**
1. Click "Confirm" button on a pending appointment
2. Review appointment details in modal
3. Generate a PayPal payment link or enter a manual payment URL
4. Click "Send Confirmation Email"
5. Client receives email with payment instructions
6. Status automatically updates to "Confirmed"

**Generate Standalone Payment Link:**
- Use the "Payment Link Generator" tool in the admin dashboard
- Select appointment type and amount
- Click "Generate" to create a PayPal order link
- Copy and share the link independently of an appointment

**Block / Unblock Dates:**
1. Open the "Blocked Dates" section in the admin dashboard
2. Navigate the calendar and click on weekday dates to toggle them
3. Click "Save Changes" — blocked dates are stored in the `blocked_dates` table
4. The booking calendar on `/appointments` will hide these dates automatically

**Logout:**
- Click "Logout" button in top-right corner
- Session token is cleared immediately

## Email Templates

### New Appointment Email (to Admin)
- **Recipient**: logopediperfemije@gmail.com
- **Trigger**: When client books appointment
- **Contains**: Date, time, type, client details

### Confirmation Email (to Client)
- **Recipient**: Client's email address
- **Trigger**: When admin confirms appointment
- **Contains**: Appointment details, payment link button

## Security Features

- **Password-Protected Admin Access**: JWT-based authentication
- **Session Management**: Tokens stored in sessionStorage (cleared on browser close)
- **Row Level Security**: Database-level access control
- **CORS Protection**: Edge functions validate origins
- **No Admin Link**: `/admin` route not visible in navigation
- **Token Expiry**: 4-hour session timeout

## Development

### Local Development

```bash
# Start Gatsby development server
npm run develop

# Start Supabase locally (optional)
npx supabase start

# Serve functions locally
npx supabase functions serve
```

### Testing

**Test Appointment Booking:**
1. Go to `/appointments`
2. Book a test appointment
3. Check Supabase dashboard for new record

**Test Admin Panel:**
1. Go to `/admin`
2. Login with admin password
3. Verify appointment appears in dashboard
4. Test editing, confirming, and blocking dates

**Test Email Flow:**
1. Confirm an appointment
2. Check email delivery in Resend dashboard
3. Verify email content and links

**Test PayPal Flow:**
1. Use sandbox credentials (`PAYPAL_MODE=sandbox`)
2. Generate a payment link from the admin panel
3. Complete payment with a PayPal sandbox buyer account
4. Verify the webhook marks `payment_status` as `paid`

## Troubleshooting

### Admin Login Not Working
- Verify `ADMIN_PASSWORD` is set in Supabase Edge Functions environment
- Check browser console for errors
- Ensure `admin-auth` function is deployed

### Emails Not Sending
- Verify `RESEND_API_KEY` is set correctly
- Check Resend dashboard for delivery status
- Verify sender email is verified in Resend

### Real-time Updates Not Working
- Check Supabase Realtime is enabled in project settings
- Verify RLS policies are applied
- Check browser console for WebSocket errors

### Appointments Not Saving
- Verify database table exists and has correct schema
- Check RLS policies allow anonymous inserts
- Review Supabase logs for errors

### PayPal Payments Not Updating
- Verify `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, and `PAYPAL_MODE` are set
- Confirm the webhook URL is registered in the PayPal Developer Dashboard
- Check the `paypal-webhook` function logs in Supabase

### Blocked Dates Not Appearing on Booking Page
- Confirm the `blocked_dates` table exists and RLS allows public reads
- Run the `20260224_add_blocked_dates.sql` and `20260225_fix_rls_policies.sql` migrations
- Check browser console for Supabase query errors

## Deployment Checklist

- [ ] Deploy edge functions (`admin-auth`, `send-appointment-email`, `create-paypal-payment`, `paypal-webhook`)
- [ ] Set environment variables in Supabase Dashboard
- [ ] Apply all RLS migrations to the database
- [ ] Configure verified email sender in Resend
- [ ] Update email sender address in edge function
- [ ] Set strong admin password (min 12 characters)
- [ ] Configure PayPal credentials and register webhook
- [ ] Test appointment booking flow
- [ ] Test admin login, confirmation, and blocked dates flows
- [ ] Verify email delivery
- [ ] Verify PayPal payment capture and webhook
- [ ] Build and deploy frontend (`gatsby build`)

## Future Enhancements

- Appointment cancellation/rescheduling
- Email template customization
- SMS notifications
- Calendar view for admin
- Analytics dashboard
- Multi-admin support with roles
- Client portal for viewing appointments

## Support

For issues or questions:
- Check existing documentation
- Review Supabase logs
- Check browser console for errors
- Contact: logopediperfemije@gmail.com

## License

[Add your license here]

## Credits

Built with:
- [Gatsby](https://www.gatsbyjs.com/)
- [Supabase](https://supabase.com/)
- [Resend](https://resend.com/)
- [PayPal REST API](https://developer.paypal.com/)
- [React](https://reactjs.org/)
