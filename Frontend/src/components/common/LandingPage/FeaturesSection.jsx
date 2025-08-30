import React from 'react'

function FeaturesSection() {
  return (
    <div>
      <section className="mx-auto  max-w-7xl px-5 py-16 md:py-24">
        <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">
          Why choose <span className="bg-gradient-to-r from-orange-400 to-violet-500 bg-clip-text text-transparent">Academix</span>?
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "🎯", title: "Expert instructors", text: "Learn from industry leaders with real-world experience." },
            { icon: "🕒", title: "Flexible schedules", text: "Self-paced learning with lifetime access." },
            { icon: "📜", title: "Certificates", text: "Showcase your skills with verifiable certificates." },
            { icon: "🌍", title: "Global community", text: "Collaborate, get feedback, and grow together." },
          ].map((f) => (
            <div
              key={f.title}
              className="feature-card rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-[0_10px_40px_rgba(0,0,0,.25)] backdrop-blur transition-transform hover:-translate-y-1"
            >
              <div className="mb-2 text-3xl">{f.icon}</div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-slate-300">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default FeaturesSection
