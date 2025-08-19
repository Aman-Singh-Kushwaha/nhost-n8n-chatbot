import { useState } from 'react';
import { useSignUpEmailPassword,useSendVerificationEmail } from '@nhost/react';
import { toast } from 'react-hot-toast';
import { MailCheck } from 'lucide-react';

const SignUp = ({ onSignInClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const { signUpEmailPassword, isLoading } = useSignUpEmailPassword();
  const { sendEmail, isSent} = useSendVerificationEmail();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { error, needsEmailVerification } = await signUpEmailPassword(email, password);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (needsEmailVerification) {
      setShowVerificationMessage(true);
    }
  };

  const handleSendVerification = async (e)=>{
    e.preventDefault();
    const { error, isSent } = await sendEmail(email);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (isSent) {
      toast.success('Verification email sent. Please check your inbox & SPAM.');
    }
  }

  if (showVerificationMessage) {
    return (
      <div className="text-center">
        <MailCheck className="mx-auto h-12 w-12 text-green-500" />
        <h2 className="mt-4 text-2xl font-bold">Please verify your email</h2>
        <p className="mt-2 text-sm text-gray-600">
          We've sent a verification link to <strong>{email}</strong>.
          Please check your inbox and spam folder.
        </p>
        <button onClick={handleSendVerification} className="mt-4 text-sm text-blue-600">
          Resend Verification Email
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Create Account</h2>
      </div>
      <form onSubmit={handleSignUp} className="space-y-4">
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
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
