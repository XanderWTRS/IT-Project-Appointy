import React from 'react';

const SuccessMessage = ({ id, message }) => {
    return (
        <div
            id={id}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded shadow-lg flex items-center justify-center"
            style={{ display: 'none' }}
        >
            <p>{message}</p>
        </div>
    );
};

export default SuccessMessage;