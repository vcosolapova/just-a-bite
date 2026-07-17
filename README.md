# Just a Bite

A kiosk-style ordering app: browse a menu, build a cart, and check out. Includes a staff admin panel for order management.

---

## Getting Started

```bash
git clone https://github.com/vcosolapova/just-a-bite.git
cd just-a-bite
npm install
npm run dev
```

---

## Stack

Vite + React + TypeScript + Tailwind CSS + React Router v6. All client-side, no backend required. localStorage is used for cart and order persistence.

---

## Architecture Decisions

- **Duplicate line items** — adding the same item multiple times creates separate line items by design, per spec. The quantity +/- control on the cart page is a distinct, explicit action.
- **Free items** — Carrot Cake (`price: 0`) is treated as a valid free item throughout, displaying as "Free" and contributing $0.00 to the order total.
- **Dictionary tooltips** — item names are scanned at render time for case-insensitive matches against `dictionary.json`. Matched words render with a dotted underline and hover tooltip on the detail page.

---

## AI Tooling

Claude was used as a thinking partner first: stress testing the requirements, surfacing edge cases (free item handling, broken images, empty states, the duplicate line item interpretation), and defining the architecture before a single line was written. Claude Code was used as the build partner second, implementing the full application from the finalized spec. Human judgment drove every product decision; AI accelerated execution.

---

## Running Tests

```bash
# Run the full test suite
npm run test

# Run tests with the interactive Vitest UI
npm run test:ui
```

The test suite covers 5 critical areas:

- Cart behavior: adding the same item twice always creates separate line items with unique IDs
- Cart behavior: decrementing quantity never drops below 1
- Cart behavior: clearing the cart empties the array and clears localStorage
- Pricing: items with price 0 display as "Free" not "$0.00"
- Dictionary tooltips: matched words in item names render with a hover definition

> [!NOTE]
> This project uses `import { defineConfig } from 'vitest/config'` in vite.config.ts (Vitest v4 dropped the `/// <reference types="vitest" />` approach), and imports `@testing-library/jest-dom/vitest` in setup.ts rather than the bare package (required for correct type augmentation under Vitest's expect). Both are intentional and correct for the installed tool versions.

---

## Admin Interface

A simple staff admin panel is available at `/admin`. Access it via the subtle **Staff Access** button in the bottom right corner of the menu page.

| Field    | Value      |
| -------- | ---------- |
| Username | `admin`    |
| Password | `password` |

From the admin panel you can view all past orders and delete individual orders.

> [!IMPORTANT]
> This is a basic demonstration of how the app could be expanded with an admin layer. In a production environment authentication must be taken seriously. Hardcoded credentials, client-side auth checks, and sessionStorage are not secure patterns for real user data. A production implementation would require server-side authentication, hashed credentials, secure session tokens, and role-based access control.
