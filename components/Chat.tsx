"use client";

import { useChat } from "@ai-sdk/react";
import { useState, type FormEvent, type ChangeEvent } from "react";

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
    <div className="max-w-2xl mx-auto p-4 border rounded-lg shadow-lg bg-white">
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

      {/* File Upload */}
      <input type="file" onChange={handleFileUpload} className="mb-2" />
      {uploadedFile && <p className="text-sm text-gray-500">Uploaded: {uploadedFile.name}</p>}

      {/* Chat Input */}
      <form onSubmit={handleMessageSubmit} className="flex gap-2">
        <input
          type="text"
          value={messageText}
          onChange={handleTextChange}
          placeholder="Ask a tax question..."
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;