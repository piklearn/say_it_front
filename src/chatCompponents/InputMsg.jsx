const InputMsg = ({setNewMessage
,newMessage, handleSendMessage}) => {
  
  return ( 
  <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg">
        <form onSubmit={handleSendMessage} className="flex space-x-2 space-x-reverse">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            className="flex-grow w-full px-4 py-2 text-right border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            dir="rtl"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300"
            disabled={!newMessage.trim()}
          >
            ارسال
          </button>
        </form>
      </div> 
      );
}
 
export default InputMsg;