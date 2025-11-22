# PLP Express SSR - Full Runnable Project

## What this is
A minimal **Express + React** Server-Side Rendered Product Listing Page (PLP) starter that:
- Renders product listing on the server using `react-dom/server`.
- Fetches product data from FakeStoreAPI on the server.
- Provides simple mock authentication (in-memory) with bcrypt + JWT + HttpOnly cookie.
- Hydrates a client React app for interactivity.
- Uses `esbuild` to bundle server and client code.

## How to run locally

1. Install dependencies
```
npm install
```

2. Build (bundles client + server)
```
npm run build
```

3. Start server
```
npm start
```

4. Open http://localhost:3000

## Dev
You can run in watch mode:
```
npm run dev
```

## Notes
- This project uses an **in-memory user store** for demo purposes only. Do NOT use in production.
- Set `JWT_SECRET` env var for production: `export JWT_SECRET=your_secret_here`
- Deploy to any Node hosting (Render, Railway, Fly). For Vercel, you'd adapt to serverless functions.

