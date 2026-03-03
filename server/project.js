const projects = [
  { title: "Tiny Question Manager", tech: "React, Node.js", desc: "User-friendly tool for Q&A." },
  { title: "PC Management System", tech: "Laravel, MySQL", desc: "Administrative system for Haramaya University." }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
        <span className="h-1 w-12 bg-blue-500"></span> Featured Projects
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <div key={i} className="bg-[#1e293b] rounded-2xl p-8 border border-slate-800 hover:border-blue-500/50 transition-all group">
            <div className="w-full h-48 bg-slate-800 rounded-xl mb-6 flex items-center justify-center text-slate-600">
               Image Placeholder
            </div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition">{p.title}</h3>
            <p className="text-gray-400 mb-4">{p.desc}</p>
            <span className="text-xs font-mono text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">{p.tech}</span>
          </div>
        ))}
      </div>
    </section>
  );
}