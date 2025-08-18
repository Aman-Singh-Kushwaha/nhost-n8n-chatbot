import { useState } from 'react';
import ChatList from './ChatList';
import MessageView from './MessageView';

const ChatLayout = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  return (
    <div className="flex h-[calc(100vh-65px)]">
      <div className="w-1/4 border-r bg-gray-50 overflow-y-auto">
        <ChatList setSelectedChatId={setSelectedChatId} />
      </div>
      <div className="w-3/4 flex flex-col">
        <MessageView selectedChatId={selectedChatId} />
      </div>
    </div>
  );
};

export default ChatLayout;
