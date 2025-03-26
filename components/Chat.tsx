"use client";

import { useChat } from "@ai-sdk/react";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { Paperclip, ArrowUpRight } from "lucide-react"; // Import icons

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system" | "data";
}

const quickReplies = ["How do tax brackets work?", "Tell me about deductions"];

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [messageText, setMessageText] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleMessageSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
    setMessageText("");
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    setMessageText(e.target.value);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploadedFile(event.target.files[0]);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleInputChange({ target: { value: reply } } as ChangeEvent<HTMLInputElement>);
    handleSubmit({ preventDefault: () => {} } as FormEvent<HTMLFormElement>);
  };

  return (
    <div className="px-6 pb-4 shadow-lg max-w-2xl mx-auto"> {/* Side padding */}
      <h1 className="text-2xl font-bold mb-4 text-center">TaxGPT</h1>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto mb-4 p-3 border rounded bg-gray-50">
        {messages.map((message: Message) => (
          <div
            key={message.id}
            className={`mb-3 p-2 rounded max-w-[80%] ${
              message.role === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100 mr-auto"
            }`}
          >
            <div className="font-medium text-sm text-gray-600">
              {message.role === "user" ? "You" : "Assistant"}
            </div>
            <div className="text-gray-800">{message.content}</div>
          </div>
        ))}
      </div>

      {/* Quick Reply Buttons */}
      <div className="mb-4 flex gap-2">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            className="p-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300 transition"
            onClick={() => handleQuickReply(reply)}
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Chat Input with File Upload */}
      <form onSubmit={handleMessageSubmit} className="flex items-center gap-2 border rounded p-2 bg-white">
        {/* File Upload Icon */}
        <label htmlFor="file-upload" className="cursor-pointer">
          <Paperclip className="text-gray-500 hover:text-gray-700 transition" />
        </label>
        <input
          type="file"
          id="file-upload"
          onChange={handleFileUpload}
          className="hidden"
        />
        {uploadedFile && <p className="text-sm text-gray-500 truncate max-w-[150px]">{uploadedFile.name}</p>}

        {/* Chat Input */}
        <input
          type="text"
          value={messageText}
          onChange={handleTextChange}
          placeholder="Ask me a tax question..."
          className="flex-1 p-2 border-none focus:outline-none"
        />

        {/* Send Button (Arrow) */}
        <button type="submit" className="text-blue-600 hover:text-blue-800 transition">
          <ArrowUpRight />
        </button>
      </form>
    </div>
  );
};

export default Chat;
