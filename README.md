# Mini Business Intelligence Dashboard

A fully functional and visually appealing Business Intelligence BI tool with user authentication, data visualization, and a dashboard displaying meaningful business metrics. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **User Authentication**
  - Login and registration pages with form validation
  - "Keep me logged in" option with auto-logout functionality after 1 minute of inactivity
  - Protected routes for authenticated users only

- **Interactive Dashboard**
  - Metrics summary cards (Total Users, Active Sessions, Sales Revenue, etc.)
  - Data visualizations using Recharts (Line, Bar, and Pie charts)
  - Sortable and filterable data table for transactions

- **Responsive UI**
  - Mobile-friendly design that adapts to different screen sizes
  - Sidebar for easy navigation between dashboard sections
  - Clean and modern UI with smooth transitions and animations

- **Dark Mode Support**
  - Toggle between light and dark themes
  - System preference detection for initial theme

## Tech Stack

- **Frontend Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom theme configuration
- **State Management**: React Context API
- **Data Visualization**: Recharts
- **Authentication**: Custom authentication with Context API (mock API for demo)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mini-bi-dashboard.git
   cd mini-bi-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Demo Credentials

For testing purposes, you can use the following credentials:

- **Email**: demo@example.com
- **Password**: password123

## Project Structure

The project follows a modular structure:


## Key Features Implementation

### Authentication Flow

The authentication is handled by the `AuthContext` provider, which manages user login, registration, and session state. The auto-logout functionality is implemented through the `useAutoLogout` hook that monitors user activity and logs out inactive users after 1 minute when "Keep me logged in" is not selected.

# Use the authentication details to sign in #
```
const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'password123',
    fullName: 'Demo User',
    createdAt: '2023-01-01T00:00:00.000Z',
    lastLogin: '2023-05-10T00:00:00.000Z',
  },
   {
    id: '2',
    email: 'johndoe@gmail.com',
    password: 'johnDoe1343',
    fullName: 'John Doe',
    createdAt: '2023-01-01T00:00:00.000Z',
    lastLogin: '2023-05-10T00:00:00.000Z',
  },

    {
    id: '3',
    email: 'janedoe@gmail.com',
    password: 'janeDoe1343',
    fullName: 'Jane Doe',
    createdAt: '2023-01-01T00:00:00.000Z',
    lastLogin: '2023-05-10T00:00:00.000Z',
  },

   {
    id: '4',
    email: 'hr@branddrive.co',
    password: 'secretPass001',
    fullName: 'Beatrice Omoh',
    createdAt: '2023-01-01T00:00:00.000Z',
    lastLogin: '2023-05-10T00:00:00.000Z',
  },
];
```

### Protected Routes

Routes are protected using Next.js middleware, which checks for authentication before allowing access to the dashboard and redirects unauthenticated users to the login page.

### Data Visualization

The dashboard displays various types of visualizations:
- Line Chart for sales trends
- Bar Chart for user growth
- Pie/Donut Chart for category distribution
- Data Table for transactions with sorting and filtering capabilities

### Dark Mode

Dark mode is implemented using Tailwind CSS's dark mode feature along with a custom `ThemeContext` provider that detects system preferences and allows user toggling between themes.

## Deployment

The application is deployed on Vercel. You can visit the live demo at:

[Live Demo URL](https://biboard.vercel.app/auth/login)

## Future Enhancements

- Add more advanced filtering and search capabilities
- Implement real-time data updates using websockets
- Add user profile management
- Integrate with real backend API
- Add export functionality for reports

