# 🔒 Security Audit Report — Actuarial Platform
**Date:** 2026-02-22  
**Auditor:** Automated Security Review  
**Project:** kok-trust-ai (actuarial-platform)

---

## Summary

| Category | Found | Fixed | Remaining |
|----------|-------|-------|-----------|
| 🔴 Critical | 3 | 3 | 0 |
| 🟠 High | 2 | 2 | 0 |
| 🟡 Medium | 4 | 3 | 1 (npm dev deps) |
| **Total** | **9** | **8** | **1** |

---

## Vulnerabilities Fixed

### 🔴 CRITICAL-1: Hardcoded API Key in Source Code
- **File:** `run-testsprite.mjs`
- **Risk:** TestSprite API key was embedded in plain text. If committed to git, anyone with repo access could use your account.
- **Fix:** Replaced with `process.env.TESTSPRITE_API_KEY`. Key is now stored in `.env` files which are gitignored.

### 🔴 CRITICAL-2: Insecure JWT Fallback Secret
- **File:** `src/lib/serverAuth.ts`
- **Risk:** `JWT_SECRET` fell back to `"dev-secret"` if the env var was unset. An attacker could forge valid JWTs using this known secret.
- **Fix:** App now throws a fatal error at startup if `JWT_SECRET` is not configured.

### 🔴 CRITICAL-3: Missing NEXTAUTH_SECRET
- **File:** `src/app/api/auth/[...nextauth]/route.ts`
- **Risk:** Without an explicit `secret`, NextAuth uses a derived key that is predictable in production. Session tokens could be forged.
- **Fix:** Added explicit `secret: process.env.NEXTAUTH_SECRET` with startup validation. Also added `maxAge: 8h` (down from 30 days default).

### 🟠 HIGH-1: No File Upload Validation
- **File:** `src/app/api/ingest/route.ts`
- **Risk:** No file size limit → DoS via large uploads. No file type check → malicious file uploads possible.
- **Fix:** Added 10MB max file size limit and strict MIME type whitelist (PDF, PNG, JPEG, WebP, TXT only).

### 🟠 HIGH-2: Unprotected Chat API
- **File:** `src/app/api/chat/route.ts`
- **Risk:** No rate limiting or input validation. An attacker could spam the endpoint, driving up OpenAI API costs or causing denial of service.
- **Fix:** Added rate limiting (30 req/min per IP), message size validation (max 5000 chars), and security headers.

### 🟡 MEDIUM-1: Hardcoded API Key in MCP Config
- **File:** `.cursor/mcp.json`
- **Risk:** API key was hardcoded in config file that could be committed.
- **Fix:** Replaced with `${TESTSPRITE_API_KEY}` env var reference. Added `.cursor/` to `.gitignore`.

### 🟡 MEDIUM-2: Temp Files with Secrets Not Gitignored
- **Files:** `run-testsprite.mjs`, `test-mcp.js`, `BLUEPRINT.pdf`
- **Risk:** Temporary files containing secrets or generated artifacts could be committed.
- **Fix:** Added all temp files to `.gitignore`.

### 🟡 MEDIUM-3: Missing Environment Variables in Templates
- **File:** `.env.example`
- **Risk:** Developers might forget to set critical secrets.
- **Fix:** Added `NEXTAUTH_SECRET` and `TESTSPRITE_API_KEY` to the example template with minimum length notes.

---

## Remaining Items (Low Priority)

### 🟡 MEDIUM-4: npm Dev Dependency Vulnerabilities (39 remaining)
- **Packages:** jest, eslint, prisma tooling (all dev dependencies)
- **Risk:** Low — these don't ship in production. They affect local development only.
- **Action:** Run `npm audit fix --force` when ready for major version bumps, or wait for upstream fixes.

---

## Pre-Existing Positive Security Measures ✅

The codebase already had several good security practices in place:
- ✅ Helmet.js with strict CSP headers
- ✅ Rate limiting on auth endpoints (5 req/15 min)
- ✅ MongoDB query sanitization (express-mongo-sanitize)
- ✅ Strong password validation (12+ chars, complexity rules)
- ✅ JWT algorithm pinning (HS256 only)
- ✅ CORS origin whitelisting
- ✅ Request body size limits (10kb)
- ✅ Zod schema validation for all inputs
- ✅ Error message sanitization in production
- ✅ `.env` files properly gitignored
- ✅ Security headers on Next.js config

---

## Recommendations for Future Hardening

1. **Replace in-memory rate limiter** with Redis-backed solution for production (current Map-based limiter resets on restart)
2. **Add CSRF protection** to forms and API mutations
3. **Implement request logging** for security events (failed logins, rate limit hits)
4. **Set `trust proxy`** to the actual number of proxies in front of the app (currently set to `1`)
5. **Tighten CSP** — remove `'unsafe-inline'` and `'unsafe-eval'` from script-src when possible
6. **Add API key rotation** mechanism for external services
7. **Generate strong secrets** for production — use `openssl rand -base64 32` for JWT and NextAuth secrets
