import React, { useState } from 'react'
import axios from 'axios'

import './Register.css';
import { useAsyncError, useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState(null);
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const submitRegister = async (event) => {

        event.preventDefault();

        const formData = new FormData();

        formData.append("name", name)
        formData.append("fullName", fullName)
        formData.append("password", password)
        formData.append("email", email)
        formData.append("photo", photo)
        formData.append("phone", phone)


        const response = await axios.post(`http://localhost:7001/api/users/register`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

        if (response.status === 200) {
            alert('Registered successfully');
            navigate('/login');
        } else {
            alert("Couldnt register")
            console.log(response.err);
        }
    }

    const photoUpload = (e) => {
        setPhoto(e.target.files[0]);
    }


    

    return (
  <section className="relative min-h-screen pt-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
 
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute top-16 right-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:44px_44px]" />
    </div>

    <div className="mx-auto max-w-2xl px-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_20px_60px_rgba(0,0,0,.35)]">
        <h1 className="text-center text-3xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-orange-400 to-violet-500 bg-clip-text text-transparent">
            Create your account
          </span>
        </h1>

        <form onSubmit={submitRegister} className="mt-8 space-y-6">
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="mb-1 block text-sm text-slate-300">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                placeholder="Jane Doe"
                className="w-full rounded-xl bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-400
                           ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div>
              <label htmlFor="username" className="mb-1 block text-sm text-slate-300">
                Username
              </label>
              <input
                id="username"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="username"
                placeholder="janedoe"
                className="w-full rounded-xl bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-400
                           ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-slate-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-400
                           ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm text-slate-300">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 123 4567"
                className="w-full rounded-xl bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-400
                           ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div className="md:col-span-2">
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
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full rounded-xl bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-400
                           ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400 outline-none"
              />
              <p className="mt-1 text-xs text-slate-400">Use at least 8 characters.</p>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="photo" className="mb-1 block text-sm text-slate-300">
                Profile picture
              </label>

              <label
                htmlFor="photo"
                className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3
                           ring-1 ring-white/10 hover:bg-white/10"
              >
                <span className="text-slate-300">Choose an image…</span>
                <span className="rounded-lg bg-white/10 px-3 py-1 text-xs">Browse</span>
              </label>
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={photoUpload}
                className="hidden"
              />

              
              {typeof photoPreview === "string" && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="mt-3 h-24 w-24 rounded-lg object-cover ring-1 ring-white/10"
                />
              )}
            </div>
          </div>

          

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 py-3 font-semibold
                       text-slate-900 shadow-lg shadow-orange-500/20 transition-transform hover:-translate-y-0.5"
          >
            Register
          </button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <a href="/login" className="text-orange-300 hover:text-orange-200">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  </section>
);

}

export default Register
