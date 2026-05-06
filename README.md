# 🩺 MediLink Client

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radixui&logoColor=white)](https://www.radix-ui.com/)

A modern, highly responsive, and feature-rich healthcare management client portal built for patients, doctors, and administrators. Powered by **Next.js**, and **Tailwind CSS v4**, this application delivers an ultra-smooth, premium user experience featuring interactive charts, customizable themes, and a state-of-the-art dashboard system.

---

## 🌐 Live Deployments

- **Frontend Client:** [https://medilink-client-neon.vercel.app](https://medilink-client-neon.vercel.app)
- **Backend API Server:** [https://medilink-server-tau.vercel.app](https://medilink-server-tau.vercel.app)

---

## 📖 Table of Contents

- [🌐 Live Deployments](#-live-deployments)
- [🚀 User Portals & Features](#-user-portals--features)
- [🛠️ Tech Stack Architecture](#️-tech-stack-architecture)
- [📂 Project Structure Breakdown](#-project-structure-breakdown)
- [📐 Router Grouping Layouts](#-router-grouping-layouts)
- [⚡ Quick Start & Setup](#-quick-start--setup)
- [🔧 Environment Variables](#-environment-variables)
- [🎨 Design System & Theme](#-design-system--theme)

---

## 🚀 User Portals & Features

### 👤 Patient Dashboard

- **👨‍⚕️ Advanced Doctor Search:** Search, filter, and review doctors based on medical specialties, availability, and rating scores.
- **📅 Interactive Booking:** Effortlessly book available time slots on the doctor's calendar.
- **💳 Integrated Stripe Payments:** Seamlessly complete payments for booked sessions using the secure Stripe integration.
- **🩺 Electronic Health Records (EHR):** View medical history, track vital healthcare metrics (chronic conditions, blood type, height, weight), and download PDF prescriptions.
- **⭐ Feedbacks & Reviews:** Submit ratings and detailed reviews for doctors post-consultation.

### 🥼 Doctor Dashboard

- **📅 Schedule Configuration:** Easily set up, add, or modify working days, hours, and appointment slots.
- **📋 Appointment Tracker:** Track patient consultations, manage appointment states (Scheduled, Active, Completed, Cancelled).
- **✍️ Digital Prescriptions:** Write and issue detailed digital prescriptions, which are automatically rendered into beautiful PDFs.
- **💬 Feedback Center:** View patient ratings, statistics, and feedback.

### 🛡️ Admin / Super Admin Portal

- **📊 Interactive Analytics:** Track total patients, active doctors, overall appointments, and weekly/monthly revenue.
- **📈 Visual Reports:** Beautiful charts (Bar charts, Pie charts) powered by `Recharts` demonstrating growth and booking metrics.
- **👥 User Auditing:** Manage system profiles, specialties, and approval workflows.

---

## 🛠️ Tech Stack Architecture

- **Next.js (App Router):** Leverages parallel layouts, advanced caching, dynamic loading, and server action utilities.
- **Bun Runtime:** Configured to run using the high-performance Bun runtime (`bun --bun next dev`), enabling lightning-fast building, compiling, and execution.
- **Tailwind CSS v4:** Incorporates the latest v4 engine with a CSS-first configuration and incredibly fast JIT compilation.
- **TanStack Suite:**
  - **React Query (v5):** Handles client-side caching, background fetching, synchronizing, and server-state management.
  - **React Form:** Type-safe form states and validations with perfect control.
  - **React Table:** High-performance, customizable grids, pagination, and sorting for appointments and health reports.
- **Shadcn UI & Radix Primitives:** Fully customized and polished UI modules adhering to premium design principles, with fluid micro-animations provided by `tw-animate-css`.
- **Recharts:** For gorgeous data visualization of appointment distributions and weekly health summaries.
- **Sonner:** Sleek toast notifications.
- **next-themes:** Modern dark mode/light mode toggler.

---

## 📂 Project Structure Breakdown

```
medilink-client/
├── public/                          # Static assets, branding logos, and illustrations
├── src/
│   ├── app/                         # Next.js App Router pages and layouts
│   │   ├── (commonLayout)/          # Shared pages (Landing, About, Contact, medicine, payment, etc.)
│   │   ├── (dashboardLayout)/       # Role-protected dashboards (Patient, Doctor, Admin)
│   │   ├── _actions/                # Server Actions for secure backend requests
│   │   ├── globals.css              # Custom Tailwind directives and design tokens
│   │   └── layout.tsx               # Root Layout providing global context providers
│   ├── components/                  # Component-driven architecture
│   │   ├── ui/                      # Base Radix-based Shadcn components (Button, Input, Dialog, etc.)
│   │   ├── shared/                  # Reusable components (Navbar, Footer, Charts, Tables, Skeletons)
│   │   ├── modules/                 # Specific feature/dashboard components
│   │   │   ├── Patient/             # Patient dashboard views
│   │   │   ├── Doctor/              # Doctor scheduler and prescription managers
│   │   │   └── Auth/                # Sign-in/Sign-up UI forms and social buttons
│   │   └── features/                # Small, interactive modular UI widgets
│   ├── hooks/                       # Custom React hooks (Query hooks, intersection observers)
│   ├── lib/                         # Global helper instances (Axios instance, JWT/Cookie/Token utilities)
│   ├── providers/                   # State Providers (React Query Provider, Theme Provider)
│   ├── services/                    # Clean Service-oriented API callers (Axios wrappers)
│   │   ├── auth.services.ts         # User authentication requests
│   │   ├── appointment.services.ts  # Booking and slot requests
│   │   ├── doctor.services.ts       # Profile and search requests
│   │   └── ...                      # 11 independent endpoint-connected services
│   ├── types/                       # Universal TypeScript interfaces and schemas
│   └── zod/                         # Client-side input validation Zod schemas
```

---

## 📐 Router Grouping Layouts

Next.js route groups allow us to build clean, independent layout wrappers:

- **(commonLayout):** Binds the main responsive header, footer, navigation bar, and landing elements. This layout hosts the public marketing pages, OAuth redirect landing, medicine directory, diagnostics portal, and pricing plans.
- **(dashboardLayout):** Features a sleek role-based navigation sidebar, modern notifications bar, and collapse mechanisms. Sub-layouts handle patient profiles (`patientDashboardLayout`) and doctor tools respectively, rendering custom navigation links tailored for each specific user role.

---

## ⚡ Quick Start & Setup

### Prerequisites

Make sure you have **Bun** installed on your machine for the best performance. Alternatively, you can use `npm` or `yarn`.

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment Variables

Create a `.env` file in the root folder of the client:

```bash
touch .env
```

And add the backend API base URL (see [Environment Variables](#-environment-variables) below).

### 3. Launch Development Server

```bash
bun dev
```

The client portal will start up instantly with hot-reloading active at `http://localhost:3000`.

### 4. Build for Production

To build a highly optimized production bundle:

```bash
bun run build
```

---

## 🔧 Environment Variables

To set up the client environment variables, copy the [.env.example](file:///w:/personal-projects/medilink/medilink-client/.env.example) file as a baseline for your `.env` file.

Set up the following variables in your `.env` file:

```ini
# Base URL for backend API endpoints
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Backend server address for general connections (auth, webhooks)
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

---

## 🎨 Design System & Theme

MediLink is designed with a **premium, professional aesthetic** targeting top-tier healthcare interfaces:

- **🎨 Color Palette:** Tailored HSL color variables with smooth gradients. Includes deep medical indigos, soothing emeralds, and warm alert oranges.
- **🌓 Dark Mode:** Responsive system-wide dark and light themes supported natively using `next-themes`.
- **✨ Micro-Animations:** Custom interactive triggers, button hover transitions, and skeleton loading frames built using `tw-animate-css` for a fluid feel.
- **🔤 Typography:** Beautiful and clean font scaling configured directly in Tailwind v4 for maximum readability.

---

Developed with ❤️ for **MediLink**. License: ISC.
