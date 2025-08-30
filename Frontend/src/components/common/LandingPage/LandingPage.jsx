import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";       
import { useGSAP } from "@gsap/react";
import learning from "./learning.jpg";
import FeaturesSection from "./FeaturesSection";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function LandingPage() {
    const scope = useRef(null);

    useGSAP(() => {
      
        const split = new SplitText(".hero-title", { type: "words, chars" });

      
        gsap.set(".hero-ribbon", { scaleX: 0, transformOrigin: "0% 50%" });

       
        const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.out" } });

        tl.to(".hero-content", { opacity: 1, y: 0 })
            .to(".hero-ribbon", { scaleX: 1, duration: 0.8, ease: "power3.out" }, "-=0.3")
            .from(split.chars, { yPercent: 120, opacity: 0, stagger: 0.02, duration: 0.5 }, "-=0.4");

        const header = document.querySelector("header");
        const headerOffset = header ? header.offsetHeight : 0;

        gsap.set(".hero-container", { transformOrigin: "50% 50%" });

        gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-container",
                start: () => `top top+=${headerOffset}`, 
                end: "+=55%",                            
                scrub: true,
                
                invalidateOnRefresh: true,             
            },
        })
            .fromTo(
                ".hero-container",
                { scale: 0.96, yPercent: 4 },
                { scale: 1.2, yPercent: 0, ease: "none" }
            );

 
        return () => split.revert();
    }, { scope });

    return (
        <div ref={scope} className=" bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
           
            <section className="hero-container relative h-full ">
                <div className="absolute inset-0 -z-10 pointer-events-none">
                 
                    <div className="absolute -top-16 -left-10 h-80 w-80 rounded-full bg-orange-500/30 blur-3xl" />
                    <div className="absolute -top-8 right-0 h-72 w-72 rounded-full bg-violet-500/25 blur-3xl" />
                    <div className="absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)] bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-20 px-5 py-16  md:py-24">

                    <div className="hero-content opacity-0 translate-y-6 min-w-0">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur">
                            🎓 Learn smarter, not harder
                        </span>

                        <h1 className="hero-title mt-4  md:text-3xl lg:text-5xl font-extrabold leading-tight tracking-tight">

                            Unlock your potential with  expert-led online courses
                        </h1>


                        <div className="hero-ribbon mt-4 inline-block origin-left rotate-[-2deg] overflow-hidden rounded-xl border-2 border-white/10 bg-white/10 px-3 py-1 backdrop-blur">
                            <div className="rotate-[2deg]">
                                <p className="text-lg font-semibold tracking-tight text-orange-100 md:text-2xl">
                                    Learn Anytime • Anywhere • At Your Pace
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 max-w-prose text-slate-300">
                            Hands-on projects, mentor feedback, and certificates that matter.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                to="/register"
                                className="rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 px-5 py-3 font-semibold text-slate-900 shadow-lg shadow-orange-500/20 transition-transform hover:-translate-y-0.5"
                            >
                                Get Started Free
                            </Link>
                            <Link
                                to="/view-courses"
                                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white/90 backdrop-blur transition-transform hover:-translate-y-0.5"
                            >
                                Explore Courses
                            </Link>
                        </div>

                        <ul className="mt-5 flex flex-wrap gap-4 text-sm text-slate-300/80">
                            <li><span className="font-bold text-slate-100">12k+</span> learners</li>
                            <li><span className="font-bold text-slate-100">180+</span> courses</li>
                            <li><span className="font-bold text-slate-100">4.9/5</span> rating</li>
                        </ul>
                    </div>


                    <div className="relative">
                        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur overflow-visible">
                            <img
                                src={learning}
                                alt="Online learning"
                                className="aspect-video w-full rounded-xl object-cover"
                                loading="eager"
                            />

                           
                            <div
                                className="absolute left-6 bottom-0 translate-y-1/2
                                    rounded-full border border-white/10 bg-slate-900/60
                                    px-3 py-1 text-xs text-slate-100 backdrop-blur
                                    shadow-[0_6px_24px_rgba(0,0,0,.35)] z-10"
                            >
                                New · Project-based
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <FeaturesSection />
        </div>
    );
}
