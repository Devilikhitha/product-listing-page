import React from 'react';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import ProductPage from './pages/ProductPage.jsx';
import Signin from './pages/signin.jsx';
import Signup from './pages/signup.jsx';

export default function App({ ssrState = {}, page = 'home' }) {
  const initial = (typeof window !== 'undefined') ? (window.__PRELOADED_STATE__ || ssrState) : ssrState;
  const currentPage = page;
  return (
    React.createElement(React.Fragment, null,
      React.createElement(Header, { user: initial.user }),
      currentPage === 'product' ? React.createElement(ProductPage, { product: initial.product }) :
      currentPage === 'signin' ? React.createElement(Signin, null) :
      currentPage === 'signup' ? React.createElement(Signup, null) :
      React.createElement(Home, { products: initial.products, categories: initial.categories })
    )
  );
}
