import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../config/config";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.number.length !== 10) {
      alert("Please enter valid 10 digit mobile number 📱");
      return;
    }

    try {
      setLoading(true);

      // ✅ payload
      const payload = {
        name: form.name,
        email: form.email,
        number: form.number,
        password: form.password,
      };

      const res = await Axios.post("/user/signup", payload);

      alert("Signup successful 🎉");
      console.log(res.data);

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message ||
          "Signup failed, try again "
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DFF5E6]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-[#0D542B] mb-6">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded outline-[#0D542B]"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded outline-[#0D542B]"
          required
        />

        <input
          type="tel"
          name="number"
          placeholder="Mobile Number"
          value={form.number}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded outline-[#0D542B]"
          maxLength={10}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded outline-[#0D542B]"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0D542B] cursor-pointer text-white p-3 rounded hover:bg-[#DFF5E6] hover:text-black"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{""}
          <span
            className="text-[#0D542B] cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;