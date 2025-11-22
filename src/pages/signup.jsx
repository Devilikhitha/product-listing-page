// // import React from 'react';

// // export default function Signup() {
// //   const [email, setEmail] = React.useState('');
// //   const [password, setPassword] = React.useState('');
// //   const onSubmit = async (e) => {
// //     e.preventDefault();
// //     const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
// //     if (res.ok) {
// //       alert('Registered, please login');
// //       window.location.href = '/signin';
// //     } else {
// //       alert('Register failed');
// //     }
// //   };
// //   return (
// //     React.createElement('main', { className: 'container' },
// //       React.createElement('form', { onSubmit, className: 'card', style: { maxWidth: 420 } },
// //         React.createElement('h2', null, 'Sign up'),
// //         React.createElement('input', { placeholder: 'Email', value: email, onChange: e => setEmail(e.target.value) }),
// //         React.createElement('input', { placeholder: 'Password', type: 'password', value: password, onChange: e => setPassword(e.target.value) }),
// //         React.createElement('button', { className: 'btn', type: 'submit' }, 'Sign up')
// //       )
// //     )
// //   );
// // }







// import React from 'react';

// export default function Signup() {
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [confirm, setConfirm] = React.useState('');
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState('');
//   const [success, setSuccess] = React.useState('');

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (!email.trim() || !password) {
//       setError('Please enter email and password.');
//       return;
//     }
//     if (password.length < 6) {
//       setError('Password should be at least 6 characters.');
//       return;
//     }
//     if (password !== confirm) {
//       setError('Passwords do not match.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'same-origin',
//         body: JSON.stringify({ email: email.trim(), password })
//       });

//       if (res.ok) {
//         setSuccess('Registered successfully. Redirecting to sign in...');
//         // small delay so user sees message, then redirect
//         setTimeout(() => window.location.href = '/signin', 900);
//       } else {
//         const json = await res.json().catch(() => ({}));
//         setError(json.message || 'Registration failed. Try again.');
//         setLoading(false);
//       }
//     } catch (err) {
//       console.error('Register error', err);
//       setError('Network error. Please try again.');
//       setLoading(false);
//     }
//   };

//   return (
//     React.createElement('main', { className: 'container' },
//       React.createElement('form', { onSubmit, className: 'card', style: { maxWidth: 460 } },
//         React.createElement('h2', null, 'Create account'),
//         error && React.createElement('div', { style: { color: 'red', marginBottom: 8 } }, error),
//         success && React.createElement('div', { style: { color: 'green', marginBottom: 8 } }, success),
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
//           placeholder: 'Password (min 6 chars)',
//           value: password,
//           onChange: e => setPassword(e.target.value),
//           type: 'password',
//           autoComplete: 'new-password',
//           required: true,
//           style: { marginBottom: 8, padding: 8, borderRadius: 6, border: '1px solid #e6e9ef' }
//         }),
//         React.createElement('input', {
//           placeholder: 'Confirm password',
//           value: confirm,
//           onChange: e => setConfirm(e.target.value),
//           type: 'password',
//           autoComplete: 'new-password',
//           required: true,
//           style: { marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #e6e9ef' }
//         }),
//         React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
//           React.createElement('button', {
//             className: 'btn',
//             type: 'submit',
//             disabled: loading,
//             style: { opacity: loading ? 0.7 : 1 }
//           }, loading ? 'Creating...' : 'Create account'),
//           React.createElement('a', { href: '/signin', style: { marginLeft: 8 } }, 'Sign in')
//         )
//       )
//     )
//   );
// }














// ----------------the above code is good




import React from 'react';

export default function Signup() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password) {
      setError('Please enter email and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ email: email.trim(), password })
      });

      if (res.ok) {
        setSuccess('Account created successfully. Redirecting to sign in…');
        setTimeout(() => window.location.href = '/signin', 900);
      } else {
        const json = await res.json().catch(() => ({}));
        setError(json.message || 'Registration failed. Try again.');
      }
    } catch (err) {
      console.error('Register error', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    React.createElement('main', { className: 'container' },
      React.createElement('div', { className: 'auth-wrapper' },
        React.createElement('form', { onSubmit, className: 'auth-card' },
          React.createElement('h1', { className: 'auth-title' }, 'Create your account'),
          React.createElement('p', { className: 'auth-subtitle' },
            'Sign up with your email to start exploring products.'
          ),

          error && React.createElement('div', { className: 'auth-alert auth-alert-error' }, error),
          success && React.createElement('div', { className: 'auth-alert auth-alert-success' }, success),

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
              placeholder: 'At least 6 characters',
              value: password,
              onChange: e => setPassword(e.target.value),
              type: 'password',
              autoComplete: 'new-password',
              required: true
            })
          ),

          React.createElement('label', { className: 'auth-label' },
            'Confirm password',
            React.createElement('input', {
              className: 'auth-input',
              placeholder: 'Repeat password',
              value: confirm,
              onChange: e => setConfirm(e.target.value),
              type: 'password',
              autoComplete: 'new-password',
              required: true
            })
          ),

          React.createElement('div', { className: 'auth-actions' },
            React.createElement('button', {
              className: 'btn auth-btn',
              type: 'submit',
              disabled: loading
            }, loading ? 'Creating account…' : 'Create account')
          ),

          React.createElement('p', { className: 'auth-footer-text' },
            'Already have an account? ',
            React.createElement('a', { href: '/signin', className: 'auth-link' }, 'Sign in')
          )
        )
      )
    )
  );
}
