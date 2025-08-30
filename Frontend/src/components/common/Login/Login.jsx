import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const location = useLocation(); 
    const { login } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const submitLogin = async (event) => {
        event.preventDefault();

        const user = { name, password };

        const response = await axios.post('http://localhost:7001/api/users/login', user, {
            withCredentials: true, 
        });

        const accessToken = response.data.accessToken;
        console.log("accessToken", accessToken);

        login(accessToken);

        const decode = jwtDecode(accessToken);
        console.log("decoded accessToken", decode);

    
        const redirectPath = location.state?.from || 
            (decode.role === "student" ? "/studentDashBoard" :
            decode.role === "courseProvider" ? "/CourseProviderDashBaord" :
            decode.role=== "admin" ? "/adminDashBoard" : "/register");

        navigate(redirectPath);
    };

    
    return (
  <section className="relative min-h-screen flex items-center pt-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
   

    <div className="mx-auto w-full max-w-md  px-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_20px_60px_rgba(0,0,0,.35)]">
        <h1 className="text-center text-3xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-orange-400 to-violet-500 bg-clip-text text-transparent">
            Login
          </span>
        </h1>

        <form onSubmit={submitLogin} className="mt-8 space-y-5">
          
          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-slate-300">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="username"
              className="w-full rounded-xl bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-400
                         ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Your name"
            />
          </div>

        
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="password" className="block text-sm text-slate-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-xl bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-400
                         ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="••••••••"
            />
          </div>

        
          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 text-slate-300">
              <input type="checkbox" className="size-4 rounded border-white/20 bg-white/5" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-orange-300 hover:text-orange-200">
              Forgot password?
            </Link>
          </div>

         
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 py-3 font-semibold
                       text-slate-900 shadow-lg shadow-orange-500/20 transition-transform hover:-translate-y-0.5"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          No account?{" "}
          <Link to="/register" className="text-orange-300 hover:text-orange-200">
            Create one
          </Link>
        </p>
      </div>
    </div>
  </section>
);

}

export default Login;
