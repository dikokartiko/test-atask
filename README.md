# GitHub User Explorer

A modern React application that allows users to search for GitHub profiles and view repositories, built with Vite, TypeScript, and Chakra UI. This application was developed as part of a technical assessment for a job application.

## 🚀 Features

- Search for GitHub users by username
- View detailed user information
- Browse user repositories with filtering options
- Responsive design for all device sizes
- Dark/light theme support
- Optimized performance with lazy loading components
- URL parameter support for sharing searches

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Chakra UI
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Icons**: React Icons
- **Theme Support**: Next Themes
- **List Virtualization**: React Virtuoso

## 📋 Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm/yarn

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd test-atask
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory with your configuration:

   ```
   # Port configuration for Vite development server
   VITE_PORT=3001

   # API Base URL
   VITE_API_BASE_URL=https://api.github.com
   ```

## 🚀 Running the Application

### Development mode

```bash
pnpm dev
```

### Production build

```bash
pnpm build
pnpm preview
```

## 🧪 Linting

```bash
pnpm lint
```

## 🧩 Project Structure

```
src/
├── assets/        # Static assets
├── components/    # Reusable UI components
├── contexts/      # React contexts
├── hooks/         # Custom React hooks
├── services/      # API and service functions
├── theme/         # Chakra UI theme configuration
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

## 🙏 Acknowledgments

- GitHub API for providing the data
- All the open-source libraries used in this project
