// // server-entry-updated.js
// // Updated server code with:
// // - GET /api/auth/logout (redirect) for anchor-based logout
// // - GET /signin and GET /signup to serve the static HTML pages directly
// // - Improved cookie options (secure when in production, maxAge)
// // - Minor defensive checks

// import express from 'express';
// import path from 'path';
// import fs from 'fs';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import cookieParser from 'cookie-parser';
// import axios from 'axios';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import App from './App.jsx';

// const __dirname = path.resolve();
// const app = express();
// const PORT = process.env.PORT || 3000;
// const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
// const IS_PROD = process.env.NODE_ENV === 'production';

// app.use(express.json());
// app.use(cookieParser());

// // Serve public assets from project root /public
// app.use(express.static(path.join(process.cwd(), 'public')));

// // in-memory users (demo only)
// const users = new Map();

// function renderPage(html, preloadedState, page = 'home') {
//   return `<!doctype html>
// <html>
//   <head>
//     <meta charset="utf-8"/>
//     <meta name="viewport" content="width=device-width,initial-scale=1"/>
//     <title>PLP - SSR</title>
//     <link rel="stylesheet" href="/styles.css">
//   </head>
//   <body>
//     <div id="root">${html}</div>
//     <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}; window.__PAGE__='${page}';</script>
//     <script src="/client.js"></script>
//   </body>
// </html>`;
// }

// /** Auth - Register */
// app.post('/api/auth/register', (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });
//     if (users.has(email)) return res.status(400).json({ message: 'User exists' });
//     const hash = bcrypt.hashSync(password, 8);
//     users.set(email, { email, password: hash });
//     return res.status(201).json({ message: 'ok' });
//   } catch (err) {
//     console.error('Register error', err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

// /** Auth - Login */
// app.post('/api/auth/login', (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });

//     const user = users.get(email);
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//     const ok = bcrypt.compareSync(password, user.password);
//     if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });

//     // Secure cookie options
//     const cookieOptions = {
//       httpOnly: true,
//       sameSite: 'lax',
//       secure: IS_PROD, // only send Secure in production (requires HTTPS)
//       path: '/',
//       maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in ms
//     };

//     res.cookie('token', token, cookieOptions);
//     return res.json({ message: 'ok' });
//   } catch (err) {
//     console.error('Login error', err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

// /** Auth - Logout (POST) */
// app.post('/api/auth/logout', (req, res) => {
//   res.clearCookie('token', { path: '/' });
//   return res.json({ message: 'ok' });
// });

// /** Auth - Logout (GET) - supports anchor links that use GET */
// app.get('/api/auth/logout', (req, res) => {
//   res.clearCookie('token', { path: '/' });
//   // Redirect to home
//   return res.redirect('/');
// });

// /** Serve static signin/signup pages (client will hydrate) */
// // app.get('/signin', (req, res) => {
// //   const filePath = path.join(process.cwd(), 'public', 'signin.html');
// //   if (fs.existsSync(filePath)) return res.sendFile(filePath);
// //   return res.status(404).send('Signin page not found');
// // });

// // server: /signin route - redirect to / if user already logged in
// app.get('/signin', (req, res) => {
//   const token = req.cookies && req.cookies.token;
//   if (token) {
//     try {
//       jwt.verify(token, JWT_SECRET);
//       // user already logged in — redirect to home to avoid showing signin UI
//       return res.redirect('/');
//     } catch (err) {
//       // invalid token — continue to serve signin page
//     }
//   }

//   const filePath = path.join(process.cwd(), 'public', 'signin.html');
//   if (fs.existsSync(filePath)) return res.sendFile(filePath);
//   return res.status(404).send('Signin page not found');
// });


// // app.get('/signup', (req, res) => {
// //   const filePath = path.join(process.cwd(), 'public', 'signup.html');
// //   if (fs.existsSync(filePath)) return res.sendFile(filePath);
// //   return res.status(404).send('Signup page not found');
// // });

// app.get('/signup', (req, res) => {
//   const token = req.cookies && req.cookies.token;
//   if (token) {
//     try {
//       jwt.verify(token, JWT_SECRET);
//       return res.redirect('/');
//     } catch (err) { /* invalid token -> show signup */ }
//   }
//   const filePath = path.join(process.cwd(), 'public', 'signup.html');
//   if (fs.existsSync(filePath)) return res.sendFile(filePath);
//   return res.status(404).send('Signup page not found');
// });


// /** Home - SSR product listing */
// app.get('/', async (req, res) => {
//   try {
//     const [productsRes, categoriesRes] = await Promise.all([
//       axios.get('https://fakestoreapi.com/products'),
//       axios.get('https://fakestoreapi.com/products/categories')
//     ]);
//     const products = productsRes.data;
//     const categories = categoriesRes.data;

//     let user = null;
//     const token = req.cookies.token;
//     if (token) {
//       try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         user = { email: decoded.email };
//       } catch (e) {
//         user = null;
//       }
//     }

//     const preloadedState = { products, categories, user };
//     const appHtml = renderToString(React.createElement(App, { ssrState: preloadedState, page: 'home' }));
//     return res.send(renderPage(appHtml, preloadedState, 'home'));
//   } catch (e) {
//     console.error('Home render error', e);
//     return res.status(500).send('Server error');
//   }
// });

// /** Product detail page - SSR */
// app.get('/product/:id', async (req, res) => {
//   const id = req.params.id;
//   try {
//     const productRes = await axios.get(`https://fakestoreapi.com/products/${id}`);
//     const product = productRes.data;
//     const preloadedState = { product };
//     const appHtml = renderToString(React.createElement(App, { ssrState: preloadedState, page: 'product' }));
//     return res.send(renderPage(appHtml, preloadedState, 'product'));
//   } catch (e) {
//     console.error('Product render error', e);
//     return res.status(404).send('Not found');
//   }
// });

// /** Fallback: if you want all unknown routes to serve index (optional) */
// // app.get('*', (req, res) => {
// //   const index = path.join(process.cwd(), 'public', 'index.html');
// //   if (fs.existsSync(index)) return res.sendFile(index);
// //   return res.status(404).send('Not found');
// // });

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });





// src/server-entry.jsx  (replace your existing server entry with this)
import express from 'express';
import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import App from './App.jsx';


// ---- Simple JSON file user store ----
const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

function loadUsersFromFile() {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      return new Map();
    }
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    if (!raw.trim()) return new Map();

    const arr = JSON.parse(raw); // [{ email, password }]
    const map = new Map();
    for (const u of arr) {
      if (u.email && u.password) {
        map.set(u.email, u);
      }
    }
    console.log(`Loaded ${map.size} user(s) from disk`);
    return map;
  } catch (err) {
    console.error('Failed to load users.json', err);
    return new Map();
  }
}

function saveUsersToFile(users) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const arr = Array.from(users.values());
    fs.writeFileSync(USERS_FILE, JSON.stringify(arr, null, 2), 'utf8');
    console.log('Users saved to', USERS_FILE);
  } catch (err) {
    console.error('Failed to save users.json', err);
  }
}



const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const IS_PROD = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(cookieParser());
// serve public directory reliably
app.use(express.static(path.join(process.cwd(), 'public')));

// In-memory users (demo only)
// users backed by data/users.json
const users = loadUsersFromFile();


function renderPage(html, preloadedState, page = 'home') {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>PLP - SSR</title>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <div id="root">${html}</div>
    <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g,'\\u003c')}; window.__PAGE__='${page}';</script>
    <script src="/client.js"></script>
  </body>
</html>`;
}

/* ---------- AUTH API ---------- */
// app.post('/api/auth/register', (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });
//     if (users.has(email)) return res.status(400).json({ message: 'User exists' });
//     const hash = bcrypt.hashSync(password, 8);
//     users.set(email, { email, password: hash });
//     return res.status(201).json({ message: 'ok' });
//   } catch (err) {
//     console.error('Register error', err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });



app.post('/api/auth/register', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }
    if (users.has(email)) {
      return res.status(400).json({ message: 'User exists' });
    }

    const hash = bcrypt.hashSync(password, 8);
    users.set(email, { email, password: hash });

    // 🔐 persist to disk
    saveUsersToFile(users);

    return res.status(201).json({ message: 'ok' });
  } catch (err) {
    console.error('Register error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });
    const user = users.get(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = bcrypt.compareSync(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
    const cookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      secure: IS_PROD,
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000
    };
    res.cookie('token', token, cookieOptions);
    return res.json({ message: 'ok' });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token', { path: '/' });
  return res.json({ message: 'ok' });
});
app.get('/api/auth/logout', (req, res) => {
  res.clearCookie('token', { path: '/' });
  return res.redirect('/');
});

/* ---------- ROUTES ---------- */

/**
 * Root: show products only if user signed in.
 * If not signed in, redirect to /signin (so signin page is the app entry)
 */
// app.get('/', async (req, res) => {
//   try {
//     const token = req.cookies && req.cookies.token;
//     if (!token) {
//       // not logged in -> redirect to signin page (so sign-in is the app entry)
//       return res.redirect('/signin');
//     }

//     // verify token
//     let user = null;
//     try {
//       const decoded = jwt.verify(token, JWT_SECRET);
//       user = { email: decoded.email };
//     } catch (err) {
//       // invalid token -> clear cookie and redirect to signin
//       res.clearCookie('token', { path: '/' });
//       return res.redirect('/signin');
//     }

//     // fetch products/categories and render PLP for authenticated user
//     const [productsRes, categoriesRes] = await Promise.all([
//       axios.get('https://fakestoreapi.com/products'),
//       axios.get('https://fakestoreapi.com/products/categories')
//     ]);
//     const products = productsRes.data;
//     const categories = categoriesRes.data;
//     const preloadedState = { products, categories, user };
//     const appHtml = renderToString(React.createElement(App, { ssrState: preloadedState, page: 'home' }));
//     return res.send(renderPage(appHtml, preloadedState, 'home'));
//   } catch (e) {
//     console.error('Home render error', e);
//     return res.status(500).send('Server error');
//   }
// });



app.get('/', async (req, res) => {
  try {
    const token = req.cookies && req.cookies.token;
    if (!token) {
      return res.redirect('/signin');
    }

    // verify token and derive user
    let user = null;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      user = { email: decoded.email };
    } catch (err) {
      res.clearCookie('token', { path: '/' });
      return res.redirect('/signin');
    }

    let products = [];
    let categories = [];

    try {
      // 🔹 Try to fetch from FakeStoreAPI normally
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get('https://fakestoreapi.com/products'),
        axios.get('https://fakestoreapi.com/products/categories')
      ]);
      products = productsRes.data;
      categories = categoriesRes.data;
    } catch (err) {
      console.error(
        'Failed to fetch from FakeStoreAPI, using mock data instead:',
        err.toString()
      );

      // 🔹 Fallback: load local mock data from mock-data/products.json
      const mockPath = path.join(process.cwd(), 'mock-data', 'products.json');
      // const mockPath = path.resolve('mock-data/products.json');

      const raw = fs.readFileSync(mockPath, 'utf8');
      const mockProducts = JSON.parse(raw);

      products = mockProducts;
      categories = Array.from(
        new Set(mockProducts.map((p) => p.category))
      );
    }

    const preloadedState = { products, categories, user };
    const appHtml = renderToString(
      React.createElement(App, { ssrState: preloadedState, page: 'home' })
    );
    return res.send(renderPage(appHtml, preloadedState, 'home'));
  } catch (e) {
    console.error('Home render error', e);
    return res.status(500).send('Server error');
  }
});


/**
 * /signin: serve sign-in page when not authenticated.
 * If already authenticated (valid token), redirect to '/'
 */
app.get('/signin', (req, res) => {
  const token = req.cookies && req.cookies.token;
  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
      return res.redirect('/');
    } catch (err) {
      // invalid token -> clear and continue to show signin
      res.clearCookie('token', { path: '/' });
    }
  }

  const filePath = path.join(process.cwd(), 'public', 'signin.html');
  if (!fs.existsSync(filePath)) return res.status(404).send('Signin page not found');

  // prevent caching so browser won't show a stale signin file
  res.set('Cache-Control', 'no-store');
  return res.sendFile(filePath);
});

/**
 * /signup: same behavior as signin - redirect if already authenticated,
 * otherwise serve signup page.
 */
app.get('/signup', (req, res) => {
  const token = req.cookies && req.cookies.token;
  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
      return res.redirect('/');
    } catch (err) {
      res.clearCookie('token', { path: '/' });
    }
  }
  const filePath = path.join(process.cwd(), 'public', 'signup.html');
  if (!fs.existsSync(filePath)) return res.status(404).send('Signup page not found');
  res.set('Cache-Control', 'no-store');
  return res.sendFile(filePath);
});

/**
 * Product detail page: only accessible when logged in
 */
// app.get('/product/:id', async (req, res) => {
//   const token = req.cookies && req.cookies.token;
//   if (!token) return res.redirect('/signin');

//   try {
//     jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     res.clearCookie('token', { path: '/' });
//     return res.redirect('/signin');
//   }

//   const id = req.params.id;
//   try {
//     const productRes = await axios.get(`https://fakestoreapi.com/products/${id}`);
//     const product = productRes.data;
//     const preloadedState = { product };
//     const appHtml = renderToString(React.createElement(App, { ssrState: preloadedState, page: 'product' }));
//     return res.send(renderPage(appHtml, preloadedState, 'product'));
//   } catch (e) {
//     console.error('Product render error', e);
//     return res.status(404).send('Not found');
//   }
// });



app.get('/product/:id', async (req, res) => {
  const token = req.cookies && req.cookies.token;
  if (!token) return res.redirect('/signin');

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (err) {
    res.clearCookie('token', { path: '/' });
    return res.redirect('/signin');
  }

  const id = req.params.id;

  try {
    // 🔹 First try real API
    const productRes = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const product = productRes.data;

    const preloadedState = { product };
    const appHtml = renderToString(
      React.createElement(App, { ssrState: preloadedState, page: 'product' })
    );
    return res.send(renderPage(appHtml, preloadedState, 'product'));
  } catch (err) {const mo
    console.error(
      `Failed to fetch product ${id} from FakeStoreAPI, trying mock data:`,
      err.toString()
    );

    // 🔹 Fallback: read from mock-data/products.json
    try {
      const mockPath = path.join(process.cwd(), 'mock-data', 'products.json');
      
      const raw = fs.readFileSync(mockPath, 'utf8');
      const mockProducts = JSON.parse(raw);

      const numericId = Number(id);
      const product = mockProducts.find((p) => p.id === numericId);

      if (!product) {
        return res.status(404).send('Not found');
      }

      const preloadedState = { product };
      const appHtml = renderToString(
        React.createElement(App, { ssrState: preloadedState, page: 'product' })
      );
      return res.send(renderPage(appHtml, preloadedState, 'product'));
    } catch (fallbackErr) {
      console.error('Product fallback error:', fallbackErr.toString());
      return res.status(404).send('Not found');
    }
  }
});




app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
