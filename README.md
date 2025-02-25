# EV Dashboard

## Project Overview

EV Dashboard is a React-based project designed to visualize and manage electric vehicle data. It utilizes technologies such as Vite, Redux, React Router, Leaflet, and Playwright for development, state management, routing, mapping, and end-to-end testing.

## Repository

[GitHub Repository](https://github.com/yevhen-o/ev-dashboard)

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/yevhen-o/ev-dashboard.git
cd ev-dashboard
npm install
```

## Development Server

To start the development server, run:

```sh
npm run dev
```

The app will be available at `http://localhost:51643/` (Gummersbach post code).

## Build for Production

To create a production build:

```sh
npm run build
```

To preview the build:

```sh
npm run preview
```

## Linting

To check for linting errors:

```sh
npm run lint
```

## Testing

### Unit & Integration Tests

To run the tests:

```sh
npm run test
```

For watch mode:

```sh
npm run test:watch
```

### End-to-End Testing (Playwright)

Run Playwright tests:

```sh
npm run e2e
```

Run tests in UI mode:

```sh
npm run e2e:ui
```

Update Playwright snapshots:

```sh
npm run e2e:upd
```

## Git Hooks with Husky

Husky is used to enforce linting and testing before pushing changes.
If hooks are not working, reinstall them:

```sh
npx husky install
```

## Directory Structure

```
.
├── src/                 # Source code
│   ├── components/      # UI components
│   ├── features/        # Feature modules
│   ├── shared/          # Shared utilities and hooks
│   └── store/           # Redux store
├── public/              # Static assets
├── .husky/              # Git hooks
├── .eslintrc.js         # ESLint config
├── vite.config.ts       # Vite config
├── playwright.config.ts # Playwright config
├── tsconfig.json        # TypeScript config
└── package.json         # Project metadata
```

## Contribution

Feel free to fork, submit issues, or open pull requests to contribute.

## License

This project is licensed under the MIT License.
