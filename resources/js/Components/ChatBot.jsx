import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await axios.post('/api/chatbot', { question: input });
            const botMessage = { sender: 'bot', text: response.data.answer };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            const botMessage = { sender: 'bot', text: 'Sorry, something went wrong.' };
            setMessages((prev) => [...prev, botMessage]);
        }

        setInput('');
    };

    return (
        <div className="fixed bottom-5 right-5 w-80 bg-white shadow-lg rounded-lg p-4">
            <div className="h-64 overflow-y-auto mb-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 rounded ${
                            msg.sender === 'bot' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me a question..."
                    className="flex-grow p-2 border rounded-l"
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chatbot;
