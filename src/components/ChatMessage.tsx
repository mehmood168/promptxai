import React from 'react';
import { User, Bot } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`rounded-full p-2 ${message.isUser ? 'bg-blue-600' : 'bg-gray-300'}`}>
          {message.isUser ? <User size={24} color="white" /> : <Bot size={24} color="black" />}
        </div>
        <div className={`max-w-xs mx-2 p-3 rounded-lg ${message.isUser ? 'bg-blue-100' : 'bg-white'}`}>
          <p className="text-sm">{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;