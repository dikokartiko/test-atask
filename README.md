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
- **Testing**: Jest and React Testing Library

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

## 🧪 Testing

The application uses Jest and React Testing Library for unit and component testing.

### Running tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

### View coverage report

Open the HTML coverage report:

```bash
# On Windows
explorer.exe coverage\lcov-report\index.html

# On macOS
open coverage/lcov-report/index.html

# On Linux
xdg-open coverage/lcov-report/index.html
```

## 🧩 Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable UI components
├── contexts/       # React contexts
├── hooks/          # Custom React hooks
├── services/       # API and service functions
├── theme/          # Chakra UI theme configuration
├── __tests__/      # Test files organized by component/feature
├── test-utils/     # Testing utilities and setup
│   ├── setup-tests.ts      # Global test setup
│   └── test-providers.tsx  # Test wrapper providers
├── App.tsx         # Main application component
└── main.tsx        # Application entry point
```

## 🙏 Acknowledgments

- GitHub API for providing the data
- All the open-source libraries used in this project
