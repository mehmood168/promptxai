import React, { useState } from 'react';
import { Send } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';

interface Message {
  text: string;
  isUser: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const simulateApiResponse = (prompt: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`This is a simulated response to: "${prompt}"`);
      }, 1000); // Simulate a 1-second delay
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = { text: inputValue, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate API call
      const response = await simulateApiResponse(inputValue);
      const apiMessage: Message = { text: response, isUser: false };
      setMessages((prevMessages) => [...prevMessages, apiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = { text: 'Sorry, an error occurred. Please try again.', isUser: false };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Simple Chat Interface</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;