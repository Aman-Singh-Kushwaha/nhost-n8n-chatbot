import { useQuery, useMutation } from '@apollo/client';
import { GET_CHATS, CREATE_CHAT } from '../lib/graphql';
import { toast } from 'react-hot-toast';

const ChatList = ({ setSelectedChatId }) => {
  const { loading, error, data } = useQuery(GET_CHATS);
  const [createChat, { loading: creatingChat }] = useMutation(CREATE_CHAT, {
    onCompleted: (data) => {
      setSelectedChatId(data.insert_chats_one.id);
    },
    refetchQueries: [{ query: GET_CHATS }],
    onError: (error) => {
      toast.error(`Failed to create chat: ${error.message}`);
    }
  });

  if (loading) return <p className="p-4">Loading chats...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading chats. ${error.message}</p>;

  return (
    <div>
      <div className="p-4 border-b">
        <button 
          onClick={() => createChat()} 
          disabled={creatingChat}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {creatingChat ? 'Creating...' : '+ New Chat'}
        </button>
      </div>
      <div className="p-2">
        {data.chats.map((chat) => (
          <div 
            key={chat.id} 
            onClick={() => setSelectedChatId(chat.id)}
            className="p-3 mb-2 rounded-md cursor-pointer hover:bg-gray-200"
          >
            <p className="font-semibold truncate">{chat.title || 'New Chat'}</p>
            <p className="text-sm text-gray-500">{new Date(chat.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
