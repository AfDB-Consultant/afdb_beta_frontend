# AfDB Beta Frontend — Secure Access Portal

> Entry portal for African Development Bank users with MFA authentication, OWASP Top 10 hardened login flows, session management, and role-based dashboard routing.

## Technology Stack
- **Framework:** Next.js 15 + React 19
- **Language:** TypeScript
- **UI Library:** Ant Design 5 + Tailwind CSS
- **Auth:** JWT + MFA (TOTP) + SSO-IDP federation
- **State:** TanStack React Query

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Repository Purpose
This is the **Beta tier frontend** — the first thing Bank users see. It handles:
- MFA enrollment and verification
- OWASP-hardened authentication flows
- Secure session management
- Role-based routing to appropriate dashboards
- SSO-IDP token handoff processing

## License
Private — African Development Bank Consultancy Project
