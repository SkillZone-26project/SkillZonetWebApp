import React, { useState } from "react";
import { LuSearch, LuPhone, LuVideo, LuEllipsisVertical } from "react-icons/lu";

const UserMessages = () => {
  const [selectedChat, setSelectedChat] = useState(0);

  const conversations = [
    {
      name: "John Mensah",
      pic: "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770670893/ProfilePic_c3yslh.png",
      time: "2 mins",
      totatMessage: 2,
      peroid: "ago",
      online: true, 
      messages: [
        {
          text: "Hi, I need help with a leaking kitchen sink. Can you come today?",
          sender: "me",
          time: "1:10 PM",
        },
        {
          text: "Hello! Yes, I can help. I have availability at 2 PM today. Does that work for you?",
          sender: "them",
          time: "1:12 PM",
        },
        {
          text: "Perfect! See you at 2 PM. My address is Lekki Phase 1, near the traffic light.",
          sender: "me",
          time: "1:13 PM",
        },
        {
          text: "Great! I'll be there. I'm on my way now.",
          sender: "them",
          time: "1:14 PM",
        },
      ],
    },
    {
      name: "Michael Brown",
      pic: "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771441211/Primitive.img_3_qcvm8i.png",
      time: "1 hour",
      peroid: "ago",
      online: true,
      messages: [
        { text: "Thank you for the great review!", sender: "them", time: "11:00 AM" },
        { text: "Thank you, received.", sender: "me", time: "11:02 AM" },
      ],
    },
    {
      name: "Kwame Asante",
      pic: "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352175/Primitive.img_1_hblo6a.png",
      time: "3 hours",
      totatMessage: 3,
      peroid: "ago",
      online: false,
      messages: [
        { text: "I can start the carpentry work next Monday.", sender: "them", time: "9:00 AM" },
        { text: "Yes, I am available.", sender: "me", time: "9:05 AM" },
      ],
    },
    {
      name: "Kwame Asante",
      pic: "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771519219/Primitive.img_4_cq5klr.png",
      time: "Yesterday",
      peroid: "ago",
      online: false,
      messages: [
        { text: "Would you like to see some color samples?", sender: "them", time: "4:00 PM" },
        { text: "Yes, I am available.", sender: "me", time: "4:10 PM" },
      ],
    },
  ];

  const activeChat = conversations[selectedChat];

  return (
    <div className="h-[calc(100vh-85px)] flex gap-[20px] bg-white mt-[85px] px-4">

      {/* LEFT SIDE */}
      <div className="border w-[382px] rounded-[8px]">
        <div className="flex flex-col p-[16px]">
          <p className="mb-[12px] font-semibold text-[18px]">Message</p>

          <div className="p-4 w-[350px] h-[36px] gap-[10px] bg-[#F3F3F5] flex items-center rounded-[8px] text-[14px]">
            <LuSearch />
            <input
              type="text"
              placeholder="Search messages..."
              className="outline-none bg-transparent w-full"
            />
          </div>
        </div>

        <div className="border-t mt-[15px] p-4 space-y-2">
          {conversations.map((chat, index) => (
            <div
              key={index}
              onClick={() => setSelectedChat(index)}
              className={`p-4 cursor-pointer ${
                selectedChat === index
                  ? "bg-gray-100 rounded-[10px]"
                  : "hover:bg-gray-50 rounded-[10px]"
              }`}
            >
              <div className="flex gap-[10px] items-center">

                <div className="relative">
                  <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                    <img src={chat.pic} alt="" className="w-full h-full object-cover" />
                  </div>

                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00C950] border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-[16px]">{chat.name}</p>

                    <div className="flex gap-[12px] items-center">
                      <p className="text-[12px] text-gray-400">
                        {chat.time} {chat.peroid}
                      </p>

                      {chat.totatMessage > 0 && (
                        <p className="bg-black w-[22px] h-[22px] flex items-center justify-center text-white text-[12px] rounded-[6px]">
                          {chat.totatMessage}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-[12px] text-gray-700 truncate mt-[6px]">
                    {chat.messages.length > 0
                      ? chat.messages[chat.messages.length - 1].text
                      : "No messages yet"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col border rounded-[10px]">

        {/* Header */}
        <div className="h-[70px] border-b flex items-center justify-between px-6">
          <div className="flex gap-[10px] items-center">
            <div className="relative">
              <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                <img src={activeChat.pic} alt="" className="w-full h-full object-cover" />
              </div>

              {activeChat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00C950] border-2 border-white rounded-full"></div>
              )}
            </div>

            <div>
              <p className="font-semibold">{activeChat.name}</p>
              {activeChat.online && (
                <p className="text-sm text-green-500">Online</p>
              )}
            </div>
          </div>

          <div className="flex gap-[30px] text-lg cursor-pointer">
            <LuPhone />
            <LuVideo />
            <LuEllipsisVertical />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50">
          {activeChat.messages.length > 0 ? (
            activeChat.messages.map((msg, index) => (
              <div key={index}>
                {msg.sender === "them" ? (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        src={activeChat.pic}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <div className="bg-white p-3 rounded-lg max-w-[400px] text-sm shadow-sm">
                        {msg.text}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-end">
                    <div className="bg-black text-white p-3 rounded-lg max-w-[400px] text-sm">
                      {msg.text}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {msg.time}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-sm">
              Start a conversation...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg outline-none text-sm"
          />
          <button className="px-5 py-2 bg-black text-white rounded-lg text-sm hover:opacity-90">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMessages;