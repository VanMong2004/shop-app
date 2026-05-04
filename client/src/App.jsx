import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setMsg(data.message));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-2xl font-bold text-gray-800">{msg}</p>
    </div>
  );
}

export default App;
