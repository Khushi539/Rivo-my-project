
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../config/config";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const response = await Axios.post("/user/login", {
        email,
        password,
      });

      // Assuming your backend returns { token: "...", user: { name: "...", email: "...", id: "..." } }
      if (response.data && response.data.token) {
        alert(`Welcome back, ${response.data.user?.name || "User"}! 🎉`);

        // 1. Store the token
        localStorage.setItem("token", response.data.token);

        // 2. Store the user object (must be stringified for LocalStorage)
        localStorage.setItem("user", JSON.stringify(response.data));

        // 3. Navigate to dashboard
        navigate("/dashboard");
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(
        error.response?.data?.message || "Login failed, try again"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#DFF5E6] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-medium text-center text-[#0D542B] mb-6">
          Login to Rivo
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-[#0D542B]"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-[#0D542B]"
          />

          <button 
            type="submit"
            className="w-full cursor-pointer bg-[#0D542B] text-white py-3 rounded-lg hover:bg-[#0a4121] transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?
          <span
            onClick={() => navigate("/signup")}
            className="text-[#0D542B] cursor-pointer ml-1 font-semibold"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
