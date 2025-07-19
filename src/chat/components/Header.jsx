import { MdWifiOff } from 'react-icons/md'
const ChatHeader = ({ name, status }) => {
  const persian_status = { "matched": "جفت شده", "disconnected": "اتصال قطع شد" }
  return (<div className="flex bg-gray-100 p-4 border-b border-gray-200 rounded-t-lg" dir="rtl">
    <img
      src="/img/female_profile.jpg"
      alt="پروفایل"
      width="50"
      height="50"
      className="ml-3 self-start"
    />
    <div className="flex flex-col items-start w-full">
      <div className="flex justify-between w-full">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <MdWifiOff size={30} color="red" />

      </div>
      <p className="text-sm text-green-500 mt-1">{persian_status[status]}</p>
    </div>
  </div>);
}

export default ChatHeader;