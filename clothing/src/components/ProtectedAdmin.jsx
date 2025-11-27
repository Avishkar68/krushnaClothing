import { useState } from "react";
import Admin from "../pages/Admin";

const ProtectedAdmin = () => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("adminAuth") === "true"
  );
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const correctPassword = "krushna123";
    if (password === correctPassword) {
      localStorage.setItem("adminAuth", "true");
      setAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  if (authenticated) return <Admin />;

  return (
    <div className="flex justify-center items-center h-screen bg-[#F5F5F5]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[350px] flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-center">Admin Login</h2>
        <input
          type="password"
          className="border p-3 rounded-lg"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProtectedAdmin;
