import { useState, useEffect, useRef } from 'react';
import { useSubscription, useMutation, useApolloClient } from '@apollo/client';
import { GET_MESSAGES, SEND_USER_MESSAGE, TRIGGER_BOT_ACTION, UPDATE_CHAT_TITLE, GET_CHATS } from '../lib/graphql';
import { toast } from 'react-hot-toast';

const MessageView = ({ selectedChatId }) => {
  const [message, setMessage] = useState('');
  const apolloClient = useApolloClient();
  const messagesEndRef = useRef(null);

  const { data, loading, error } = useSubscription(GET_MESSAGES, {
    variables: { chat_id: selectedChatId },
    skip: !selectedChatId,
  });

  const [sendUserMessage] = useMutation(SEND_USER_MESSAGE);
  const [triggerBotAction] = useMutation(TRIGGER_BOT_ACTION);
  const [updateChatTitle] = useMutation(UPDATE_CHAT_TITLE, {
    refetchQueries: [{ query: GET_CHATS }]
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const currentMessage = message;
    setMessage('');

    try {
      // Optimistically update chat title if it's a new chat
      const chatCache = apolloClient.readQuery({ query: GET_CHATS });
      const currentChat = chatCache.chats.find(c => c.id === selectedChatId);
      if (currentChat && !currentChat.title) {
        updateChatTitle({ variables: { chat_id: selectedChatId, title: currentMessage } });
      }

      // Send user message and trigger bot action
      await sendUserMessage({ variables: { chat_id: selectedChatId, message: currentMessage } });
      await triggerBotAction({ variables: { chat_id: selectedChatId, message: currentMessage } });

    } catch (err) {
      toast.error(`Error sending message: ${err.message}`);
      setMessage(currentMessage); // Restore message on error
    }
  };

  if (!selectedChatId) {
    return <div className="flex-grow flex items-center justify-center text-gray-500">Select a chat to start messaging</div>;
  }

  if (loading) return <div className="flex-grow flex items-center justify-center">Loading messages...</div>;
  if (error) return <div className="flex-grow flex items-center justify-center text-red-500">Error loading messages.</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-6 overflow-y-auto">
        {data?.messages.map((msg) => (
          <div key={msg.id} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageView;
