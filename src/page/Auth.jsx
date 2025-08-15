import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const Auth = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <Toaster />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-200">
        {showSignIn ? (
          <SignIn />
        ) : (
          <SignUp onSignInClick={() => setShowSignIn(true)} />
        )}

        <div className="mt-6 text-center">
          <button onClick={() => setShowSignIn(!showSignIn)} className="font-medium text-blue-600 hover:text-blue-500">
            {showSignIn ? 'Need to create an account? Sign Up' : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
