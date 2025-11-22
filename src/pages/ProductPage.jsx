// // import React from 'react';

// // export default function ProductPage({ product }) {
// //   if (!product) return React.createElement('div', null, 'Product not found');
// //   return (
// //     React.createElement('main', { className: 'container' },
// //       React.createElement('div', { className: 'grid', style: { gridTemplateColumns: '1fr' } },
// //         React.createElement('div', { className: 'card' },
// //           React.createElement('div', { className: 'img-wrap' },
// //             React.createElement('img', { src: product.image, alt: product.title })
// //           ),
// //           React.createElement('h1', { className: 'title' }, product.title),
// //           React.createElement('p', null, product.description),
// //           React.createElement('p', { className: 'price' }, '$' + product.price)
// //         )
// //       )
// //     )
// //   );
// // }





// // src/pages/ProductPage.jsx
// import React from 'react';

// export default function ProductPage({ product }) {
//   if (!product) {
//     return React.createElement('main', { className: 'container' },
//       React.createElement('p', null, 'Product not found')
//     );
//   }

//   const rating = product.rating && product.rating.rate;
//   const count = product.rating && product.rating.count;

//   return (
//     React.createElement('main', { className: 'container' },
//       React.createElement('div', { className: 'detail-layout' },

//         // LEFT: image
//         React.createElement('div', { className: 'detail-card detail-image-card' },
//           React.createElement('a', { href: '/', className: 'back-link' }, 'Back to home'),
//           React.createElement('div', { className: 'detail-img-wrap' },
//             React.createElement('img', { src: product.image, alt: product.title })
//           )
//         ),

//         // RIGHT: info
//         React.createElement('div', { className: 'detail-card detail-info-card' },
//           React.createElement('p', { className: 'detail-category' }, product.category),
//           React.createElement('h1', { className: 'detail-title' }, product.title),
//           rating && React.createElement('p', { className: 'detail-rating' },
//             `⭐ ${rating} `,
//             count ? `(${count} reviews)` : ''
//           ),
//           React.createElement('p', { className: 'detail-price' }, '$' + product.price),
//           React.createElement('p', { className: 'detail-description' }, product.description),

//           React.createElement('div', { className: 'detail-actions' },
//             React.createElement('a', { href: '/', className: 'btn btn-outline' }, 'Back to home'),
//             React.createElement('button', {
//               type: 'button',
//               className: 'btn'
//             }, 'Add to cart')
//           )
//         )
//       )
//     )
//   );
// }







// src/pages/ProductPage.jsx
import React from 'react';

export default function ProductPage({ product }) {
  if (!product) {
    return React.createElement('main', { className: 'container' },
      React.createElement('p', null, 'Product not found')
    );
  }

  const rating = product.rating && product.rating.rate;
  const count = product.rating && product.rating.count;

  return (
    React.createElement('main', { className: 'container' },
      React.createElement('div', { className: 'detail-layout' },

        // LEFT: image ONLY (no back link here now)
        React.createElement('div', { className: 'detail-card detail-image-card' },
          React.createElement('div', { className: 'detail-img-wrap' },
            React.createElement('img', { src: product.image, alt: product.title })
          )
        ),

        // RIGHT: product info + Back button included here
        React.createElement('div', { className: 'detail-card detail-info-card' },
          React.createElement('p', { className: 'detail-category' }, product.category),
          React.createElement('h1', { className: 'detail-title' }, product.title),
          rating && React.createElement('p', { className: 'detail-rating' },
            `⭐ ${rating} `,
            count ? `(${count} reviews)` : ''
          ),
          React.createElement('p', { className: 'detail-price' }, '$' + product.price),
          React.createElement('p', { className: 'detail-description' }, product.description),

          React.createElement('div', { className: 'detail-actions' },
            React.createElement('a', {
              href: '/',
              className: 'btn btn-outline'
            }, 'Back to home'),

            React.createElement('button', {
              type: 'button',
              className: 'btn'
            }, 'Add to cart')
          )
        )
      )
    )
  );
}
