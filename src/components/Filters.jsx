// import React from 'react';

// export default function Filters({ categories = [], selected, onChange }) {
//   return (
//     React.createElement('aside', { className: 'filters' },
//       React.createElement('div', null,
//         React.createElement('h4', null, 'Categories'),
//         React.createElement('ul', null,
//           React.createElement('li', null,
//             React.createElement('button', { onClick: () => onChange('all'), className: 'small' }, 'All')
//           ),
//           (categories || []).map(c => React.createElement('li', { key: c },
//             React.createElement('button', { onClick: () => onChange(c), className: 'small' }, c)
//           ))
//         )
//       )
//     )
//   );
// }





// src/components/Filters.jsx
import React from 'react';

export default function Filters({ categories = [], selected, onChange }) {
  const renderPill = (label, value) =>
    React.createElement('button', {
      type: 'button',
      className: 'filter-pill' + (selected === value ? ' active' : ''),
      onClick: () => onChange(value)
    }, label);

  return (
    React.createElement('aside', { className: 'filters' },
      React.createElement('h4', null, 'Categories'),
      React.createElement('ul', null,
        React.createElement('li', null, renderPill('All', 'all')),
        (categories || []).map(c =>
          React.createElement('li', { key: c }, renderPill(c, c))
        )
      )
    )
  );
}
