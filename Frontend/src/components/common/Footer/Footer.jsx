import React, { useState } from "react";


export default function Footer() {
  const [email, setEmail] = useState("");
  const onSubscribe = (e) => {
    e.preventDefault();
   
  };

  return (
    <footer className=" bg-slate-950 text-slate-200 border-t border-white/10">
    
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-10 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="absolute -bottom-16 left-0 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <div className="mx-auto max-w-screen-2xl px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
       
          <div className="col-span-2 lg:col-span-2">
            <h3 className="text-lg font-semibold">Join our newsletter</h3>
            <p className="mt-2 text-sm text-slate-400">
              No spam. Unsubscribe any time.
            </p>
            <form onSubmit={onSubscribe} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-400
                           ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400 outline-none"
              />
              <button
                className="shrink-0 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 px-5 py-3
                           font-semibold text-slate-900 shadow-lg shadow-orange-500/20
                           transition-transform hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>

           
          </div>

        
          <div>
            <h4 className="font-semibold">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><a className="hover:text-slate-200" href="/view-courses">Courses</a></li>
              <li><a className="hover:text-slate-200" href="/my-courses">My learning</a></li>
              <li><a className="hover:text-slate-200" href="#">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><a className="hover:text-slate-200" href="#">About</a></li>
              <li><a className="hover:text-slate-200" href="#">Careers</a></li>
              <li><a className="hover:text-slate-200" href="#">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><a className="hover:text-slate-200" href="#">Blog</a></li>
              <li><a className="hover:text-slate-200" href="#">Help Center</a></li>
              <li><a className="hover:text-slate-200" href="#">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><a className="hover:text-slate-200" href="#">Privacy</a></li>
              <li><a className="hover:text-slate-200" href="#">Terms</a></li>
              <li><a className="hover:text-slate-200" href="#">Cookies</a></li>
            </ul>
          </div>
        </div>

     
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Academix. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-200">Status</a>
            <a href="#" className="hover:text-slate-200">Security</a>
            <a href="#" className="hover:text-slate-200">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
