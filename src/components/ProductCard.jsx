import React from 'react';

export default function ProductCard({ product }) {
  return (
    React.createElement('article', { className: 'card' },
      React.createElement('div', { className: 'img-wrap' },
        React.createElement('img', { src: product.image, alt: product.title })
      ),
      React.createElement('h3', { className: 'title' }, product.title),
      React.createElement('p', { className: 'price' }, '$' + product.price),
      React.createElement('a', { className: 'btn', href: '/product/' + product.id }, 'View')
    )
  );
}
