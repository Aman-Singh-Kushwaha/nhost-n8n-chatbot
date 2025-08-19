import { useAuthenticationStatus, useSignOut } from '@nhost/react';
import Auth from './page/Auth';
import ChatLayout from './page/ChatLayout';

const App = () => {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();
  const { signOut } = useSignOut();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  console.log('Authentication Status:', isAuthenticated);
  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div>
      <header className="flex justify-between items-center p-4 h-[65px] bg-gray-100 border-b">
        <h1 className="text-2xl font-bold">Nhost Chatbot</h1>
        <button onClick={signOut} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Sign Out
        </button>
      </header>
      <main>
        <ChatLayout />
      </main>
    </div>
  );
};

export default App;
