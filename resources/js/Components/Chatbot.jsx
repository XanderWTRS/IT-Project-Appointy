import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [sound, setSound] = useState(null);

    const messageContainerRef = useRef(null);

    const sendMessage = async () => {
        if (inputMessage.trim() === '') return;

        setMessages([...messages, { text: inputMessage, sender: 'user' }]);

        try {
            const response = await axios.post('/chat', { message: inputMessage });

            if (response.data.playSound) {
                setSound(response.data.playSound);
            }

            setMessages([...messages, { text: inputMessage, sender: 'user' }, { text: response.data.response, sender: 'bot' }]);
        } catch (error) {
            setMessages([...messages, { text: inputMessage, sender: 'user' }, { text: 'Er is een fout opgetreden.', sender: 'bot' }]);
        }

        setInputMessage('');
    };

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (sound) {
            const audio = new Audio(sound);
            audio.play();
        }
    }, [sound]);

    return (
        <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isOpen ? 'w-[60vw] lg:w-[50vw]' : 'w-[20vw] md:w-[4vw]'}`}>
            {/* Chat Icon */}
            {!isOpen ? (
                <button
                    className="w-full h-[8vh] sm:h-[10vh] bg-white text-blue-500 border-2 hover:border-blue-500 rounded-full flex items-center justify-center shadow-lg hover:text-white hover:border-transparent transition-all"
                    onClick={() => setIsOpen(true)}
                >
                    <img className="h-12 w-12 sm:h-16 sm:w-16" src="/Assets/Icons/Chatbot.svg" alt="Icon of a chatbot" />
                </button>
            ) : (
                <div className="w-full h-full bg-white rounded-lg shadow-lg flex flex-col">
                    <div className="flex justify-between items-center p-3 bg-blue-500 text-white">
                        <span className="font-bold">Chatbot</span>
                        <button
                            className="text-white text-xl"
                            onClick={() => setIsOpen(false)}
                        >
                            ✖️
                        </button>
                    </div>

                    {/* Messages Container with Scrollable Content */}
                    <div
                        ref={messageContainerRef}
                        className="flex-1 overflow-y-auto p-3"
                        style={{ minHeight: '30vh', maxHeight: '40vh' }}
                    >
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-3 p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black'}`}
                            >
                                <p>{msg.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Message Input */}
                    <div className="flex p-3 border-t">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Typ je vraag..."
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={sendMessage}
                            className="p-2 ml-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Verstuur
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
