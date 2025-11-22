// import React from 'react';
// import ProductCard from '../components/ProductCard.jsx';
// import Filters from '../components/Filters.jsx';

// export default function Home({ products = [], categories = [] }) {
//   const [selected, setSelected] = React.useState('all');
//   const [search, setSearch] = React.useState('');

//   const filtered = (products || []).filter(p => {
//     return (selected === 'all' || p.category === selected) &&
//            (p.title.toLowerCase().includes(search.toLowerCase()));
//   });

//   return (
//     React.createElement('main', { className: 'container' },
//       React.createElement('div', { className: 'controls' },
//         React.createElement(Filters, { categories: categories, selected: selected, onChange: setSelected }),
//         React.createElement('div', { style: { flex: 1 } },
//           React.createElement('input', { className: 'search', placeholder: 'Search products...', value: search, onChange: e => setSearch(e.target.value), style: { width: '100%' } })
//         )
//       ),
//       React.createElement('div', { className: 'grid' },
//         filtered.map(p => React.createElement(ProductCard, { key: p.id, product: p }))
//       )
//     )
//   );
// }





// src/pages/Home.jsx
import React from 'react';
import ProductCard from '../components/ProductCard.jsx';
import Filters from '../components/Filters.jsx';

export default function Home({ products = [], categories = [] }) {
  const [selected, setSelected] = React.useState('all');
  const [search, setSearch] = React.useState('');

  const filtered = (products || []).filter(p =>
    (selected === 'all' || p.category === selected) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    React.createElement('main', { className: 'container' },
      React.createElement('div', { className: 'controls-wrapper' },
        React.createElement('div', { className: 'controls' },
          React.createElement(Filters, {
            categories,
            selected,
            onChange: setSelected
          }),
          React.createElement('div', { className: 'search-card' },
            React.createElement('input', {
              className: 'search-input',
              placeholder: 'Search products...',
              value: search,
              onChange: e => setSearch(e.target.value)
            })
          )
        )
      ),
      React.createElement('div', { className: 'grid' },
        filtered.map(p =>
          React.createElement(ProductCard, { key: p.id, product: p })
        )
      )
    )
  );
}
