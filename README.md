<div align="center">

# Secure Enterprise Portal

### Security Implementation Proposal for the African Development Bank

<br/>

<a href="https://afdb-consultant.github.io/afdb_beta_frontend/">
  <img src="https://img.shields.io/badge/View_Full_Documentation-006837?style=for-the-badge&logo=bookstack&logoColor=white" alt="View Documentation" />
</a>

<br/><br/>

| | |
|---|---|
| **Version** | 1.1 |
| **Date** | August 2026 |
| **Prepared By** | [Eng. Depute N.Alphonse, PMP®](https://www.linkedin.com/in/deputenalphonse/) |
| **Classification** | Confidential |
| **Status** | Implemented & Verified |

</div>

---

## Overview

The AfDB Secure Enterprise Portal is a modern, security-first web application designed to manage project data, reporting, and operational workflows for the African Development Bank. This repository contains the implementation of **critical security pillars** — fully functional with verified results, including email OTP verification on all authentication flows.

## Security Pillars

| Pillar | Description | Status |
|--------|-------------|--------|
| **Email OTP Verification** | 6-digit codes for login, registration, and password reset with 10-min expiry countdown | Implemented & Verified |
| **MFA-Protected Access** | TOTP authenticator apps, backup recovery codes, account lockout protection | Implemented & Verified |
| **SSO-IDP Federation** | OAuth2/OIDC with Google Workspace and Microsoft Azure AD, auto-provisioning | Implemented & Verified |
| **OWASP Top 10 Compliance** | Full coverage of A01–A09 with hardened middleware stack | Implemented & Verified |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   CLIENT LAYER                       │
│   Beta Frontend (:3000)    Core Frontend (:3001)     │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│           AUTHENTICATION GATEWAY                     │
│   Beta Backend (:4000)                               │
│   Auth │ OTP │ MFA │ SSO │ Email Service             │
│   MongoDB (:27017)  │  Redis (:6379)  │  SMTP        │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│   Core Backend (:4001)                               │
│   Dashboard │ Projects │ Reports │ Activities        │
└─────────────────────────────────────────────────────┘
```

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 19, TypeScript, Ant Design 5, Tailwind CSS |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB 7 (Mongoose ODM) |
| **Cache** | Redis 7 (OTP storage, rate limiting, session cache) |
| **Auth** | JWT (access + refresh), bcrypt, otplib (TOTP), Email OTP |
| **Email** | Nodemailer with professional HTML templates (CID logo) |
| **Security** | Helmet, CORS, Input Sanitizer, Rate Limiter, Security Headers |

## Key Security Features

- **Email OTP Verification** — 6-digit codes sent via email for login, registration, and password reset
- **OTP Countdown Timer** — 10-minute expiry with color-coded states (gray → orange → red)
- **OTP Paste Support** — Users can paste full 6-digit codes directly from email
- **Professional Email Templates** — Branded HTML emails with AfDB logo, purpose-specific styling
- **Multi-Factor Authentication** — TOTP-based with 10 backup codes, bcrypt-hashed storage
- **Account Lockout** — 5 failed attempts triggers 15-minute lock
- **OWASP Password Policy** — Min 8 chars, uppercase, lowercase, digit, special character
- **Input Sanitization** — NoSQL injection & XSS pattern detection
- **Security Headers** — CSP, HSTS, X-Frame-Options, Permissions-Policy, Referrer-Policy
- **Rate Limiting** — 5 login attempts/15min, 100 API requests/min
- **OAuth2 SSO** — Authorization Code Flow with CSRF state parameter
- **Auto-Provisioning** — JIT user creation from SSO identity providers

## Quick Start

```bash
# Clone the repository
git clone <repo-url>
cd afdb_beta_frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

> **Prerequisites:** MongoDB (port 27017), Redis (port 6379), Beta Backend running on port 4000, and SMTP configured.

## Authentication Flow with Email OTP

### Login
1. Enter email and password at `/login`
2. After credentials validated, a 6-digit OTP is sent to your email
3. Enter or paste the OTP code on the verification screen
4. Countdown timer shows remaining time (10 minutes)
5. On successful verification, JWT tokens are issued and you're redirected to the dashboard

### Registration
1. Fill in name, email, and password at `/signup`
2. A verification OTP is sent to your email
3. Enter the OTP to confirm email ownership
4. Account is created and you're auto-logged in

### Password Reset
1. Enter your email at `/forgot-password`
2. A reset OTP is sent to your email
3. Enter the OTP to verify your identity
4. Set a new password

### Getting the OTP (Testing with Yopmail)
1. Login with demo credentials (e.g., `afdbadmin@yopmail.com`)
2. Visit [https://yopmail.com](https://yopmail.com)
3. Type the username (e.g., `afdbadmin`) in the inbox field
4. Find the email with subject like "123456 is your AfDB Login Verification Code"
5. Copy the 6-digit code and enter it on the verification screen

## Documentation

The full security implementation proposal is available as an interactive HTML document:

**[View Complete Documentation →](https://afdb-consultant.github.io/afdb_beta_frontend/)**

The documentation covers:
1. Executive Summary
2. System Architecture
3. Technology Stack
4. MFA Implementation Details
5. **Email OTP Verification (NEW)** — Architecture, flows, templates, Yopmail testing guide
6. SSO-IDP Federation Details
7. OWASP Top 10 Compliance Matrix
8. API Reference (20+ endpoints including OTP)
9. Testing Scenarios & Results (48 test cases)
10. Deployment Architecture (including SMTP configuration)
11. Compliance Matrix
12. Appendices (Data Models, Token Lifecycle, Security Logs, Demo Credentials)

## Related Repositories

| Repository | Role |
|-----------|------|
| `afdb_beta_backend` | Authentication Gateway — OTP, MFA, SSO, JWT, Email, OWASP security |
| `afdb_core_frontend` | Data Portal — Dashboard, Projects, Reports |
| `afdb_core_backend` | Data Service — Project & dashboard APIs |

## Demo Credentials

All accounts work on both portals — they share the same authentication backend (Beta).
**Login requires email OTP verification** — after entering credentials, check the user's Yopmail inbox for the 6-digit code.

| Portal | URL |
|--------|-----|
| **Auth Portal** | [http://localhost:3000/login](http://localhost:3000/login) |
| **Enterprise Dashboard** | [http://localhost:3001/login](http://localhost:3001/login) |
| **API Documentation (Scalar)** | [http://localhost:4000/api-docs](http://localhost:4000/api-docs) |

| Role | Email | Password | Yopmail Inbox | Permissions |
|------|-------|----------|---------------|-------------|
| **Admin** | `afdbadmin@yopmail.com` | `Admin@123` | [yopmail.com/?afdbadmin](https://yopmail.com/en/?afdbadmin) | Full access — all features |
| **Viewer** | `afdbaviewer@yopmail.com` | `Viewer@123` | [yopmail.com/?afdbaviewer](https://yopmail.com/en/?afdbaviewer) | Read-only access |
| **Manager** | `afdbmanager@yopmail.com` | `Manager@123` | [yopmail.com/?afdbmanager](https://yopmail.com/en/?afdbmanager) | Project management |

> **Re-seeding:** If credentials stop working (e.g., after a database restart), run:
> ```bash
> cd afdb_beta_backend && node src/seed/users.js
> ```

## Contact

<div>

**Eng. Depute N.Alphonse, PMP®**
*Enterprise Software Architect & Digital Transformation Consultant*

- **Email:** [depute@atradezone.ca](mailto:depute@atradezone.ca)
- **Phone:** +250 782 424 845
- **Location:** Kigali, Rwanda
- **Portfolio:** [atradezone.ca/deputenalphonse](https://atradezone.ca/deputenalphonse)
- **LinkedIn:** [linkedin.com/in/deputenalphonse](https://www.linkedin.com/in/deputenalphonse/)
- **GitHub:** [github.com/deputee](https://github.com/deputee)

</div>

---

<div align="center">

**Confidential** — African Development Bank Consultancy Project

*© 2026 Eng. Depute N.Alphonse, PMP®. All rights reserved.*

</div>
