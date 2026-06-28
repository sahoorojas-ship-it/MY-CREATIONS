import { useState } from "react";

export default function App() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  async function askAI() {
    const res = await fetch("http://localhost:3001/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="w-[380px] h-[750px] rounded-[40px] bg-black text-white p-4 border">
        <h1 className="text-xl font-bold mb-4">Nova AI</h1>

        <textarea
          className="w-full h-32 text-black p-2"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />

        <button
          onClick={askAI}
          className="mt-2 px-4 py-2 bg-blue-500 rounded"
        >
          Ask AI
        </button>

        <div className="mt-4 h-96 overflow-auto border p-2">
          {reply}
        </div>
      </div>
    </div>
  );
}