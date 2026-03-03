export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="w-40 h-40 rounded-full border-4 border-blue-500 p-1 mb-6 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
        <img src="/pfp.jpg" alt="Cherinet" className="rounded-full w-full h-full object-cover" />
      </div>
      <h1 className="text-5xl md:text-7xl font-bold mb-4">
        Hi, I'm <span className="text-blue-500">Cherinet Habtamu</span>
      </h1>
      <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
        Full Stack Developer | Software Engineering Major | Haramaya University
      </p>
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <a href="#contact" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-bold transition">Get in Touch</a>
        <button className="border border-slate-700 hover:bg-slate-800 px-8 py-3 rounded-full font-bold transition">Download CV</button>
      </div>
    </section>
  );
}