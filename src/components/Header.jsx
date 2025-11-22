// import React from 'react';

// export default function Header({ user }) {
//   return (
//     React.createElement('header', { className: 'header' },
//       React.createElement('div', { className: 'container', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
//         React.createElement('div', { className: 'brand' }, React.createElement('a', { href: '/' }, 'MyStore')),
//         React.createElement('nav', null,
//           user ? React.createElement('span', { className: 'small' }, 'Hi, ' + user.email + ' — ', React.createElement('a', { href: '/api/auth/logout' }, 'Logout')) :
//           React.createElement('span', { className: 'small' }, React.createElement('a', { href: '/signin' }, 'Sign in'), ' · ', React.createElement('a', { href: '/signup' }, 'Sign up'))
//         )
//       )
//     )
//   );
// }





// src/components/Header.jsx
import React from 'react';

export default function Header({ user }) {
  return (
    React.createElement('header', { className: 'header' },
      React.createElement('div', { className: 'container header-inner' },
        React.createElement('div', { className: 'brand' },
          React.createElement('a', { href: '/' }, 'MyStore'),
          React.createElement('span', { className: 'dot' }, '.')
        ),
        React.createElement('nav', null,
          user
            ? React.createElement('span', { className: 'user-text' },
                'Hi, ', user.email, ' — ',
                React.createElement('a', {
                  href: '#',
                  onClick: async (e) => {
                    e.preventDefault();
                    try {
                      await fetch('/api/auth/logout', {
                        method: 'POST',
                        credentials: 'same-origin'
                      });
                    } catch (err) {
                      console.error('Logout failed', err);
                    } finally {
                      window.location.replace('/signin');
                    }
                  }
                }, 'Logout')
              )
            : React.createElement(React.Fragment, null,
                React.createElement('a', { href: '/signin' }, 'Sign in'),
                React.createElement('a', { href: '/signup' }, 'Sign up')
              )
        )
      )
    )
  );
}
