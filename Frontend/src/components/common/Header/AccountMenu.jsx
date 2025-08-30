
import { useEffect,useState,useRef } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function AccountMenu({ name, photo, onLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
const{logout,user} = useContext(AuthContext)

 
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current || menuRef.current.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={menuRef} className="relative">
 
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100"
      >
        <img
          src={photo || "/defaultAvatar.jpg"}
          alt="User"
          className="w-9 h-9 rounded-full object-cover"
        />
        <span className="hidden md:block">Welcome, {user.name}</span>
        <svg viewBox="0 0 20 20" className="w-4 h-4">
          <path d="M5.5 7.5l4.5 4.5 4.5-4.5" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </button>

     
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded bg-white shadow-lg z-50 py-2">
          <div className="px-4 py-2 text-xs text-gray-500">Signed in as</div>
          <div className="px-4 pb-2 text-sm font-medium">{user.role}</div>
          <div className="my-2 border-t" />

          <Link
            to="/profile"
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            View Profile
          </Link>

          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
