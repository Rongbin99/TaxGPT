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
  const { messages, input, handleInputChange, handleSubmit, append } = useChat();
  const [messageText, setMessageText] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!messageText.trim()) return;
  
    // Append user message to chat
    await append({ role: "user", content: messageText });
  
    // Call the API with the user input as part of the messages array
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: "user", content: messageText }] }), // Send the user input as part of messages
      });
  
      const data = await response.json();
  
      // Append the assistant's response to the chat
      if (data && data.text) {
        await append({ role: "assistant", content: data.text });
      } else {
        await append({ role: "assistant", content: "Sorry, something went wrong." });
      }
  
    } catch (error) {
      console.error("Error submitting message:", error);
      await append({ role: "assistant", content: "There was an error processing your request." });
    }
  
    // Simulate AI file analysis if a file is uploaded
    if (uploadedFile) {
      const fileName = uploadedFile.name;
      await append({ role: "assistant", content: `Analyzing "${fileName}"... Please wait.` });
  
      // Simulate analysis result after a short delay
      setTimeout(async () => {
        await append({
          role: "assistant",
          content: `Analysis of "${fileName}" complete. Here's a brief summary: ...`,
        });
      }, 2000);
    }
  
    setMessageText(""); // Clear the input field
  };

  // Handle Text Change
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    setMessageText(e.target.value);
  };

  // Handle File Upload
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploadedFile(event.target.files[0]);
    }
  };

  // Handle Quick Reply
  const handleQuickReply = async (reply: string) => {
    await append({ role: "user", content: reply });
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
