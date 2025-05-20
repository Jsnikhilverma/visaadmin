import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("admin"); // 'admin' or 'expert'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Both email and password are required.");
      return;
    }

    try {
      const payload = { email, password };

      const url =
        loginType === "admin"
          ? `${import.meta.env.VITE_BASE_URL}admin/login`
          : `${import.meta.env.VITE_BASE_URL}expert/login`;

      const res = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.message === "Login successful") {
        const token = res.data.token;
        const userData = res.data;

        console.log(userData.id);
        
        
        

        if (!token || !userData.id) {
          alert("Missing token or user ID in response!");
          return;
        }

        // Store token
        Cookies.set(loginType === "expert" ? "expertToken" : "token", token, {
          expires: 7,
          secure: false,
          sameSite: "Strict",
        });

        // Store userType and userId
        Cookies.set("userType", loginType, {
          expires: 7,
          secure: false,
          sameSite: "Strict",
        });
        Cookies.set("userId", userData.id, {
          expires: 7,
          secure: false,
          sameSite: "Strict",
        });

        navigate("/home");
      } else {
        alert("Login failed! Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred during login. Please try again."
      );
    }
  };

  return (
    <div className="lg:flex min-h-screen">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <div className="text-3xl text-indigo-800 tracking-wide ml-2 font-semibold">
              Axe Visa {loginType === "admin" ? "Admin" : "Expert"}
            </div>
          </div>
        </div>

        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 xl:px-24 xl:max-w-2xl">
          <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl">
            Log in
          </h2>

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-full font-semibold ${
                loginType === "admin"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setLoginType("admin")}
            >
              Admin Login
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-full font-semibold ${
                loginType === "expert"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setLoginType("expert")}
            >
              Expert Login
            </button>
          </div>

          <form className="mt-8" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-bold text-gray-700">
                Email Address
              </label>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="email"
                placeholder="mike@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-6">
              <label className="text-sm font-bold text-gray-700">Password</label>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold hover:bg-indigo-600 shadow-lg"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen"></div>
    </div>
  );
};

export default Login;
