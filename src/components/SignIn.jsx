import { useState } from 'react';
import { useSignInEmailPassword } from '@nhost/react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInEmailPassword, isLoading, isError, error } = useSignInEmailPassword();

  const handleSignIn = async (e) => {
    e.preventDefault();
    await signInEmailPassword(email, password);
  };

  const isEmailNotVerified = isError && error?.substatus === 'email-not-verified';

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Sign In</h2>
      </div>
      <form onSubmit={handleSignIn} className="space-y-4">
        {isError && !isEmailNotVerified && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error?.message}
          </div>
        )}
        {isEmailNotVerified && (
            <div className="p-3 bg-yellow-100 text-yellow-800 rounded-md text-sm">
                Please check your inbox and verify your email to sign in.
            </div>
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email address"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
