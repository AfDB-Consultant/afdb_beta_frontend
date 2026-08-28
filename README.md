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
| **Version** | 1.0 |
| **Date** | August 2026 |
| **Prepared By** | [Eng. Depute N.Alphonse, PMP®](https://www.linkedin.com/in/deputenalphonse/) |
| **Classification** | Confidential |
| **Status** | Implemented & Verified |

</div>

---

## Overview

The AfDB Secure Enterprise Portal is a modern, security-first web application designed to manage project data, reporting, and operational workflows for the African Development Bank. This repository contains the implementation of **three critical security pillars** — fully functional with verified results.

## Security Pillars

| Pillar | Description | Status |
|--------|-------------|--------|
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
│   Auth │ MFA │ SSO │ Security Middleware Stack       │
│   MongoDB (:27018)       │   Redis (:6379)           │
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
| **Cache** | Redis 7 (rate limiting, session cache) |
| **Auth** | JWT (access + refresh), bcrypt, otplib (TOTP) |
| **Security** | Helmet, CORS, Input Sanitizer, Rate Limiter, Security Headers |

## Key Security Features

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

> **Prerequisites:** MongoDB (port 27018), Redis (port 6379), and the Beta Backend running on port 4000.

## Documentation

The full security implementation proposal is available as an interactive HTML document:

**[View Complete Documentation →](https://afdb-consultant.github.io/afdb_beta_frontend/)**

The documentation covers:
1. Executive Summary
2. System Architecture
3. Technology Stack
4. MFA Implementation Details
5. SSO-IDP Federation Details
6. OWASP Top 10 Compliance Matrix
7. API Reference (15+ endpoints)
8. Testing Scenarios & Results (42 test cases)
9. Deployment Architecture
10. Compliance Matrix
11. Appendices (Data Models, Token Lifecycle, Security Logs)

## Related Repositories

| Repository | Role |
|-----------|------|
| `afdb_beta_backend` | Authentication Gateway — MFA, SSO, JWT, OWASP security |
| `afdb_core_frontend` | Data Portal — Dashboard, Projects, Reports |
| `afdb_core_backend` | Data Service — Project & dashboard APIs |

## Demo Credentials

| Credential | Value |
|-----------|-------|
| **Email** | admin@afdb.org |
| **Password** | Password123! |
| **Role** | Administrator |

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
