// // import React from 'react';

// // export default function Signin() {
// //   const [email, setEmail] = React.useState('');
// //   const [password, setPassword] = React.useState('');
// //   const onSubmit = async (e) => {
// //     e.preventDefault();
// //     const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
// //     if (res.ok) {
// //       window.location.href = '/';
// //     } else {
// //       alert('Login failed');
// //     }
// //   };
// //   return (
// //     React.createElement('main', { className: 'container' },
// //       React.createElement('form', { onSubmit, className: 'card', style: { maxWidth: 420 } },
// //         React.createElement('h2', null, 'Sign in'),
// //         React.createElement('input', { placeholder: 'Email', value: email, onChange: e => setEmail(e.target.value) }),
// //         React.createElement('input', { placeholder: 'Password', type: 'password', value: password, onChange: e => setPassword(e.target.value) }),
// //         React.createElement('button', { className: 'btn', type: 'submit' }, 'Sign in')
// //       )
// //     )
// //   );
// // }




// import React from 'react';

// export default function Signin() {
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState('');

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!email.trim() || !password) {
//       setError('Please enter both email and password.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'same-origin',
//         body: JSON.stringify({ email: email.trim(), password })
//       });

//       if (res.ok) {
       
//         // replace current history entry and navigate to home (no back to signin)
//         window.location.replace('/');
//         return;
//       } else {
//         const json = await res.json().catch(() => ({}));
//         setError(json.message || 'Login failed. Please check your credentials.');
//         setLoading(false);
//       }
//     } catch (err) {
//       console.error('Login error', err);
//       setError('Network error. Please try again.');
//       setLoading(false);
//     }
//   };

//   return (
//     React.createElement('main', { className: 'container' },
//       React.createElement('form', { onSubmit, className: 'card', style: { maxWidth: 420 } },
//         React.createElement('h2', null, 'Sign in'),
//         error && React.createElement('div', { style: { color: 'red', marginBottom: 8 } }, error),
//         React.createElement('input', {
//           placeholder: 'Email',
//           value: email,
//           onChange: e => setEmail(e.target.value),
//           type: 'email',
//           autoComplete: 'email',
//           required: true,
//           style: { marginBottom: 8, padding: 8, borderRadius: 6, border: '1px solid #e6e9ef' }
//         }),
//         React.createElement('input', {
//           placeholder: 'Password',
//           type: 'password',
//           value: password,
//           onChange: e => setPassword(e.target.value),
//           autoComplete: 'current-password',
//           required: true,
//           style: { marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #e6e9ef' }
//         }),
//         React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
//           React.createElement('button', {
//             className: 'btn',
//             type: 'submit',
//             disabled: loading,
//             style: { opacity: loading ? 0.7 : 1 }
//           }, loading ? 'Signing in...' : 'Sign in'),
//           React.createElement('a', { href: '/signup', style: { marginLeft: 8 } }, 'Create account')
//         )
//       )
//     )
//   );
// }







// --------------thee above code is working just to look good css ----next modified code----


import React from 'react';

export default function Signin() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ email: email.trim(), password })
      });

      if (res.ok) {
        window.location.replace('/');
        return;
      } else {
        const json = await res.json().catch(() => ({}));
        setError(json.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    React.createElement('main', { className: 'container' },
      React.createElement('div', { className: 'auth-wrapper' },
        React.createElement('form', { onSubmit, className: 'auth-card' },
          React.createElement('h1', { className: 'auth-title' }, 'Welcome back'),
          React.createElement('p', { className: 'auth-subtitle' },
            'Sign in to continue to your product dashboard.'
          ),

          error && React.createElement('div', { className: 'auth-alert auth-alert-error' }, error),

          React.createElement('label', { className: 'auth-label' },
            'Email',
            React.createElement('input', {
              className: 'auth-input',
              placeholder: 'you@example.com',
              value: email,
              onChange: e => setEmail(e.target.value),
              type: 'email',
              autoComplete: 'email',
              required: true
            })
          ),

          React.createElement('label', { className: 'auth-label' },
            'Password',
            React.createElement('input', {
              className: 'auth-input',
              placeholder: '••••••••',
              type: 'password',
              value: password,
              onChange: e => setPassword(e.target.value),
              autoComplete: 'current-password',
              required: true
            })
          ),

          React.createElement('div', { className: 'auth-actions' },
            React.createElement('button', {
              className: 'btn auth-btn',
              type: 'submit',
              disabled: loading
            }, loading ? 'Signing in...' : 'Sign in')
          ),

          React.createElement('p', { className: 'auth-footer-text' },
            "Don't have an account? ",
            React.createElement('a', { href: '/signup', className: 'auth-link' }, 'Sign up')
          )
        )
      )
    )
  );
}
