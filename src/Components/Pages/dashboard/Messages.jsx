import React, { useState } from "react";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(0);

  const conversations = [
    {
      name: "Sarah Johnson",
      messages: [
        { text: "Hello, are you available tomorrow?", sender: "them" },
        { text: "Yes, I am available.", sender: "me" },
      ],
    },
    {
      name: "Michael Brown",
      messages: [
        { text: "I have sent the payment.", sender: "them" },
        { text: "Thank you, received.", sender: "me" },
      ],
    },
    {
      name: "David Wilson",
      messages: [],
    },
  ];

  const activeChat = conversations[selectedChat];

  return (
    <div className="h-[calc(100vh-85px)] flex bg-white mt-[85px]">
      
      {/* LEFT SIDE – Conversations */}
      <div className="w-[320px] border-r flex flex-col">
        
        {/* 🔍 Search Box Added Here */}
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full px-3 py-2 border rounded-lg text-sm outline-none"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat, index) => (
            <div
              key={index}
              onClick={() => setSelectedChat(index)}
              className={`p-4 border-b cursor-pointer ${
                selectedChat === index ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              <p className="font-medium text-sm">{chat.name}</p>
              <p className="text-xs text-gray-500 truncate">
                {chat.messages.length > 0
                  ? chat.messages[0].text
                  : "No messages yet"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE – Chat Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Chat Header */}
        <div className="h-[70px] border-b flex items-center px-6">
          <p className="font-semibold">{activeChat.name}</p>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
          {activeChat.messages.length > 0 ? (
            activeChat.messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[60%] p-3 rounded-lg text-sm ${
                  msg.sender === "me"
                    ? "ml-auto bg-black text-white"
                    : "bg-white"
                }`}
              >
                {msg.text}
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-sm">
              Start a conversation...
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t flex gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg outline-none text-sm"
          />
          <button className="px-5 py-2 bg-black text-white rounded-lg text-sm">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
