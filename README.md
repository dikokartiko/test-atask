# GitHub User Explorer

A modern React application that allows users to search for GitHub profiles and view repositories, built with Vite, TypeScript, and Chakra UI. This application was developed as part of a technical assessment for a job application.

## 🚀 Features

- Search for GitHub users by username
- View detailed user information
- Responsive design for all device sizes
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

- Node.js 22.9.0 (specified in .nvmrc)
- pnpm (recommended) or npm/yarn
- [Volta](https://volta.sh/) (optional) - The project includes Volta configuration for consistent tooling

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

## 🐳 Docker Setup

This project includes Docker configuration for both development and production environments.

### Development Environment

Run the application in development mode with hot reloading:

```bash
docker compose -f docker-compose.dev.yml up
```

This will:

- Mount the source code as a volume for real-time updates
- Expose the development server on port 3001
- Set up the environment for development

### Production Environment

Build and run the production-ready container:

```bash
docker compose -f docker-compose.prod.yml up -d
```

This will:

- Build the React application
- Serve the static files using Nginx
- Run the container in detached mode
- Expose the application on port 80

### Building Custom Images

You can also build and tag custom images:

```bash
# Development image
docker build --target development -t github-explorer:dev .

# Production image
docker build --target production -t github-explorer:prod .
```

## �� Project Structure

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
