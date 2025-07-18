const Message = ({ message }) => {
    return (<div
        key={message.id}
        className={`flex relative ${message.from === 'me' ? 'justify-end' : 'justify-start'}`}
    >
        <div
            className={`max-w-xs lg:max-w-md px-4 p-2 rounded-lg shadow ${message.from === 'me'
                ? 'bg-blue-500 text-white rounded-br-none'
                : 'bg-white text-gray-800 rounded-bl-none'
                }`}
        >
            <p>{message.text}</p>
        </div>
    </div>);
}

export default Message;