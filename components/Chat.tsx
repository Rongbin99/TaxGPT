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
    <div className="px-4 pb-2 mx-6"> {/* Reduced side padding */}
      <h1 className="text-2xl font-bold mb-4 text-center">TaxGPT</h1>

      {/* Chat Messages */}
      <div className="h-[24rem] overflow-y-auto mb-4 p-3 border rounded bg-gray-50">
        {messages.map((message: Message) => (
          <div
            key={message.id}
            className={`mb-3 p-2 rounded w-fit min-w-[20%] ${
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
            className="p-2 bg-gray-200 rounded-lg text-sm focus-within:shadow-[0_0_10px_rgba(0,123,255,0.5)] transition-shadow"
            onClick={() => handleQuickReply(reply)}
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Chat Input with File Upload */}
      <form
        onSubmit={handleMessageSubmit}
        className="flex items-center gap-2 border rounded p-2 bg-white focus-within:shadow-[0_0_10px_rgba(0,123,255,0.5)] transition-shadow"
      >
        {/* File Upload Icon with Circular Background */}
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
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
          className="flex-1 p-2 border-none focus:outline-none focus:ring-0"
        />

        {/* Send Button (Arrow) with Circular Background */}
        <button
          type="submit"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 transition"
        >
          <ArrowUpRight className="text-blue-600 hover:text-blue-800 transition" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
