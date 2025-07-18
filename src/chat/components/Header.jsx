const ChatHeader = ({name, status}) => {
    return ( <div className="bg-gray-100 p-4 border-b border-gray-200 rounded-t-lg">
        <h2 className="text-xl font-semibold text-gray-800 text-right">{name}</h2>
        <p className="text-sm text-green-500 text-right">{status}</p>
      </div> );
}
 
export default ChatHeader;