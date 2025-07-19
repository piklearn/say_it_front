const InputMsg = ({ handleSendMessage, setMessage, message }) => {

    return (
        <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg flex space-x-2 space-x-reverse">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="پیام خود را بنویسید..."
                className="flex-grow w-full px-4 py-2 text-right border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-amber-900"
                dir="rtl"
            />
            <button
                className="relative text-white px-6 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300 active:animate-click-effect active:after:content-[''] active:after:absolute active:after:inset-0 active:after:bg-white active:after:opacity-30 active:after:rounded-full active:after:animate-ping transition-all duration-100"
                disabled={!message.trim()}
                onClick={handleSendMessage}
            >
                <svg className="w-6 h-6 text-white transform active:translate-y-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
                    <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
                </svg>
            </button>
        </div>
    );
}

export default InputMsg;