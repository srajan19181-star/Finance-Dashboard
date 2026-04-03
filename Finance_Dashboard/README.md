# Finance Dashboard

A modern, responsive, and feature-rich financial dashboard application built with React, Vite, Redux Toolkit, and Tailwind CSS. This application allows users to track their income and expenses, view detailed insights, and manage their transactions efficiently.

## 🚀 Features

- **📊 Comprehensive Dashboard:** Get a quick overview of your total balance, income, and expenses with beautiful visual charts (Balance Trend and Spending Breakdown).
- **📝 Transaction Management:** View, search, filter, and sort all your financial entries. 
- **🔐 Role-Based Access Control:** Switch between *User* and *Admin* modes. Admins have the ability to add, edit, and delete transactions.
- **💡 Deep Insights:** Analyze your financial health, savings rate, highest spending categories, and income vs. expenses ratio.
- **🌙 Dark/Light Mode:** Seamlessly toggle between dark and light themes for optimal viewing comfort.
- **📱 Fully Responsive:** Carefully designed to work beautifully across desktop, tablet, and mobile devices.
- **📥 Data Export:** Export your filtered views and transaction data easily.

## 🛠️ Technology Stack

- **Frontend Framework:** [React 19](https://react.dev/) via [Vite](https://vitejs.dev/) for blazing-fast development and build times.
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) for predictable and centralized global application state.
- **Routing:** [React Router v7](https://reactrouter.com/) for declarative routing.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) for rapid and highly customizable styling.
- **Charts:** [Recharts](https://recharts.org/) for beautiful, responsive data visualizations.

## 🗂️ Overview of Approach

The application is built with a focus on modularity, high performance, and a "clean-first" UI philosophy.

### 🏛️ Architecture & State Management
- **Centralized Global State:** Powered by **Redux Toolkit**, the app manages three primary domains:
    - `transactionsSlice`: Handles all CRUD operations for financial records, including complex calculations for dashboard insights.
    - `uiSlice`: Manages theme persistence (dark/light mode), modal visibility, and navigation state.
    - `roleSlice`: Implements basic RBAC (Role-Based Access Control), enabling/disabling editing features based on the current user context.
- **Optimized Selectors:** Uses a selector-based pattern to compute real-time financial stats (Balance, Savings Rate, Expense Ratios) directly from the transaction dataset, ensuring data integrity across all charts and cards.

### 🎨 Design System & Styling
- **Utility-First Styling:** Built with **Tailwind CSS v4**, utilizing a curated color palette (Slate for neutrals, Blue/Green/Red for financial context) to ensure a premium feel.
- **Dynamic Dark Mode:** Implements a class-based dark mode that persists across sessions, with specific semantic color overrides for background surfaces and input fields.
- **Responsive Layouts:** Uses a mobile-first `Layout` wrapper with a persistent `Sidebar` and `Navbar` to maintain a consistent dashboard experience on all viewports.

### 🧩 Component Strategy
- **Modular Directory Structure:** 
    - `common/`: Reusable primitives like `SkeletonLoader`, `Badge`, and `ExportButton`.
    - `dashboard/`: Complex data-visualization components like `BalanceChart` and `SummaryCard`.
    - `transactions/`: Feature-specific modules for managing the transaction lifecycle (table, filters, and forms).
- **Graceful Loading:** Implements custom **Skeletons** for all data-heavy sections to ensure a smooth, layout-shift-free loading experience.

### 🔌 Services & Utilities
- **Mock API Integration:** Uses an asynchronous service layer to simulate real-world data fetching, including artificial latency to demonstrate loading states.
- **Export Utilities:** Custom logic to format and export filtered transaction data, making the information portable for the user.

## 💻 Setup Instructions

Follow these steps to get the project up and running uniquely on your local machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd "Finance_Dashboard"
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open the application:**
   The terminal will provide a local URL (typically `http://localhost:5173/`). Open this in your browser to view the application.

### Building for Production
To create a production-ready build, run:
```bash
npm run build
```
This will compile and optimize the assets into the `dist` folder. You can preview the production build using:
```bash
npm run preview
```

## 📜 Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Locally preview the production build.
- `npm run lint`: Runs ESLint to identify and report on patterns found in ECMAScript/JavaScript code.
