# Nathan Software

For practice, not income.

## Built With

- 🚀 React 19
- 📖 React Router 7
- 🔒 TypeScript 5
- 🎸 Mantine UI 7


## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start react-router in development mode:

```bash
npm run app:dev
```

The application will be available at `http://localhost:5173`.

### Server

Start the development server:

```bash
npm run server:dev
```

The server will be available at `http://localhost:3001`.


## Deployment

### Lint

Lint is enabled through ESLint and will autoformat on save. Lint can also be executed in the command line.

```bash
npm run app:lint
```

### Build

Create a production build:

```bash
npm run app:build
```

If you're familiar with deploying Node applications, the built-in app server is production-ready.

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

### Deploy

Code is deployed automatically by a [Vercel project](https://vercel.com/nathan-charrois-projects ) when changes are detected on `master` in this Github repository.

---

Built with ❤️ in Vancouver
