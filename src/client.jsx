import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App.jsx';

const preloaded = window.__PRELOADED_STATE__ || {};
hydrateRoot(document.getElementById('root'), React.createElement(App, { ssrState: preloaded, page: window.__PAGE__ || 'home' }));
