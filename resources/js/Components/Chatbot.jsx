import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false); // To toggle chat window visibility
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [sound, setSound] = useState(null); // For playing sounds

    const messageContainerRef = useRef(null); // Reference to the messages container

    const sendMessage = async () => {
        if (inputMessage.trim() === '') return;

        // Add user message to the chat
        setMessages([...messages, { text: inputMessage, sender: 'user' }]);

        try {
            // Send the message to the backend
            const response = await axios.post('/chat', { message: inputMessage });

            // Check if there's a sound to play
            if (response.data.playSound) {
                setSound(response.data.playSound); // Set the sound to be played
            }

            setMessages([...messages, { text: inputMessage, sender: 'user' }, { text: response.data.response, sender: 'bot' }]);
        } catch (error) {
            setMessages([...messages, { text: inputMessage, sender: 'user' }, { text: 'Er is een fout opgetreden.', sender: 'bot' }]);
        }

        // Reset the input field
        setInputMessage('');
    };

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]); // This runs every time `messages` changes

    // Play the sound when it's set
    useEffect(() => {
        if (sound) {
            const audio = new Audio(sound);
            audio.play();
        }
    }, [sound]);

    return (
        <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isOpen ? 'w-[20vw]' : 'w-[4vw]'}`}>
            {/* Chat Icon */}
            {!isOpen ? (
                <button
                    className="w-full h-[8vh] bg-white text-blue-500 border-2 border-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500 hover:text-white hover:border-transparent transition-all"
                    onClick={() => setIsOpen(true)}
                >
                    <span className="">
                        <img className="h-12 w-12" src="/Assets/Icons/Chatbot.svg" alt="Icon of a chatbot" />
                    </span> {/* You can replace this with any chat icon */}
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
                        style={{ minHeight: '40vh' , maxHeight: '40vh'}}
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
