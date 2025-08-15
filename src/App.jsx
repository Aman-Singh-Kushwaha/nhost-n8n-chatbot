import { useAuthenticationStatus, useSignOut } from '@nhost/react';
import Auth from './page/Auth';

const App = () => {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();
  const { signOut } = useSignOut();
  console.log('Authentication Status:', { isLoading, isAuthenticated });
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="container mx-auto">
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-2xl font-bold">Nhost Chatbot</h1>
        <button onClick={signOut} className="bg-red-500 text-white py-2 px-4 rounded">
          Sign Out
        </button>
      </header>
      {/* Chat UI will go here */}
      <div className="mt-4">
        <p>Welcome! The chat interface will be built in the next step.</p>
      </div>
    </div>
  );
};

export default App;
