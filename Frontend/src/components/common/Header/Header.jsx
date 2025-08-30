import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { CartContext } from "../../../context/CartContext";
import logo from "./Academix.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AccountMenu from "./AccountMenu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const MenuLink = ({ to, children }) => (
  <Link to={to} className="block w-full text-left px-4 py-2 hover:bg-white/10">
    {children}
  </Link>
);

const HoverMenu = ({ label, children, align = "right" }) => (
  <div className="relative group">
    <button className="px-3 py-2 rounded hover:bg-white/10">{label}</button>
    <div
      className={`
        absolute ${align === "right" ? "right-0" : "left-0"} mt-2
        w-56 rounded bg-slate-900/95 text-slate-100 shadow-xl ring-1 ring-white/10 py-2
        invisible opacity-0 pointer-events-none
        transition duration-150
        group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto
        group-focus-within:visible group-focus-within:opacity-100 group-focus-within:pointer-events-auto
        z-50
      `}
    >
      {children}
    </div>
  </div>
);

function Header() {
  const { user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;

    
    gsap.set(el, {
      backgroundColor: "rgba(2,6,23,0.40)", 
      height: 80,                           
      borderBottomColor: "rgba(255,255,255,0.06)",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    });

    ScrollTrigger.create({
      start: "top -10",
      onUpdate(self) {
        const scrolled = self.scroll() > 10;
        gsap.to(el, {
          height: scrolled ? 64 : 80,
          backgroundColor: scrolled ? "rgba(2,6,23,0.70)" : "rgba(2,6,23,0.40)",
          boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,.25)" : "0 0 0 rgba(0,0,0,0)",
          duration: 0.25,
          ease: "power2.out",
        });
      },
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/courses/getAllCourses`);
        setCourses(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
     
    })();
  }, []);

  const filteredCourses = courses.filter((c) =>
    c.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header
      ref={headerRef}
      className="
        fixed top-0 left-0 right-0 z-50
        text-slate-100 backdrop-blur-xl border-b
        border-white/10
      "
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 md:px-6">
       
        <div className="flex items-center gap-4">
          <Link to="/" className="shrink-0">
            <img src={logo} alt="Academix logo" className="w-16 h-auto rounded-lg bg-white/5 p-2 ring-1 ring-white/10" />
          </Link>

         
          <div className="relative">
            <input
              type="text"
              className="peer w-[320px] max-w-[60vw] rounded-full bg-white/5 text-slate-100 placeholder:text-slate-400
                         px-5 py-2.5 outline-none transition
                         ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400/70"
              placeholder="Search for courses..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          
            {searchQuery.trim() !== "" && (
              <div className="absolute top-full mt-2 w-[320px] max-w-[60vw] bg-slate-900/95 text-slate-100 p-3 rounded-xl shadow-xl ring-1 ring-white/10 max-h-96 overflow-y-auto z-50">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <Link key={course._id} to={`/courseDetails/${course._id}`}>
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition">
                        <img
                          src={`http://localhost:7000/uploads/${course.photo}`}
                          alt={course.courseName}
                          className="w-12 h-12 object-cover rounded-lg ring-1 ring-white/10"
                        />
                        <div>
                          <h4 className="text-sm font-semibold">{course.courseName}</h4>
                          <p className="text-xs text-slate-400 line-clamp-2">{course.courseDescription}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm p-2">No courses found.</p>
                )}
              </div>
            )}
          </div>
        </div>

       
        <div className="flex items-center gap-4">
          {user ? (
            <nav className="flex items-center gap-3">
              <Link className="px-3 py-2 rounded hover:bg-white/10" to="/my-courses">
                My courses
              </Link>
              {user.role === "student" && (
                <Link className="px-3 py-2 rounded hover:bg-white/10" to="/view-courses">
                  View Courses
                </Link>
              )}
              {user.role === "courseProvider" && (
                <HoverMenu label="Provider">
                  <MenuLink to="/add-courses">Add Courses</MenuLink>
                  <MenuLink to="/CourseProviderDashBaord">Dashboard</MenuLink>
                </HoverMenu>
              )}
              {user.role === "admin" && (
                <>
                  <Link className="px-3 py-2 rounded hover:bg-white/10" to="/adminDashBoard">
                    Admin Dashboard
                  </Link>
                  <HoverMenu label="Users">
                    <MenuLink to="/add-CourseProviders">Add Course Providers</MenuLink>
                    <MenuLink to="/ViewCourseProviders">View Course Providers</MenuLink>
                    <MenuLink to="/ViewStudents">View Students</MenuLink>
                  </HoverMenu>
                  <HoverMenu label="Courses">
                    <MenuLink to="/add-courses">Add Courses</MenuLink>
                    <MenuLink to="/view-courses">View Courses</MenuLink>
                  </HoverMenu>
                </>
              )}

              <Link to="/cart" className="relative px-3 py-2 rounded hover:bg-white/10">
                <FontAwesomeIcon icon={faShoppingCart} className="text-xl text-orange-400" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-px rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              <AccountMenu />
            </nav>
          ) : (
            <Link to="/login">
              <button className="rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-2.5 font-semibold text-slate-900 shadow-lg shadow-orange-500/20 transition-transform hover:-translate-y-0.5">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
