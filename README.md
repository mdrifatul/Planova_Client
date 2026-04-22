# Planova Client 🚀

A modern, professional event management platform built with the latest web technologies. Planova provides seamless user experiences, professional dashboards, customizable UI elements, and a robust admin capability.

## 🔗 Live URLs

- **Live Application**: [https://planova-client.vercel.app]
- **Live Backend**: [https://planova-server-lake.vercel.app]

- **Frontend Repository**: [https://github.com/mdrifatul/Planova_Client]
- **Backend Repository**: [https://github.com/mdrifatul/Planova_server]

## 🌟 Key Features

- **Event Management**: Create, browse, and manage platform events systematically.
- **Advanced Dashboard**: Professional and classic user profile sections with secure dashboard routing for diverse user roles.
- **Robust Authentication**: Powered by Better Auth with fully configured session cookie management and enterprise-grade security.
- **Secure Financial Transactions**: Integrated Stripe Payment Gateway for seamless ticket purchasing and secure automated invoice generation.
- **Intelligent AI Assistant**: A built-in AI Chatbot to assist users with event inquiries, personalized recommendations, and instant support.
- **Smooth Animations & Interactions**: Utilizing Framer Motion and Lenis for an elegant, fluid user experience.
- **Type-Safe Forms**: Fast and safe form rendering with Tanstack Form and Zod validation adapter.
- **Elegant Theming**: Out of the box light/dark mode support with `next-themes` and carefully crafted dark-mode compatible sections.
- **Modern UI Patterns**: Clean, information-rich, and responsive component UI using Shadcn principles & Radix UI.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) (Icons)
- **Auth**: [Better Auth](https://github.com/better-auth/better-auth)
- **Animations / Scroll**: [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.studiofreight.com/)
- **State & Forms**: [TanStack React Form](https://tanstack.com/form), [Zod](https://zod.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed along with package managers such as `npm`, `yarn`, `pnpm` (recommended), or `bun`.

### Installation

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone <repository-url>
   cd planova_client
   ```

2. Install dependencies:

   ```bash
   pnpm install
   # or npm/yarn install
   ```

3. Set up the environment variables:
   Copy the `.env.example` file to `.env` and securely configure the required environment bindings.

   ```bash
   cp .env.example .env
   ```

4. Run the development server:

   ```bash
   pnpm dev
   # or npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to experience the application locally.

## 📁 Project Structure

This project adopts Next.js App Router conventions heavily categorized into nested routes:

- `src/app/(commonLayout)`: Public-facing views such as the homepage and informative sections.
- `src/app/(dashboardLayout)`: Secured pages intended for specific user profiles and administrative platform governance.
- `src/components`: Extensible UI elements, primarily wrapping Radix primitives styled with Tailwind.
- `src/lib`: Core utilities (like robust Better Auth client setup) and shared functionalities.
- `src/action`: Server actions handling safe API requests for authentication and robust data handling.

## 🤝 Contribution Guidelines

Contributions, issues, and feature requests are welcome. Feel free to check the issues page.
Please ensure you adhere to the project's consistent dark-mode styling and component architecture in all additions.
